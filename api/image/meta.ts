import type { VercelRequest, VercelResponse } from '@vercel/node';
import probe from 'probe-image-size';
import { success } from '../_utils';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { query } = request;

  const result = await probe(query.url as string);

  const res = success(result);

  response.send(res);

  return res;
};
