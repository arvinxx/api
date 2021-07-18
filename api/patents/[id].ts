import type { VercelRequest, VercelResponse } from '@vercel/node';
import { request } from '../_utils';
import { DOMParser } from 'xmldom';
import xpath from 'xpath';

const fetchStatus = async (filename: string, code: string): Promise<Patents.LawStatus[]> => {
  const res = await request
    .get('https://kns.cnki.net/kcms/detail/frame/ReaderComments.aspx', {
      params: {
        flag: 'gbserach',
        dbname: 'SCPD',
        dbcode: 'SCPD',
        filename,
        vl: code,
      },
    })
    .catch();

  let index = 1;
  const statusList = [];

  const doc = new DOMParser().parseFromString(res);

  // 用一个状态来记录是否应该结束
  let isFinished = false;
  while (!isFinished) {
    // 获取某一行的状态和日期
    const status = xpath.select1(`string(/table/tbody/tr[${index}]/td[2])`, doc) as string;
    const date = xpath.select1(`string(/table/tbody/tr[${index}]/td[1])`, doc) as string;

    if (!status && !date) {
      isFinished = true;
      break;
    }
    index += 1;
    statusList.push({ status, date });
  }

  return statusList;
};

export default async (req: VercelRequest, response: VercelResponse) => {
  const { query } = req;

  const res = await request
    .get('https://kns.cnki.net/kcms/detail/detail.aspx?', {
      params: {
        dbcode: 'SCPD',
        dbname: 'SCPD2020',
        filename: query.id,
      },
    })
    .catch();

  const content = res.replace(/<html\s.*?>/g, '<html>');
  const doc = new DOMParser().parseFromString(content);

  const queryCodeEl = xpath.select1('//*[@id="listv"]', doc) as Element;
  const { value: queryCode } = queryCodeEl.attributes.getNamedItem('value')!;

  const name = xpath.select1('string(//h1)', doc) as string;

  // 专利号
  const type = xpath.select1(
    'string(/html/body/div[2]/div/div[1]/div[1]/div/div[2]/div[2]/p)',
    doc,
  ) as string;

  // 专利

  const applyId = xpath.select1(
    'string(/html/body/div[2]/div/div[1]/div[1]/div/div[2]/div[3]/div[1]/p)',
    doc,
  ) as string;
  // 公开 Id
  const openId = xpath.select1(
    'string(/html/body/div[2]/div/div[1]/div[1]/div/div[2]/div[4]/div[1]/p)',
    doc,
  ) as string;

  // 公开日期
  const applyDate = xpath.select1(
    'string(/html/body/div[2]/div/div[1]/div[1]/div/div[2]/div[3]/div[2]/p)',
    doc,
  ) as string;

  // 公开日期
  const openDate = xpath.select1(
    'string(/html/body/div[2]/div/div[1]/div[1]/div/div[2]/div[4]/div[2]/p)',
    doc,
  ) as string;

  // 摘要
  const abstract = xpath.select1('string(//div[@class="abstract-text"])', doc) as string;

  // 主权声明
  const claim = xpath.select1('string(//div[@class="claim-text"])', doc) as string;

  // 状态清单
  const statusList = await fetchStatus(applyId, queryCode);

  // 最新的状态
  const currentStatus = statusList[statusList.length - 1];
  const lawStatus = currentStatus.status;

  // 如果有授权的话,授权日期
  const authorizationDate = lawStatus === '授权' ? currentStatus.date : undefined;

  const data = {
    success: true,
    data: {
      type,
      name,
      applyId,
      applyDate,
      openId,
      openDate,
      abstract,
      statusList,
      claim,
      lawStatus,
      authorizationDate,
    },
  };

  response.json(data);

  return data;
};
