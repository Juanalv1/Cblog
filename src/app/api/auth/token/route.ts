import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Session = {
  email:string,
  exp: number,
  iat: number,
  picture ?: string,
  username: string,
}
export async function GET (req: Request, res: Response) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  if (!token) {
    return NextResponse.json({message: 'invalid token'}, {status: 401})
  }
  const {email, username, picture} = jwt.verify(token.value, 'secret') as Session
  return NextResponse.json({email, username, picture}, {status: 200})
}