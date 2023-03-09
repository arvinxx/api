import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ProxyAgent, setGlobalDispatcher, fetch } from 'undici';
import { ChatGPTAPI } from './_chatgpt';

const IS_DEV = process.env.NODE_ENV === 'development';
const apiKey = process.env.OPENAI_API_KEY as string;
const HTTPS_PROXY = process.env.HTTPS_PROXY as string;

export default async function handler(req: VercelRequest, response: VercelResponse) {
  const messages = req.body.messages;
  const systemMessage = req.body.systemMessage;

  if (!messages) {
    response.send('No input text');
    return;
  }

  if (HTTPS_PROXY) {
    setGlobalDispatcher(new ProxyAgent(HTTPS_PROXY));
  }

  const api = new ChatGPTAPI({
    systemMessage,
    apiKey,
    debug: IS_DEV,
    fetch: fetch as any,
  });

  const result = await api.sendMessage(messages);

  response.json(result);
}
