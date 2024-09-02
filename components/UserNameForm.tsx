'use client'
import React, { useState } from 'react'

const UserNameForm = () => {
    const [username, setUsername] = useState('')

    return (
        <div className='mt-12 flex justify-center'>
            <div>
                <h1 className='text-xl mb-14 text-center'>Thanks for using Notes Web App. You can start by telling us your name</h1>
                <div className='flex flex-col items-center py-10 rounded-lg'>
                    <label className='text-center text-xl'>
                        Enter your username
                    </label>
                    <input
                        type='text'
                        placeholder='Eg: Johny Brown'
                        className='w-[60%] h-12 p-3 bg-slate-100 rounded-xl mt-8 outline-blue-200'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className='h-12 w-40 bg-blue-800 rounded-xl text-slate-50 hover:bg-blue-700 mt-7'>Save Name</button>
                </div>

            </div>
        </div>
    )
}

export default UserNameForm