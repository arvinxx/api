/**
 * @jest-environment node
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import parseICBCBill from '../../api/bill/icbc';
import { icbcMockData } from './mockData';

test('解析 ICBC 账单', async () => {
  const data = await parseICBCBill(
    <VercelRequest>(<unknown>{
      body: icbcMockData,
    }),
    <VercelResponse>(<unknown>{
      send: () => {},
    }),
  );

  expect(data[0]).toEqual({
    card: '4466',
    date: '2022-06-28',
    money: '12.00',
    moneyInfo: '12.00/RMB(支出)',
    title: '杭州顶全便利店有限公司',
    tradeType: '消费',
  });
});
