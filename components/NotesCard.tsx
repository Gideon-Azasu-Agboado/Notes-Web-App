import React from 'react'
import { IoPencilSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";

const NotesCard = () => {
    return (
        <div className='p-9 shadow-lg rounded-xl mb-6 hover:shadow-xl'>
            <div className='flex justify-end'>
                <div className='flex flex-row gap-5'>
                    <div className='group relative'>
                        <h1 className='cursor-pointer'>
                            <IoPencilSharp />
                        </h1>
                        <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 right-1 hidden group-hover:block transition duration-700'>
                            <p className='text-blue-700 text-[14px]'>Edit</p>
                        </div>
                    </div>
                    <div className='group relative'>
                        <h1 className='cursor-pointer'>
                            <RiDeleteBin6Fill />
                        </h1>
                        <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 hidden group-hover:block transition duration-700'>
                            <p className='text-blue-700 text-[14px]'>Delete</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='font-medium text-xl mt-3'>The dream I once had</h1>
            <p className='pt-2 line-clamp-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <div className='flex justify-end mt-4'>
                <p className='text-xs text-gray-500'>Created on: 27th July, 2034</p>
            </div>
        </div>
    )
}

export default NotesCard