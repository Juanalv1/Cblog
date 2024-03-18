"use client"
import PostCard from '@/app/components/PostCard'
import { ThemeContext } from '@/app/context/ThemeContext'
import {useState, useEffect, useContext} from 'react'

type PostType = {
  post_id: number,
  post_title: string,
  banner_url: string,
  content: string
  preview_description: string
}

function PostPage({slug} : {slug: string}) {
  const { posts, session } = useContext(ThemeContext)
  const [post, setPost] = useState<PostType>({} as PostType)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts/title/${slug}`)
      const resJSON = await res.json()
      setPost(resJSON)
      console.log(resJSON)
    }
    fetchData()
  }, [])
  return (
    <>
              {post && (
          <article className='flex flex-col py-2 px-2 md:py-2 md:px-2 lg:w-2/3'>
            {session && (
              <p>Id del post <b>{post.post_id}</b></p>
            )}
            <img src={post.banner_url} className=' rounded-md mb-12 max-w-[500px] mx-auto flex w-full lg:w-[500px]'/>
            <h1 className='text-4xl font-bold mb-2
            '>{post.post_title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} className='text-[#3E4C5C]'/>
          </article>
        )}
        {posts && (
          <article className='flex flex-col py-4 px-6 justify-center border-t-black w-full mt-4 lg:px-12 xl:px-24'>
            <p className='text-2xl font-medium my-2 pb-1'>Posts relacionados</p>
            <div className='flex flex-col lg:flex-row gap-y-4 gap-x-6'>
              {Array.isArray(posts) && posts?.slice(0, 4).map((post: PostType, index) =>(
                <PostCard description={post.preview_description} banner_url={post.banner_url} title={post.post_title} key={index}/>
              ))}
            </div>
          </article>
        )}
    </>
  )
}

export default PostPage
