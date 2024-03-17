"use client"
import { ReactNode, createContext, useEffect, useState } from "react";

interface SessionContext {
  session: Session | null,
  setSession: (session: Session | null) => void
  handleClicks: () => void
  clicked: boolean
  posts: PostType[] | null
}
type PostType = {
  post_id: number
  post_title: string
  content: string
  banner_url: string
  preview_description: string
}
interface Session{
  username: string,
  email: string,
  picture ?: string
}
export const ThemeContext = createContext<SessionContext>({} as SessionContext)

export default function ThemeProvider({ children }: {children: ReactNode}) {
  const [clicks, setClicks] = useState(0)
  const [clicked, SetClicked] = useState(false)
  const [posts, setPosts] = useState<PostType[] | null>(null)
  const handleClicks = () => {
    console.log('click')
    console.log(clicked)
    if (clicks < 5) {
      setClicks(clicks + 1)
    } else if (clicks >= 5) {
      SetClicked(true)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts`)
      const responseJSON = await response.json()
      if (response.ok) {
        setPosts(responseJSON)
      }
    }
    fetchData()
  }, 
  [])
  const [session, setSession] = useState<Session | null>(null)
  
  return <ThemeContext.Provider value={{session, setSession, handleClicks, clicked, posts}}>{children}</ThemeContext.Provider>
}
