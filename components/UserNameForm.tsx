'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

const UserNameForm = () => {
    const params = useParams<{ email: string }>()
    const router = useRouter();

    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username) {
            toast('Please enter a username');
            return;
        }

        try {
            setLoading(true)
            const response = await fetch('/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        username,
                        email: params.email
                    }
                ),
            });

            const data = await response.json()

            if (response.ok) {
                toast(data.message);
                setLoading(false)
                setTimeout(() => {
                    router.push(`/home/${username}`)
                }, 2000);
            }
        } catch (error: any) {
            toast('Error saving name. Try again later. Make sure email is not already in use.');
            setLoading(false)
        }
    }

    return (
        <div className=' flex justify-center'>
            <div>
                <h1 className='text-4xl font-semibold text-center mt-20'>Notes Web App</h1>
                <p className='text-center pt-3'>Save notes that you would like to keep with you forever</p>
                <h1 className='text-xl mb-14 text-center mt-12'>Thanks for using Notes Web App. You can start by telling us your name</h1>
                <form className='flex flex-col items-center py-10 rounded-lg' onSubmit={handleSubmit}>
                    <label className='text-center text-xl'>
                        Enter your username
                    </label>
                    <input
                        type='text'
                        placeholder='Eg: Johny Brown'
                        className='w-[60%] h-12 p-3 bg-slate-100 rounded-xl mt-8 outline-blue-200'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='h-12 w-40 bg-blue-800 rounded-xl text-slate-50 hover:bg-blue-700 mt-7'
                    >
                        {
                            loading
                                ?
                                <span>Saving Name</span>
                                :
                                <span>Save Name</span>
                        }
                    </button>
                </form>
            </div>
        </div >
    )
}

export default UserNameForm