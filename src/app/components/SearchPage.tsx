"use state"
import { FormEvent, useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Link from "next/link"

type PostType = {
  post_id: number
  post_title: string
  content: string
  banner_url: string
  preview_description: string
}


const SearchPage = () => {
  const [query, setQuery] = useState<string>()
  const [results, setResults] = useState<PostType[]>()
  const [searchClick, setSearchClick] = useState(false)
  const { posts } = useContext(ThemeContext)


  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
    if (searchClick && results) {
      setSearchClick(false)
      setResults(undefined)
    }
  }
  const handleClear = () => {
    setQuery(undefined)
    setResults(undefined)
    setSearchClick(false)
  }
  const handleSearch = () => {
    console.log(searchClick)
    if (posts && query) {
      const filtered = posts.filter(post => post.post_title.toLowerCase().includes(query.toLowerCase()))
      setResults(filtered)
    }
    setSearchClick(true)
  }
  return (
    <>
              <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4 items-center">
        <input type="text" onChange={handleChange} value={query} className="relative w-full outline-none border-solid border-2 border-gray-500 rounded-lg px-4 py-2 my-2" placeholder="Ingresa un titulo..."/>
        <div className="flex gap-x-4">
          <button className="bg-green-600 text-white font-medium px-6 rounded-lg py-2" onClick={handleSearch}>Buscar</button>
          <button className="bg-red-600 text-white font-medium px-6 rounded-lg py-2" onClick={handleClear}>Limpiar</button>
        </div>

        </div>
        <div className="relative flex flex-col ">
        {query && searchClick && (
          <div className="flex flex-col mt-6">
            <h2 className="text-xl font-medium">Resultados para: <b>{query}</b></h2>
          </div>
        )}
        {results && (
          <div className=" shadow-xl p-4 flex flex-col relative top-10 w-full rounded-lg gap-y-2 bg-slate-100">
            {results.map((result) => (
              <Link href={`/blog/${result.post_title.replace(/ /g, "-")}`} key={result.post_id} className="flex justify-between items-center hover:bg-gray-200 py-1 px-4 shaodw-xl">
                <img src={result.banner_url}  className="rounded w-36 h-20"/>
                <p className="w-3/5">{result.post_title}</p>
              </Link>
            ))}
          </div>
        )}
          </div>
    </>
  )
}

export default SearchPage
