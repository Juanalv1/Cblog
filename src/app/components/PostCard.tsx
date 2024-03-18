import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { TiThLarge } from 'react-icons/ti'
import { MdTimeToLeave } from 'react-icons/md'

const PostCard = ({description, banner_url, title} : {description: string, banner_url: string, title: string}) => {
  const shortDescription = description.substring(0, 150) + "..."
  return (
    <Link className='flex flex-col h-80 w-72 shadow-lg border-2 hover:bg-[#d3dadf] hover:border-[#279ff0] hover:shadow-2xl cursor-pointer rounded-lg' href={`/blog/${encodeURI(title.replace(/ /g, "-").replace(/,/g, "%2c"))}`}>
      <div className=' w-full flex h-[45%] relative'>
        <Image src={banner_url} fill={true}  alt={title} className='relative object-fill rounded-t-md'/>
      </div>
      <div className='p-4 flex flex-col justify-center h-[55%]'>
        <h2 className='font-semibold text-lg text-[#042e49]'>{title}</h2>
        <p className='text-sm text-[#314857] font-medium leading-5 overflow-hidden'>{shortDescription}</p>
      </div>
    </Link>
  )
}

export default PostCard
