/**
 * @jest-environment node
 */

import Token from '../api/stocks/token';
import Item from '../api/stocks/[code]';
import Search from '../api/stocks/search';
import Cps from '../api/stocks/[code]/cps';
import type { VercelRequest, VercelResponse } from '@vercel/node';

describe('雪球股票数据', () => {
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
  it('请求雪球股票代码', async () => {
    const { data, success } = await Token(
      <VercelRequest>(<unknown>{}),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );
    if (!success) return;

    const res = await Search(
      <VercelRequest>(<unknown>{
        query: { name: '我武生物', token: data.token },
      }),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );

    expect(res.data.name).toEqual('我武生物');
    expect(res.data.code).toEqual('SZ300357');
  });

  it('请求东方财富股票CPS', async () => {
    const { data } = await Cps(
      <VercelRequest>(<unknown>{ query: { code: 'SZ000858' } }),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );

    expect(data.year).toBeGreaterThanOrEqual(new Date().getFullYear());
    expect(typeof data.yearStart).toBe('number');
    expect(typeof data.yearEnd).toBe('number');
  });
});
