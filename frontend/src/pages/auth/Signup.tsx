import React, { type FormEvent } from 'react'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'

const Signup = () => {

    function handleSubmit(e:FormEvent){
        e.preventDefault();
        alert('form submitted')
    }

  return (
    <div className='bg-white p-10 rounded-xl shadow-md'>
        <div className='text-center pb-5'>
            <h4>Signup</h4>
        </div>
        <div>
            <form action="" onSubmit={handleSubmit} className='space-y-5'>
                <InputField/>
                <InputField/>
                <InputField/>
                <Button isFill className='w-full'>Signup</Button>
            </form>
        </div>
    </div>
  )
}

export default Signup