/**
 * @jest-environment node
 */

import Id from '../../api/patents/[id]';

import type { VercelRequest, VercelResponse } from '@vercel/node';

describe('专利数据', () => {
  it('获取专利', async () => {
    const { data, success } = await Id(
      <VercelRequest>(<unknown>{ query: { id: 'CN206367193U' } }),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );

    expect(success).toBeTruthy();
    expect(data).toEqual({
      abstract:
        '本实用新型公开了一种可快速更换打印喷头的熔融沉积型3D打印机,包括打印台和打印头,所述的打印头包括：支撑板；打印喷头,采用金属材料制成,通过打印喷头支架固定在支撑板上；加热装置,包括电磁感应线圈,该电磁感应线圈套在打印喷头外,通过线圈支架固定在支撑板上；冷却装置,用于冷却打印喷头,通过冷却支架固定在支撑板上；控制电路,与所述的电磁感应线圈电连接,为电磁感应线圈提供交变电压。本实用新型的熔融沉积型3D打印机加热机构与打印喷头机构分离,便于打印喷头的快速更换。',
      applyDate: '2016-12-15',
      applyId: 'CN201621381569.8',
      claim:
        '一种可快速更换打印喷头的熔融沉积型3D打印机,包括打印台和打印头,其特征在于,所述的打印头包括：支撑板；打印喷头,采用金属材料制成,通过打印喷头支架固定在支撑板上；加热装置,包括电磁感应线圈,该电磁感应线圈套在打印喷头外,通过线圈支架固定在支撑板上；冷却装置,用于冷却打印喷头,通过冷却支架固定在支撑板上；控制电路,与所述的电磁感应线圈电连接,为电磁感应线圈提供交变电压。',
      lawStatus: [
        {
          date: '2017-08-01',
          status: '授权',
        },
      ],
      name: '一种可快速更换打印喷头的熔融沉积型3D打印机',
      openDate: '2017-08-01',
      openId: 'CN206367193U',
      type: '实用新型',
    });
  });
});
