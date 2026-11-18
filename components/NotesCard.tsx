import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { Eye, Pencil, Trash2 } from 'lucide-react'

interface NotesProps {
    _id: string
    title: string,
    description: string,
    email?: string,
    __v?: number,
    createdAt: string,
    updatedAt: string,
    updateState: boolean
}

interface PassedNotesProps {
    notes: NotesProps[]
    deleteNote: (note_id: string) => Promise<void>;
    getNoteDetails: (note_id: string, type: string) => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

const NotesCard = ({ notes, deleteNote, getNoteDetails, setShow }: PassedNotesProps) => {
    const showDetails = (note_id: string) => {
        getNoteDetails(note_id, 'view')
        setShow(true)
    }

    const formatRelativeTime = (timestamp: string) => (
        formatDistanceToNow(parseISO(timestamp), { addSuffix: true })
    )

    return (
        <div className='space-y-4'>
            {notes.map((note, index) => (
                <article
                    key={note._id}
                    className='motion-rise rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.28)] transition duration-200 hover:-translate-y-0.5 hover:border-violet-100 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.24)] sm:p-6'
                    style={{ animationDelay: `${Math.min(index * 55, 330)}ms` }}
                >
                    <div className='flex items-start justify-between gap-4'>
                        <div className='min-w-0'>
                            <h3 className='break-words text-lg font-semibold tracking-tight text-slate-900'>{note.title}</h3>
                            <p className='mt-2 line-clamp-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-500'>
                                {note.description}
                            </p>
                        </div>
                        <div className='flex shrink-0 items-center gap-1'>
                            <button
                                type='button'
                                aria-label={`View ${note.title}`}
                                title='View note'
                                className='flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition duration-150 hover:scale-110 hover:bg-violet-50 hover:text-violet-700 active:scale-95'
                                onClick={() => showDetails(note._id)}
                            >
                                <Eye size={17} />
                            </button>
                            <button
                                type='button'
                                aria-label={`Edit ${note.title}`}
                                title='Edit note'
                                className='flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition duration-150 hover:scale-110 hover:bg-violet-50 hover:text-violet-700 active:scale-95'
                                onClick={() => getNoteDetails(note._id, 'update')}
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                type='button'
                                aria-label={`Delete ${note.title}`}
                                title='Delete note'
                                className='flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition duration-150 hover:scale-110 hover:bg-rose-50 hover:text-rose-600 active:scale-95'
                                onClick={() => deleteNote(note._id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className='mt-5 flex items-center justify-between border-t border-slate-100 pt-4'>
                        <span className='rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-400'>
                            {note.updateState ? 'Updated' : 'Saved'}
                        </span>
                        <p className='text-xs text-slate-400'>
                            {formatRelativeTime(note.updateState ? note.updatedAt : note.createdAt)}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default NotesCard
