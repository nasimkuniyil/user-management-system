import React from 'react'

const InputField = () => {
    return (
        <div className='space-y-2'>
            {/* <label htmlFor="" className='block text-slate-500'>Email</label> */}
            <input placeholder='Email' type="text" className='border border-slate-300 rounded-md text-lg px-3 py-1.5 placeholder:text-slate-400'/>
        </div>
    )
}

export default InputField