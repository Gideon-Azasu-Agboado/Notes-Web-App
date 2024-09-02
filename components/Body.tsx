import React from 'react'
import Form from './Form'
import NotesCard from './NotesCard'
import Header from './Header'

const Body = () => {
    return (
        <div>
            <Header />
            <div className='flex flex-row mt-12'>
                <div className='w-[40%]'>
                    <Form />
                </div>
                <div className='w-[50%] ml-20 pl-20 border-l border-l-slate-200'>
                    <div className='overflow-y-scroll h-[40rem] custom-scrollbar py-4 px-7 overflow-x-hidden'>
                        <NotesCard />
                        <NotesCard />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Body