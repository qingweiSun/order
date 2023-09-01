import { mtHeaders } from '@/app/api/mt/head';

export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    wmPoiId: reqBody.wmPoiId,
    orderDay: reqBody.orderDay,
    itemId: reqBody.itemId,
  });

  const response = await fetch(
    'https://pmt.qiyusoft.cn/meituan/team/save_apply.json',
    {
      method: 'POST',
      headers: await mtHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
