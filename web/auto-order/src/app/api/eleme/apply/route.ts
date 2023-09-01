import { elemeHeaders } from '@/app/api/eleme/head';

export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    shopId: reqBody.shopId,
    orderDay: reqBody.orderDay,
    itemId: reqBody.itemId,
  });

  const response = await fetch(
    'https://pele.qiyusoft.cn/eleapp/team/save_apply.json',
    {
      method: 'POST',
      headers: await elemeHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
