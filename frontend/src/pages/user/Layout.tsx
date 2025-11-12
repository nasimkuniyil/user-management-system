import { Outlet } from 'react-router-dom'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'

const Layout = () => {
    return (
        <div>
            <Header />
            <div className='h-screen flex justify-center items-center'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout