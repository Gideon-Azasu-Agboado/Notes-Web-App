import React, { useCallback, useEffect } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { X } from 'lucide-react'

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

const ViewDetails = ({ show, setShow, title, setTitle, setDescription, description, createdAt, updatedAt, updateState, setTypeCheck }: Props) => {
    const formatRelativeTime = (timestamp: string) => (
        formatDistanceToNow(parseISO(timestamp), { addSuffix: true })
    )

    const close = useCallback(() => {
        setShow(false)
        setTypeCheck('neither')
        setTitle('')
        setDescription('')
    }, [setShow, setTypeCheck, setTitle, setDescription])

    useEffect(() => {
        if (!show) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [show, close])

    if (!show) return null

    return (
        <div
            className='motion-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm'
            onClick={(event) => {
                if (event.target === event.currentTarget) close()
            }}
        >
            <section
                role='dialog'
                aria-modal='true'
                aria-labelledby='note-dialog-title'
                className='motion-dialog-panel max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-9'
            >
                <div className='flex items-start justify-between gap-6'>
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-violet-500'>Saved thought</p>
                        <h2 id='note-dialog-title' className='mt-3 break-words text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl'>
                            {title}
                        </h2>
                    </div>
                    <button
                        type='button'
                        aria-label='Close note'
                        className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition duration-200 hover:rotate-90 hover:bg-slate-200 hover:text-slate-900 active:scale-90'
                        onClick={close}
                    >
                        <X size={19} />
                    </button>
                </div>
                <p className='mt-4 text-xs text-slate-400'>
                    {updateState ? 'Updated' : 'Saved'} {formatRelativeTime(updateState ? updatedAt : createdAt)}
                </p>
                <div className='my-6 h-px bg-slate-100' />
                <p className='whitespace-pre-wrap break-words text-[15px] leading-7 text-slate-600'>
                    {description}
                </p>
            </section>
        </div>
    )
}

export default ViewDetails
