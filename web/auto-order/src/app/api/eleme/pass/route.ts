import { elemeHeaders } from '@/app/api/eleme/head';

export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    id_str: reqBody.id_str, //"327111;327112;327113",
    passwd: '123456',
  });

  const response = await fetch(
    'https://pele.qiyusoft.cn/eleapp/team/do_order_check_more.json',
    {
      method: 'POST',
      headers: await elemeHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
