import { mtHeaders } from '@/app/api/mt/head';

/**
 * 删除审核
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  const reqBody = await req.json();

  const raw = JSON.stringify({
    id: reqBody.id,
  });

  const response = await fetch(
    'https://pmt.qiyusoft.cn/meituan/team/del_order_check.json',
    {
      method: 'POST',
      headers: await mtHeaders(),
      body: raw,
    },
  );
  return new Response(await response.text());
}
