import { elemeHeaders } from '@/app/api/eleme/head';

export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    limit: 10,
    offset: 0,
    shopName: reqBody.shopName,
    teamId: '',
  });
  const response = await fetch(
    'https://pele.qiyusoft.cn/eleapp/team/shop.json',
    {
      method: 'POST',
      headers: await elemeHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
