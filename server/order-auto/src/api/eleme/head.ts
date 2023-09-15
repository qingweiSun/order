export const elemeHeaders = async (jsessionid: string) => {
  return {
    Cookie: 'JSESSIONID = ' + jsessionid,
    'Content-Type': 'application/json',
  };
};
