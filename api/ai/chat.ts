import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ProxyAgent, setGlobalDispatcher, fetch } from 'undici';
import { ChatGPTAPI } from './_chatgpt';

const IS_DEV = process.env.NODE_ENV === 'development';
const apiKey = process.env.OPENAI_API_KEY as string;
const HTTPS_PROXY = process.env.HTTPS_PROXY as string;

export default async function handler(req: VercelRequest, response: VercelResponse) {
  const messages = req.body.messages;

  if (!messages) {
    response.send('No input text');
    return;
  }

  if (HTTPS_PROXY) {
    setGlobalDispatcher(new ProxyAgent(HTTPS_PROXY));
  }

  const api = new ChatGPTAPI({
    systemMessage:
      '你是擅长做饭的米其林大厨，接下来我会问你很多关于菜谱的问题，请将结果以 html 格式进行输出',
    apiKey,
    debug: IS_DEV,
    fetch: fetch as any,
  });

  const result = await api.sendMessage(messages, {
    stream: true,
    onProgress: (partialResponse) => {
      console.log(partialResponse.text);
    },
  });
  response.json(result);
}
