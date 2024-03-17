import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import prisma from "@/app/libs/db"

type User = {
  email: string,
  password: string,
  name: string
}
export async function POST (request: Request) {
  const body: User = await request.json()
  try {
    if (body) {
      const userFound = await prisma.users.findUnique(
        {where: {email: body.email}})
      if (!userFound) {
        return NextResponse.json({message: 'User not found'}, {status: 404})
      } else if (userFound && userFound.password) {
        const match = await bcrypt.compare(body.password, userFound.password)
        if (match) {
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
              username: userFound.name,
              email: userFound.email,
              picture: userFound.img_url || ''
            }, 'secret')
  
            const response = NextResponse.json({
              username: userFound.name,
              email:  userFound.email,
              picture: userFound.img_url
            });
            response.cookies.set({
              name: "sessionToken",
              value: token,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 1000 * 60 * 60 * 24 * 30,
              path: "/",
            });
            return response
        } else {
  
          return NextResponse.json({message: 'Invalid email or password'}, {status: 401})
        }}}
  } catch (error) {
    console.error(error)
    return NextResponse.json({error}, {status: 500})
  }
}