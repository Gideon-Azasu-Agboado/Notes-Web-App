import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { IoPencilSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    description: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    createdAt: string,
    updatedAt: string,
    updateState: boolean | null,
    setTypeCheck: React.Dispatch<React.SetStateAction<string>>,
}

const ViewDetails = ({ show, setShow, title, setTitle, description, setDescription, createdAt, updatedAt, updateState, setTypeCheck }: Props) => {
    const formatRelativeTime = (timestamp: string) => {
        const date = parseISO(timestamp);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    const close = () => {
        setShow(false)
        setTypeCheck('neither')
        setTitle('')
        setDescription('')
    }

    return (
        <>
            {
                show &&
                <div className='absolute left-0 right-0 bottom-0 top-0 bg-slate-900/20 flex justify-center items-center'>
                    <div className='h-[90vh] w-[60%] bg-slate-100 rounded-xl px-12 py-12 shadow-lg'>
                        <div className='flex justify-end'>
                            <div className='flex flex-row items-center gap-5'>
                                <div className='group relative'>
                                    <h1 className='cursor-pointer'>
                                        <IoPencilSharp
                                        />
                                    </h1>
                                    <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 -right-5 hidden group-hover:block transition duration-700 bg-slate-50'>
                                        <p className='text-blue-700 text-[14px]'>Edit</p>
                                    </div>
                                </div>
                                <div className='group relative'>
                                    <span className='cursor-pointer text-3xl flex justify-center items-center rounded-full'>
                                        <IoCloseOutline onClick={() => close()} />
                                    </span>
                                    <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 hidden group-hover:block transition duration-700 bg-slate-50'>
                                        <p className='text-blue-700 text-[14px]'>Close</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 flex flex-row justify-between items-center'>
                            <h1 className='text-xl font-semibold'>
                                {title}
                            </h1>
                            {
                                updateState
                                    ?
                                    <p className='text-xs text-gray-500'>Updated {formatRelativeTime(updatedAt)}</p>
                                    :
                                    <p className='text-xs text-gray-500'>Created {formatRelativeTime(createdAt)}</p>
                            }
                        </div>
                        <div className='my-4 border-b border-b-slate-300' />
                        <p className='mt-8'>
                            {description}
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default ViewDetails