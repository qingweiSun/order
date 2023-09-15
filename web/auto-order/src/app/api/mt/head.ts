import { sql } from '@vercel/postgres';

export const mtHeaders = async () => {
  const JSESSIONID = await sql`SELECT Jsessionid
              FROM OrderAuto
              WHERE Type = 'mt';`;
  const jsessionid = JSESSIONID.rows[0].jsessionid;
  // const jsessionid = await kv.get<string>('mt');

  const myHeaders = {
    Host: 'pmt.qiyusoft.cn',
    Accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'Sec-Fetch-Mode': 'cors',
    Origin: 'https://pmt.qiyusoft.cn',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0',
    Referer: 'https://pmt.qiyusoft.cn/meituan/team/shop.html',
    Connection: 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    Cookie: 'JSESSIONID=' + jsessionid,
    'Content-Type': 'application/json',
  };
  console.log('美团jsessionid', myHeaders);
  return myHeaders;
};
