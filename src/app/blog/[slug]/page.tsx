import PostPage from '@/app/components/PostPage'
import { Metadata, ResolvingMetadata } from 'next'
import { SlUserFollowing } from 'react-icons/sl'

type PostType = {
    post_id: number,
    post_title: string,
    banner_url: string,
    content: string
    preview_description: string
}
type Props = {
  params: { slug: string }
}


 
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const decodedSlug = decodeURIComponent(params.slug)

  const slug = decodedSlug.replace(/-/g, " ").replace(/%2c/g, ',')

  return {
    title: slug,
    description: slug,
    alternates: {
      canonical: `https://criptobros.com/blog/${slug}`,
  }
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  const decodedSlug = decodeURIComponent(params.slug)
  const slug = decodedSlug.replace(/-/g, " ").replace(/%2c/g, ',')
  console.log(slug)
  return (
    <main>
      <section className='px-2 md:px-6 py-2 md:py-4 justify-center items-center flex flex-col text-[#3E4C5C]'>
        <PostPage slug={slug}/>
      </section>
    </main>
  )
}

export default Page
