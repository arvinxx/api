import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DOMParser } from '@xmldom/xmldom';
import { success } from '../_utils';
import xpath from 'xpath';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { body } = request;

  const doc = new DOMParser().parseFromString(body);

  let index = 3; //
  const recordList = [];
  let isFinished = false;

  while (!isFinished) {
    // 获取某一行的状态和日期
    const card: string = xpath.select(
      `string(//*[@id="isForwardContent"]/div/table/tbody/tr/td/table[9]/tbody/tr[${index}]/td[1])`,
      doc,
    ) as any;
    const date = xpath.select(
      `string(//*[@id="isForwardContent"]/div/table/tbody/tr/td/table[9]/tbody/tr[${index}]/td[2])`,
      doc,
    );
    const tradeType = xpath.select(
      `string(//*[@id="isForwardContent"]/div/table/tbody/tr/td/table[9]/tbody/tr[${index}]/td[4])`,
      doc,
    );
    const title = xpath.select(
      `string(//*[@id="isForwardContent"]/div/table/tbody/tr/td/table[9]/tbody/tr[${index}]/td[5])`,
      doc,
    );

    const moneyInfo: string = xpath.select(
      `string(//*[@id="isForwardContent"]/div/table/tbody/tr/td/table[9]/tbody/tr[${index}]/td[7])`,
      doc,
    ) as any;

    const res = /(?<money>.*)\/.*/.exec(moneyInfo);

    if (!title) {
      isFinished = true;
      break;
    }

    index += 1;

    recordList.push({
      card: card.trim(),
      date,
      title,
      tradeType,
      money: res?.groups?.money,
      moneyInfo,
    });
  }

  const res = success(recordList);

  response.send(res);

  return recordList;
};
