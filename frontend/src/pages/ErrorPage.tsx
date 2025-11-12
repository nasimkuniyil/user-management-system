import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='h-dvh w-dvw flex justify-center items-center flex-col'>
      <h1 className='text-red-500 outline-4 rounded-full h-20 w-20 text-center'>!</h1>
        <h2 className='text-red-500'>Page Not Found</h2>
        <p className='text-red-500 pb-5'>Please check the url.</p>
        <Link to={'/'} className='bg-blue-500 py-1.5 px-3 rounded-xl text-white'>Home</Link>
    </div>
  )
}

export default ErrorPage