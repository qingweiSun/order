import { mtHeaders } from '@/app/api/mt/head';

export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    limit: 10,
    offset: 0,
    shopName: reqBody.shopName,
    teamId: '',
  });
  const response = await fetch(
    'https://pmt.qiyusoft.cn/meituan/team/shop.json',
    {
      method: 'POST',
      headers: await mtHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
