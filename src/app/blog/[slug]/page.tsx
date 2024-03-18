import PostPage from '@/app/components/PostPage'
import { Metadata, ResolvingMetadata } from 'next'

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
  const slug = params.slug.toLowerCase().replace(/-/g, " ")
  return {
    title: slug,
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug.toLowerCase().replace(/-/g, " ")
  return (
    <main>
      <section className='px-2 md:px-6 py-2 md:py-4 justify-center items-center flex flex-col text-[#3E4C5C]'>
        <PostPage slug={slug}/>
      </section>
    </main>
  )
}

export default Page
