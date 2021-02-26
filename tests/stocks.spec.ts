/**
 * @jest-environment node
 */

import Token from '../api/stocks/token';
import Item from '../api/stocks/item/[code]';
import type { VercelRequest, VercelResponse } from '@vercel/node';

describe('股票数据', () => {
  it('获取雪球 token', async () => {
    const { data, success } = await Token(
      <VercelRequest>(<unknown>{}),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );

    expect(success).toBeTruthy();
    expect(data.token).toHaveLength(40);
  });
  it('请求雪球数据', async () => {
    const { data, success } = await Token(
      <VercelRequest>(<unknown>{}),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );
    if (!success) return;

    const res = await Item(
      <VercelRequest>(<unknown>{
        query: { code: 'SH600519', token: data.token },
      }),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );

    expect(res.data.name).toEqual('贵州茅台');
    expect(res.data.symbol).toEqual('SH600519');
  });
});
