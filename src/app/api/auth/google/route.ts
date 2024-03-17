import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";
interface Session{
  name: string,
  email: string,
  picture: string
}
export async function POST(request: Request) {
  const body = await request.json();
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  if (!body) {
    const response = NextResponse.json(
      {
        message: "Invalid body",
      },
      {
        status: 400,
      }
    );
    return response;
  }

  async function verify(body: any) {
    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  }

  try {
    const payload = await verify(body).catch(console.error);
    if ( payload?.email && payload?.name && payload?.picture ){
      const sessionData: Session =  {
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      }
      return NextResponse.json(sessionData);
    }

  } catch (error) {
    const response = NextResponse.json(
      {
        code: 400,
        message: error instanceof Error ? error.message : "Unknown",
      },
      {
        status: 400,
      }
    );
    return response;
  }
}