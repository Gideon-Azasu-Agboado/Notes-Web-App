'use client'

import React from 'react'

interface FormProps {
    title: string,
    description: string,
    btnLoading: boolean,
    update: boolean,
    typeCheck: string
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    subnitForm: (e: React.FormEvent<HTMLFormElement>) => void,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    updateForm: (e: React.FormEvent<HTMLFormElement>) => void,
}

const Form = ({ title, setTitle, description, setDescription, btnLoading, subnitForm, update, setUpdate, updateForm, typeCheck }: FormProps) => {
    const clear = () => {
        setTitle('')
        setDescription('')
        setUpdate(false)
    }

    const isViewing = typeCheck === 'view'

    return (
        <form className='space-y-5' onSubmit={update ? updateForm : subnitForm}>
            <div>
                <label htmlFor='note-title' className='mb-2 block text-sm font-medium text-slate-700'>Title</label>
                <input
                    id='note-title'
                    type='text'
                    value={isViewing ? '' : title}
                    placeholder='A thought worth keeping'
                    className='h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100'
                    onChange={(e) => isViewing ? setTitle('') : setTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor='note-description' className='mb-2 block text-sm font-medium text-slate-700'>Your note</label>
                <textarea
                    id='note-description'
                    placeholder='Start writing here...'
                    value={isViewing ? '' : description}
                    className='min-h-48 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100'
                    onChange={(e) => isViewing ? setDescription('') : setDescription(e.target.value)}
                />
            </div>

            <div className='flex flex-wrap justify-end gap-3 pt-1'>
                {update && (
                    <button
                        type='button'
                        className='h-11 rounded-2xl px-5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
                        onClick={clear}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type='submit'
                    disabled={btnLoading}
                    className='inline-flex h-11 min-w-36 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-xl shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60'
                >
                    {btnLoading ? (update ? 'Updating…' : 'Saving…') : (update ? 'Update note' : 'Save note')}
                </button>
            </div>
        </form>
    )
}

export default Form
