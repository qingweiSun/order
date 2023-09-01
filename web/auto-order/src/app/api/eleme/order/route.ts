import { elemeHeaders } from '@/app/api/eleme/head';

export async function POST() {
  const raw = JSON.stringify({
    limit: 15,
    offset: 0,
  });

  const response = await fetch(
    'https://pele.qiyusoft.cn/eleapp/team/order_apply.json',
    {
      method: 'POST',
      headers: await elemeHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
