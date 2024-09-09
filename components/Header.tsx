import { CiSearch } from "react-icons/ci";
import SignOut from './auth/SignOut';
import serverActions from '@/utils/serverActions';
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

interface UserProps {
    _id?: string
    username: string,
    email?: string,
    __v?: number
}

const Header = () => {
    const params = useParams<{ username: string }>()

    const [user, setUser] = useState<UserProps | null>(null)
    useEffect(() => {
        fetchUser()

        return () => {
            fetchUser()
        }
    }, [])

    const fetchUser = async () => {
        const response = await fetch(`http://localhost:3000/api/home/${params.username}`)
        const userData: UserProps = await response.json()
        setUser(userData)
        // console.log('USERDATE >>>>>>>> ', userData)
    }

    return (
        <div className='flex flex-row justify-between items-center mt-3'>
            <div className='flex flex-row items-center mt-5'>
                <div className='h-[4rem] w-[4rem] rounded-full flex justify-center items-center border border-blue-400'>
                    <div className='h-[3.5rem] w-[3.5rem] rounded-full flex justify-center items-center bg-slate-300'>
                        <h1 className='text-xl font-semibold'>JB</h1>
                    </div>
                </div>
                <div className='ml-4 p-6 shadow-sm rounded-2xl'>
                    <h1 className='text-xl font-semibold whitespace-nowrap'>Welcome, {user?.username}</h1>
                    <p className='text-[14px] whitespace-nowrap text-blue-600'>What would you like to write today?</p>
                    <SignOut SignoutServerAction={serverActions} />
                </div>
            </div>
            <div className='w-[30%] flex flex-row items-center'>
                <input
                    type='text'
                    placeholder='Search...'
                    className='w-full h-10 border-b border-b-slate-500 outline-none'
                />
                <button className='text-2xl -ml-5'>
                    <CiSearch />
                </button>
            </div>
        </div>)
}

export default Header