'use client'
import React, { useState } from 'react'

const Form = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    return (
        <form className='mt-6'>
            <div className='flex flex-col'>
                <label className='font-semibold'>
                    Enter title
                </label>
                <input
                    type='text'
                    placeholder='Eg: A dream I once had'
                    className='w-full h-12 p-3 bg-slate-100 rounded-xl mt-4 outline-blue-200'
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='flex flex-col mt-6'>
                <label className='font-semibold'>
                    Enter description
                </label>
                <textarea
                    placeholder='Description goes here...'
                    className='w-full h-[12rem] p-3 bg-slate-100 rounded-xl mt-4 outline-blue-200'
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='w-full flex justify-end mt-9'>
                <button className='h-12 w-40 bg-blue-800 rounded-xl text-slate-50 hover:bg-blue-700'>Save Note</button>
            </div>
        </form>
    )
}

export default Form