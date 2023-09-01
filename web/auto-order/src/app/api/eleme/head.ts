import { sql } from '@vercel/postgres';

export const elemeHeaders = async () => {
  const JSESSIONID =
    await sql`SELECT Jsessionid FROM OrderAuto WHERE Type = 'eleme';`;
  //const jsessionid = await kv.get<string>('eleme');
  const jsessionid = JSESSIONID.rows[0].jsessionid;
  const myHeaders = new Headers();
  myHeaders.append('Host', 'pele.qiyusoft.cn');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('X-Requested-With', 'XMLHttpRequest');
  myHeaders.append('Sec-Fetch-Site', 'same-origin');
  myHeaders.append('Accept-Language', 'zh-CN,zh-Hans;q=0.9');
  myHeaders.append('Sec-Fetch-Mode', 'cors');
  myHeaders.append('Origin', 'https://pele.qiyusoft.cn');
  myHeaders.append(
    'User-Agent',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.40(0x18002830) NetType/WIFI Language/zh_CN',
  );
  myHeaders.append(
    'Referer',
    'https://pele.qiyusoft.cn/eleapp/team/item.html?id=1&sid=510922732',
  );
  myHeaders.append('Connection', 'keep-alive');
  myHeaders.append('Sec-Fetch-Dest', 'empty');
  try {
    myHeaders.append('Cookie', 'JSESSIONID=' + jsessionid);
  } catch (e) {
    console.log('失败');
    console.log(e);
  }
  myHeaders.append('Content-Type', 'application/json');
  console.log('饿了么jsessionid', myHeaders);

  return myHeaders;
};
