"use client"
import dynamic from 'next/dynamic';
import {ChangeEvent, FormEvent, useState, useRef} from 'react'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import SuccessMesssage from '@/app/components/SuccessMesssage';
import ErrorMesssage from '@/app/components/ErrorMessage';

type PostType ={
  post_id: number
  post_title: string
  content: string
  banner_url?: string
  preview_description: string
}
const Update = () => {
  const editor = useRef(null);
  const [id, setId] = useState<Number>()
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()
  const [post, setPost] = useState<PostType>()
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setId(Number(e.currentTarget.value))
  }
  const handlePostChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  if (post) {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  }}
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts/id/${id}`)
      const resJSON = await res.json()
      if (res.ok) {
        console.log(resJSON)
        setPost(resJSON)
      } else {
        setError('failed to fetch post data')
        setTimeout(() => {
          setError(undefined)
        }, 4000);
      }
    } catch (error) {
      console.error(error)
      setError('failed to fetch post data')
      setTimeout(() => {
        setError(undefined)
      }, 4000);
    }
  }
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts/update/${post?.post_id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      console.log(res)
      if (res.status == 200) {
        setSuccess('Post actualizado exitosamente')
        setTimeout(() => {
          setSuccess(undefined)
        }, 4000);
      } else {
        setError('failed to update post')
        setTimeout(() => {
          setError(undefined)
        }, 4000);
      }
      const resJSON = await res.json()
      console.log(resJSON)
    } catch (error) {
      setError('failed to update post')
      setTimeout(() => {
        setError(undefined)
      }, 4000);
    }
    
  }
  return (
    <main>
      <section className='flex flex-col gap-y-2 px-6 py-2 min-h-screen'>
        {success && (
          <SuccessMesssage text={success}/>
        )}
        {error && (
          <ErrorMesssage text={error}/>
        )}
        <h1>Update a post</h1>
        <input type='number' className='outline-none px-2 py-1 border-2 border-solid border-neutral-600 rounded-lg my-2' placeholder='Id....' onChange={handleChange}/>
        <button className=' bg-green-700 px-2 py-2 rounded-lg font-medium text-white' onClick={fetchData}>Fetch post</button>
        {post && (
          <div className='flex flex-col gap-y-2'>
            <label className='text-2xl'>Post Title</label>
            <input type="text" value={post.post_title} onChange={handlePostChange} name='post_title' className='outline-none border-solid border border-black py-2 px-2 rounded-lg'/>
            <label className='text-xl font-medium  mt-6'>Contenido del post</label>
        <JoditEditor
        ref={editor}
        value={post.content}
        onBlur={(newContent) => {
          setPost({
            ...post,
            content: newContent
          })
          console.log('aqui')
        }}
        className='mt-2'/>
            <label className='text-2xl'>Preview Description</label>
            <textarea onChange={handlePostChange} name='preview_description' value={post.preview_description} className='outline-none border-solid border border-black py-2 px-2 rounded-lg' rows={5}></textarea>
            <label className='text-2xl'>Banner URL</label>
            <input type="text" value={post.banner_url} onChange={handlePostChange} name='banner_url' className='outline-none border-solid border border-black py-2 px-2 rounded-lg'/>
            <button className=' bg-green-700 px-2 py-2 rounded-lg font-medium text-white' onClick={handleUpdate}>Update post</button>
          </div>
        )}
      </section>
    </main>
  )
}

export default Update
