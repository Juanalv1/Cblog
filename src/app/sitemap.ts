
type PostType = {
  post_id: number
  post_title: string
  content: string
  banner_url: string
  preview_description: string
}

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}>
export default async function sitemap() : Promise<Sitemap> {
  const fetchURL = 'https://criptobros.com/api/v1/posts';
  const site_URL = 'https://criptobros.com';
  const currentDate = new Date();
  try {
    const req = await fetch(fetchURL);
    const posts = await req.json();
    let pages = []
    const staticPages = [
      {
        url: 'https://piratajuegos.com',
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1,
      },
    ];


    if (posts) {
      const dynamicPages = posts.map((post: PostType) => (
        {
        url: `${site_URL}/blog/${post.post_title}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1,
      })); 
      pages = [...dynamicPages, ...staticPages];
    } else {
      pages = [...staticPages];
    }
      return pages;
  } catch (error) {
    console.error('Error al obtener datos: ', error);
    return [];
  }
}