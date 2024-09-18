import { CiSearch } from "react-icons/ci";
import SignOut from './auth/SignOut';
import SignOutActions from '@/actions/SignOutActions';
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

interface Props {
    username: string | undefined,
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
}

const Header = ({ username, query, setQuery }: Props) => {
    const [initials, setInitials] = useState('')

    useEffect(() => {
        if (username) {
            setInitials(getInitials(username));
        }
    }, [username]);

    const getInitials = (username: string) => {
        const words = username.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0][0];
        }

        return words.map(word => word[0]).join('');
    }

    return (
        <div className='flex flex-row justify-between items-center mt-3'>
            <div className='flex flex-row items-center mt-5'>
                <div className='h-[4rem] w-[4rem] rounded-full flex justify-center items-center border border-blue-400'>
                    <div className='h-[3.5rem] w-[3.5rem] rounded-full flex justify-center items-center bg-slate-300'>
                        <h1 className='text-xl font-semibold'>{initials}</h1>
                    </div>
                </div>
                <div className='ml-4 p-6 shadow-sm rounded-2xl'>
                    <h1 className='text-xl font-semibold whitespace-nowrap'>Welcome, {username}</h1>
                    <p className='text-[14px] whitespace-nowrap text-blue-600'>What would you like to write today?</p>
                    <SignOut SignoutServerAction={SignOutActions} />
                </div>
            </div>
            <div className='w-[30%] flex flex-row items-center'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={query}
                    className='w-full h-9 border-b border-b-slate-500 outline-none'
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>)
}

export default Header