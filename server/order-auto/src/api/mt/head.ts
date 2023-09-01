export const mtHeaders = async (jsessionid: string) => {
  const myHeaders = {
    Cookie: 'JSESSIONID = ' + jsessionid,
    'Content-Type': 'application/json',
  };
  console.log('美团jsessionid', myHeaders);
  return myHeaders;
};
