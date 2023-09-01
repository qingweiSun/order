import { mtHeaders } from '@/app/api/mt/head';
import fetch from 'node-fetch';

export async function POST() {
  const response = await fetch(
    'https://pmt.qiyusoft.cn/meituan/team/order_apply.json',
    {
      method: 'POST',
      headers: await mtHeaders(),
      body: JSON.stringify({
        limit: 15,
        offset: 0,
      }),
    },
  );
  return new Response(await response.text());
}
