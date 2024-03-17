import React from 'react'

const ErrorMesssage = ({text} : {text: string}) => {
  return (
    <div className='fixed top-2 right-2 flex items-center justify-center bg-red-500 text-white rounded-xl px-7 py-4 z-20 text-lg font-medium'>
      {text}
    </div>
  )
}

export default ErrorMesssage
