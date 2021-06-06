/**
 * @jest-environment node
 */

import Meta from '../../api/image/meta';

import { VercelRequest, VercelResponse } from '@vercel/node';

describe('图片相关方法', () => {
  it('获取图片元数据', async () => {
    const { success, data } = await Meta(
      <VercelRequest>(<unknown>{
        query: { url: 'https://gw.alipayobjects.com/zos/antfincdn/9whkpGgNSj/svg.png' },
      }),
      <VercelResponse>(<unknown>{
        send: () => {},
      }),
    );
    expect(success).toBeTruthy();
    expect(data).toEqual({
      width: 32,
      height: 32,
      type: 'png',
      mime: 'image/png',
      wUnits: 'px',
      hUnits: 'px',
      length: 602,
      url: 'https://gw.alipayobjects.com/zos/antfincdn/9whkpGgNSj/svg.png',
    });
  });
});
