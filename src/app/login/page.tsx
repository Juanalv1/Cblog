"use client"
import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ThemeContext } from '../context/ThemeContext';
import { useForm, SubmitHandler } from "react-hook-form";
import bcrypt from 'bcryptjs'


interface Session{
  name: string,
  email: string,
  picture: string
}
interface FormInput {
  email: string,
  password: string,
  name: string
}
interface CustomError {
  message: string,
  status: number
}


const Login = () => {
  const router = useRouter()
  const {session, setSession} = useContext(ThemeContext)
  const [customError, setCustomError] = useState<CustomError>({} as CustomError)
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    let userData = data
      const res = await fetch('/api/auth/credentials/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      const resJSON = await res.json()
      if(res.status === 400 || res.status === 401){
        setCustomError(resJSON)
      } else if(res.status === 200){
        setSession(resJSON)
        console.log(resJSON)
        router.push('/')
      }  
  }
  

  return (
    <main className='flex justify-center items-center w-full min-h-screen '>
      <section className='border-solid border-gray-800 border flex flex-col py-6 px-6 rounded-lg text-[#042e49]'>
        <h1 className='text-xl font-semibold mb-4'>Login</h1>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          {customError.message && <p className='text-red-500'>{customError.message}</p>}
          <label className='' htmlFor='inputmail'>Email</label>
          <input type='text' className='outline-none py-2 px-2 border-solid border-gray-800 rounded-lg border mb-6 mt-1 ' placeholder='Criptobro@mail.com' {...register('email', {required: true, minLength: 8})}/>
          <label className='' htmlFor='inputpassword'>Password</label>
          <input type='text' className='outline-none py-2 px-2 border-solid border-gray-800 rounded-lg border mb-6 mt-1' placeholder='*********' {...register('password', {required: true})}/>
          <button className='text-lg text-white rounded-lg px-2 py-1 bg-[#042e49]'>Login</button>
        </form>
      </section>
    </main>
  )
}

export default Login
