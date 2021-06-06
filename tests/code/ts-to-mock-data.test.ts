/**
 * @jest-environment node
 */
import { VercelRequest, VercelResponse } from '@vercel/node';
import tsToMockData from '../../api/code/ts-to-mock-data';

test('Ts to Mock', async () => {
  const mockData = await tsToMockData(
    <VercelRequest>(<unknown>{
      body: `export interface Root {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}`,
    }),
    <VercelResponse>(<unknown>{
      send: () => {},
    }),
  );
  expect(mockData.startsWith('const root = {')).toBeTruthy();
});
