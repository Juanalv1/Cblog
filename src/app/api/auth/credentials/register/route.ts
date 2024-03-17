import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import prisma from "@/app/libs/db"

type User = {
  email: string,
  password: string,
  name: string
}
export async function POST (request: Request) {
  const body: User = await request.json()
  if (body) {
    const userFound = await prisma.users.findUnique(
      {where: {email: body.email}}
    )
    if(!userFound && (body.password && body.email && body.name)) {
      const hashedPass = await bcrypt.hash(body.password, 10)
      const newUser = await prisma.users.create({
        data: {
          email: body.email,
          password: hashedPass,
          name: body.name,
        }
      })
      const response = {
        newUser,
        status: 201
      }
      return NextResponse.json(response)
    } else if(userFound){
      const response = {
        message: 'User already exist',
        status: 409
      }
      return  NextResponse.json(response)
    }
  }
}