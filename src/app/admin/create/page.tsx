"use client"
import {useState, useRef, useMemo, FormEvent, ChangeEvent} from 'react';
import JoditEditor from 'jodit-react';
import { useRouter } from 'next/navigation';
import ErrorMesssage from '@/app/components/ErrorMessage';
import SuccessMesssage from '@/app/components/SuccessMesssage';
import { z } from "zod";

function Create() {

  const postSchema = z.object({
    post_title : z.string().min(10),
    content : z.string().min(10),
    preview_description : z.string().min(10),
    banner_url : z.string().url()
  });

  const router = useRouter()
	const editor = useRef(null);
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()
	const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [banner_url, setBanner_url] = useState<string>()

  const handleSend = async () => {
    const post = {
      post_title: title,
      content: content,
      preview_description: preview,
      banner_url: banner_url
    }
    const validation = postSchema.safeParse(post)
    if (validation.success == false) {
      setError('Post invalido, por favor corrigelo')
      setTimeout(() => {
        setError(undefined)
      }, 4000);
    } else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts/create`, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        })
        if (res.status == 201) {
          setSuccess('Post creado exitosamente, redirigiendo en 5 segundos...')
          setTimeout(() => {
            router.push(`/blog/${title}`)
          }, 5000);
        }
        else {
          console.log(res)
          setError('Error al crear el post')
          setTimeout(() => {
            setError(undefined)
          }, 4000);
        }
      } catch (error) {
        console.log(error)
        setError('Error al crear el post')
        setTimeout(() => {
          setError(undefined)
        }, 4000);
      }
    }

    
  }
const handleBanner = (e: FormEvent<HTMLInputElement>) => {
  setBanner_url(e.currentTarget.value)
}
const handleBlur = (e: FormEvent<HTMLInputElement>) => {
  setTitle(e.currentTarget.value)
}
  const handlePreview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPreview(e.target.value)
  }
  return (
    <main className='flex w-full min-h-screen flex-col'>
      {success && (<SuccessMesssage text={success}/>)}
      {error && (<ErrorMesssage text={error}/>)}
      <section className='flex w-full flex-col px-12 py-6 gap-y-2'>
        <label htmlFor='name' className='text-xl font-medium  mb-1'>Ingresa URL del banner</label>
        <input type='text' name='title' className='outline-none border-black border-solid px-4 py-2 border rounded' placeholder='URL...' onBlur={handleBanner}/>
        {banner_url && (
          <img  src={banner_url} className='py-4 rounded-lg px-12 max-w-96'/>
        )}
        <label htmlFor='name' className='text-xl font-medium  mb-1'>Crea un titulo</label>
        <input type='text' name='title' className='outline-none border-black border-solid px-4 py-2 border rounded' placeholder='Titulo...' onBlur={handleBlur}/>
        <label htmlFor='name' className='text-xl font-medium  mb-1'>Preview description</label>
        <textarea name='preview_description' className='outline-none border-black border-solid px-4 py-2 border rounded' placeholder='Añade una descripcion...' onBlur={handlePreview}/>
        <label className='text-xl font-medium  mt-6'>Contenido del post</label>
        <JoditEditor
        ref={editor}
        value={content}
        onBlur={(newContent) => {
          setContent(newContent)
        }}
        className='mt-2'/>

        {/* <label className='text-xl font-medium  mt-6'>Categorias</label>
        <select name='select'>
        </select> */}

        <button onClick={handleSend} className=' bg-green-600 text-white py-2 px-4 rounded-lg'>Submit</button>
      </section>
    </main>
  )
}

export default Create
