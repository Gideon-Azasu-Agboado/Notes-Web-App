'use client'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface FormProps {
    title: string,
    description: string,
    btnLoading: boolean,
    update: boolean,
    typeCheck: string
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>,
    subnitForm: (e: React.FormEvent<HTMLFormElement>) => void,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    updateForm: (e: React.FormEvent<HTMLFormElement>) => void,
}

const Form = ({ title, setTitle, description, setDescription, btnLoading, setBtnLoading, subnitForm, update, setUpdate, updateForm, typeCheck }: FormProps) => {
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [btnLoading, setBtnLoading] = useState(false)

    // const subnitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     if (!title) {
    //         toast('Please enter a title')
    //         return
    //     }

    //     if (!description) {
    //         toast('Please enter a description')
    //         return
    //     }

    //     try {
    //         setBtnLoading(true)
    //         const body = {
    //             title,
    //             description,
    //             email
    //         }
    //         console.log('BODY >>>>>> ', body)
    //         const response = await fetch('/api/note/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(body),
    //         })

    //         const data = await response.json()

    //         if (response.ok) {
    //             toast(data.message)
    //             setTitle('')
    //             setDescription('')
    //             setbtnLoading(false)
    //         }
    //     } catch (error) {
    //         toast('Error saving note.');
    //         setbtnLoading(false)
    //     }
    // }

    const clear = () => {
        setTitle('')
        setDescription('')
        setUpdate(false)
    }

    return (
        <div>
            {
                update
                    ?
                    <form className='mt-6' onSubmit={updateForm}>
                        <div className='flex flex-col'>
                            <label className='font-semibold'>
                                Enter title
                            </label>
                            <input
                                type='text'
                                value={title}
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
                                value={description}
                                className='w-full h-[12rem] p-3 bg-slate-100 rounded-xl mt-4 outline-blue-200'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='w-full flex justify-end mt-9 gap-6'>
                            <span
                                className='h-12 w-40 bg-slate-200 rounded-xl text-slate-900 hover:bg-slate-300 flex justify-center items-center cursor-pointer'
                                onClick={() => clear()}
                            >
                                Cancel
                            </span>
                            <button type='submit' className='h-12 w-40 bg-blue-800 rounded-xl text-slate-50 hover:bg-blue-700'>
                                {
                                    btnLoading
                                        ?
                                        'Updating Note'
                                        :
                                        'Update Note'
                                }
                            </button>
                        </div>
                    </form>
                    :
                    <form className='mt-6' onSubmit={subnitForm}>
                        <div className='flex flex-col'>
                            <label className='font-semibold'>
                                Enter title
                            </label>
                            <input
                                type='text'
                                value={typeCheck === 'view' ? '' : title}
                                placeholder='Eg: A dream I once had'
                                className='w-full h-12 p-3 bg-slate-100 rounded-xl mt-4 outline-blue-200'
                                onChange={(e) => typeCheck === 'view' ? setTitle('') : setTitle(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col mt-6'>
                            <label className='font-semibold'>
                                Enter description
                            </label>
                            <textarea
                                placeholder='Description goes here...'
                                value={typeCheck === 'view' ? '' : description}
                                className='w-full h-[12rem] p-3 bg-slate-100 rounded-xl mt-4 outline-blue-200'
                                onChange={(e) => typeCheck === 'view' ? setDescription('') : setDescription(e.target.value)}
                            />
                        </div>
                        <div className='w-full flex justify-end mt-9'>
                            <button type='submit' className='h-12 w-40 bg-blue-800 rounded-xl text-slate-50 hover:bg-blue-700'>
                                {
                                    btnLoading
                                        ?
                                        <span>Saving Note</span>
                                        :
                                        <span>Save Note</span>
                                }
                            </button>
                        </div>
                    </form>
            }
        </div>
    )
}

export default Form