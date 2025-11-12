import React, { type FormEvent } from 'react'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'

const Login = () => {

    function handleSubmit(e:FormEvent){
        e.preventDefault();
        alert('form submitted')
    }

  return (
    <div className='bg-white p-10 rounded-xl shadow-md'>
        <div className='text-center pb-5'>
            <h4>Login</h4>
        </div>
        <div>
            <form action="" onSubmit={handleSubmit} className='space-y-5'>
                <InputField/>
                <InputField/>
                <Button isFill className='w-full'>Login</Button>
            </form>
        </div>
    </div>
  )
}

export default Login