import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div>
            <div className='h-screen flex justify-center items-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout