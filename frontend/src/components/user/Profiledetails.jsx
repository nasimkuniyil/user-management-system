import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SocialLinks from "../common/SocialLinks";
import API from "../../api/axios";

const Profiledetails = () => {
    const [localUserDetails, setLocalUserDetails] = useState(null);

    const {user, token} = useSelector((state) => state.auth);


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (token) {
                try {
                    const response = await API.get('/user/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log('res.data : ',response.data);
                    const userData = response.data.user
                    setLocalUserDetails(userData);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        setLocalUserDetails(user?.profile);
    }, [user]);

    return (<>
        <header className="w-full h-screen px-2 py-4 flex flex-col justify-center items-center text-center bg-gray-900">
            <img className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-red-600/100 bg-indigo-50 text-indigo-600 h-24 w-24 !h-48 !w-48" src={localUserDetails?.image ? `http://localhost:4000${localUserDetails?.profileImage}` : 'https://static.thenounproject.com/png/801397-200.png'}
                alt="" />
            <h1 className="text-2xl text-gray-500 font-bold mt-2">
                {localUserDetails ? localUserDetails.name : 'Loading...'}
            </h1>
            <h2 className="text-base md:text-xl text-gray-500 font-bold">
                {localUserDetails ? localUserDetails.email : 'Loading...'}
            </h2>
        </header >
    </>
    )
}

export default Profiledetails