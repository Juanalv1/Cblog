
import { Metadata } from 'next'
import SearchPage from "../components/SearchPage"
 
export const metadata: Metadata = {
  title: 'Criptobros | Busqueda',
}

const Search = () => {
  return (
    <main>
      <section className="w-full flex flex-col px-6 py-4 min-h-screen relative md:px-16 lg:px-38 xl:px-44">
        <h1 className="text-2xl font-medium my-1">Busqueda por titulo</h1>
        <SearchPage />
      </section>
    </main>
  )
}

export default Search
