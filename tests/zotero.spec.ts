import BooksList from '../api/books/[year]';
import type { VercelRequest, VercelResponse } from '@vercel/node';

describe('Zotero 书单', () => {
  it('2020年书单', async () => {
    const { raw } = await BooksList(
      <VercelRequest>(<unknown>{ query: { year: '2020' } }),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );
    expect(raw.key).toEqual('22VU3NNR');
    expect(raw.name).toEqual('2020年书单');
  });
  it('2021年书单', async () => {
    const { raw } = await BooksList(
      <VercelRequest>(<unknown>{ query: { year: '2021' } }),
      <VercelResponse>(<unknown>{
        json: () => {},
      }),
    );
    expect(raw.key).toEqual('GIE4NH9Q');
    expect(raw.name).toEqual('2021年书单');
  });
});
