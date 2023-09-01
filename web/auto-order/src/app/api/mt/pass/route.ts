import { mtHeaders } from '@/app/api/mt/head';

export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    id_str: reqBody.id_str, //"327111;327112;327113",
    passwd: '123456',
  });

  const response = await fetch(
    'https://pmt.qiyusoft.cn/meituan/team/do_order_check_more.json',
    {
      method: 'POST',
      headers: await mtHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
