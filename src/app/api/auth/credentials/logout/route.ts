import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Error from "next/error";

export async function GET (req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");

  if (!token) {
    return NextResponse.json({
      message: "Not logged in",
    }, {
      status: 401,
    })
  }
  try {
    cookieStore.delete("sessionToken");

    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({status: 500});
  }
}