import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Criptobros | Inicio',
  description: '...',
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className='w-full h-72 flex flex-col bg-gradient-to-br from-[#014B79] to-[#48719f] text-white justify-center items-center px-12 py-2 lg:h-96'>
        <p className='text-3xl font-semibold flex text-white text-center lg:text-4xl'>Noticias y Tendencias del mundo Cripto</p>
      </section>
      <section className='flex flex-col px-8 py-6'>
        <h2 className='text-2xl font-semibold text-[#042e49] mb-4'>Entradas recientes</h2>
      </section>
    </main>
  )
}
