export const elemeHeaders = async (jsessionid: string) => {
  const myHeaders = {
    Cookie: 'JSESSIONID = ' + jsessionid,
    'Content-Type': 'application/json',
  };
  console.log('饿了么jsessionid', myHeaders);
  return myHeaders;
};
