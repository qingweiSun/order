import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  //
  // try {
  //   const result =
  //     await sql`CREATE TABLE OrderAuto ( Jsessionid varchar(255), type varchar(255) );`;
  // } catch (error) {
  // }
  const reqBody = await req.json();
  const jsessionid = reqBody.jsessionid;
  const type = 'mt';
  console.log(jsessionid);
  try {
    //删除 type 为 mt 的数据
    await sql`DELETE FROM OrderAuto WHERE Type = 'mt';`;
    await sql`INSERT INTO OrderAuto (Jsessionid, Type) VALUES (${jsessionid}, ${type});`;
    //await kv.set(type, jsessionid);
    return new Response('ok');
  } catch (e) {
    console.log(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}
