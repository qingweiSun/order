export const mtHeaders = async (jsessionid: string) => {
  return {
    Cookie: 'JSESSIONID = ' + jsessionid,
    'Content-Type': 'application/json',
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0',
    Host: 'pmt.qiyusoft.cn',
    Accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'Sec-Fetch-Mode': 'cors',
    Origin: 'https://pmt.qiyusoft.cn',
    Referer: 'https://pmt.qiyusoft.cn/meituan/team/shop_apply_order.html',
    Connection: 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
  };
};
