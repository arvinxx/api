import api from 'zotero-api-client';

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { query } = request;
  let bookKey = 'GIE4NH9Q';
  switch (query?.year) {
    case '2020':
      bookKey = '22VU3NNR';
      break;
    case '2021':
      bookKey = 'GIE4NH9Q';
      break;
    default:
  }
  const client = api(process.env.ZOTERO_AUTH_KEY).library('user', 4485835);

  const searchResult = await client.searches(bookKey).get<Zotero.SearchData, false>();

  const raw = searchResult.raw.data;
  response.json(raw);

  return { raw };
};
