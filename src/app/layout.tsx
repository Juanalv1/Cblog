import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import ThemeProvider from './context/ThemeContext';
import Footer from './components/Footer';



export const metadata: Metadata = {
  title: 'CriptoBro',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
        <html lang="en">
          <body className='font-Poppins'>
            <Navbar />
            {children}
            <Footer/>
          </body>
        </html>
    </ThemeProvider>
    
  )
}
