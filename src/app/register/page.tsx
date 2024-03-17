"use client"
import React, { useContext, useState  } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import bcrypt from 'bcryptjs'
import { ThemeContext } from '../context/ThemeContext';
import { useRouter } from 'next/navigation';

interface FormInput {
  email: string,
  password: string,
  name: string
}
interface CustomError {
  message: string,
  status: number
}

const Register = () => {
  const router = useRouter()
  const [customError, setCustomError] = useState<CustomError>({} as CustomError)
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    let userData = data
      const res = await fetch('/api/auth/credentials/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      const resJSON = await res.json()
      if(resJSON.status === 409){
        setCustomError(resJSON)
      } else if(resJSON.status === 201){
          router.push('/login')
      }   
  }
  ;
  return (
    <main className='flex justify-center items-center w-full min-h-screen '>
      <section className='border-solid border-gray-800 border flex flex-col py-6 px-6 rounded-lg text-[#042e49]'>
        <h1 className='text-xl font-semibold mb-4'>Register</h1>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          {customError.message && <p className='text-red-500'>{customError.message}</p>}
          <label className='' htmlFor='inputmail'>Name</label>
          <input type='text' className='outline-none py-2 px-2 border-solid border-gray-800 rounded-lg border mb-6 mt-1 ' {...register('name', {required: true})}/>
          <label className='' htmlFor='inputmail'>Email</label>
          <input type='text' className='outline-none py-2 px-2 border-solid border-gray-800 rounded-lg border mb-6 mt-1 ' placeholder='Criptobro@mail.com' {...register('email', {required: true, minLength: 8})}/>
          <label className='' htmlFor='inputpassword'>Password</label>
          <input type='text' className='outline-none py-2 px-2 border-solid border-gray-800 rounded-lg border mb-6 mt-1' placeholder='*********' {...register('password', {required: true})}/>
          <button className='text-lg text-white rounded-lg px-2 py-1 bg-[#042e49]'>Register</button>
        </form>
      </section>
    </main>
  )
  }

export default Register
