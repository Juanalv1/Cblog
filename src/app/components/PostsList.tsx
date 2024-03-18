"use client"
import { useContext } from 'react'
import { ThemeContext } from './../context/ThemeContext'
import PostCard from './PostCard'

const PostsList = () => {
  const { posts } = useContext(ThemeContext)
  return (
  <div className='grid gap-y-6 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 place-items-center md:gap-y-10'>
    {posts && posts?.map((post, index) => (
      <PostCard description={post.preview_description} banner_url={post.banner_url} title={post.post_title} key={index}/>
    ))}
  </div>
  )
}

export default PostsList
