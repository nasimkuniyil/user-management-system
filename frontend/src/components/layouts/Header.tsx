import React from 'react'
import Button from '../ui/Button'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='fixed w-full flex justify-between shadow-sm items-center py-3 px-8 md:px-16 lg:px-24'>
        <div>
            <p className='text-lg font-bold'>UMS</p>
        </div>
        <div>
            <nav className='flex gap-3'>
                <Button isFill>
                  <NavLink to={"/auth/signup"}>Create Account</NavLink>
                </Button>
                <Button>
                  <NavLink to={"/auth/login"}>Login</NavLink>
                </Button>
            </nav>
        </div>
    </div>
  )
}

export default Header