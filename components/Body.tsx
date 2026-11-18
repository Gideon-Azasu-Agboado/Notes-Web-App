import React from 'react'
import Form from './Form'
import NotesCard from './NotesCard'
import Header from './Header'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import ViewDetails from './ViewDetails'
import { FileText } from 'lucide-react'

interface UserProps {
    _id?: string
    username: string,
    email?: string,
    __v?: number
}

const Body = () => {
    const params = useParams<{ username: string }>()

    // usestates
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)
    const [notesLoading, setNotesLoading] = useState(true)
    const [notesID, setNotesID] = useState()
    const [createdAt, setCreadtedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [updateState, setUpdateState] = useState<boolean | null>(null)
    const [typeCheck, setTypeCheck] = useState('')
    const [delLoading, setDelLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [notes, setNotes] = useState<any[]>([])
    const [user, setUser] = useState<UserProps | null>(null)
    const [show, setShow] = useState(false)
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        fetchUser()

        return () => {
            fetchUser()
        }
    }, [])

    useEffect(() => {
        fetchNotes()
    }, [user?.email])

    useEffect(() => {
        searchNotes()
    }, [query])

    // fetch user function
    const fetchUser = async () => {
        const response = await fetch(`http://localhost:3000/api/home/${params.username}`)
        const userData: UserProps = await response.json()
        setUser(userData)
        // console.log('USERDATE >>>>>>>> ', userData)
    }

    // submit form function
    const subnitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title) {
            toast('Please enter a title')
            return
        }

        if (!description) {
            toast('Please enter a description')
            return
        }

        try {
            setBtnLoading(true)
            const body = {
                title,
                description,
                email: user?.email,
                updateState: false
            }

            const response = await fetch('/api/note/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            const data = await response.json()

            if (response.ok) {
                toast(data.message)
                setTitle('')
                setDescription('')
                fetchNotes()
                setBtnLoading(false)
            }
        } catch (error) {
            toast('Error saving note.');
            setBtnLoading(false)
        }
    }

    // fetch notes function
    const fetchNotes = async () => {
        const response = await fetch(`http://localhost:3000/api/note?email=${user?.email}`)
        const notesData = await response.json()
        setNotes(notesData)
        setNotesLoading(false)
        // console.log('USERDATE >>>>>>>> ', notesData)
    }

    // delete note function
    const deleteNote = async (note_id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/note?note_id=${note_id}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (response.ok) {
                toast(data.message)
                fetchNotes()
            }
        } catch (error: any) {
            toast('Error deleting note.', error);
        }
    }

    //get the updated note details
    const getNoteDetails = (note_id: string, type: string) => {
        const note = notes.find((note: any) => note._id === note_id)
        if (note) {
            setTitle(note.title)
            setDescription(note.description)
            setCreadtedAt(note.createdAt)
            setUpdatedAt(note.updatedAt)
            setUpdateState(note.updateState)
            setTypeCheck(type)
            if (type === 'update') {
                setUpdate(true)
            }
            setNotesID(note._id)
        }

        console.log(note)
    }

    //update form function
    const updateForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setBtnLoading(true)
            const body = {
                title,
                description,
                email: user?.email,
                updateState: true
            }

            const response = await fetch(`/api/note/?note_id=${notesID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            const data = await response.json()

            if (response.ok) {
                toast(data.message)
                setTitle('')
                setDescription('')
                fetchNotes()
                setBtnLoading(false)
                setUpdate(false)
            }
        } catch (error) {
            toast('Error saving note.');
            setBtnLoading(false)
        }
    }

    //search function
    const searchNotes = async () => {
        try {
            const res = await fetch(`/api/note?searchKeyword=${query}`);
            const data = await res.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    return (
        <div className='motion-rise' style={{ animationDelay: '240ms' }}>
            <Header
                username={user?.username}
                query={query}
                setQuery={setQuery}
            />
            <main className='mx-auto mt-8 grid max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]'>
                <section className='motion-rise rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.22)] backdrop-blur transition-shadow duration-300 hover:shadow-[0_24px_70px_-34px_rgba(15,23,42,0.28)] sm:p-8 lg:sticky lg:top-8' style={{ animationDelay: '320ms' }}>
                    <div className='mb-7'>
                        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-violet-500'>Your space</p>
                        <h2 className='mt-2 text-2xl font-semibold tracking-tight text-slate-900'>Capture a thought</h2>
                        <p className='mt-2 text-sm leading-6 text-slate-500'>Give an idea a place to land. You can come back to it anytime.</p>
                    </div>
                    <Form
                        title={title}
                        setTitle={setTitle}
                        btnLoading={btnLoading}
                        subnitForm={subnitForm}
                        description={description}
                        setDescription={setDescription}
                        update={update}
                        setUpdate={setUpdate}
                        updateForm={updateForm}
                        typeCheck={typeCheck}
                    />
                </section>

                <section className='motion-rise min-w-0 rounded-[2rem] border border-white/80 bg-white/65 p-5 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.16)] backdrop-blur transition-shadow duration-300 hover:shadow-[0_24px_70px_-34px_rgba(15,23,42,0.22)] sm:p-8' style={{ animationDelay: '420ms' }}>
                    <div className='mb-7 flex items-end justify-between gap-4'>
                        <div>
                            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-violet-500'>Your collection</p>
                            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-slate-900'>
                                {query ? 'Search results' : 'Your notes'}
                            </h2>
                        </div>
                        <span className='shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500'>
                            {query ? searchResults.length : notes.length} {query ? 'found' : notes.length === 1 ? 'note' : 'notes'}
                        </span>
                    </div>

                    <div className='custom-scrollbar space-y-4 overscroll-contain lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto lg:pr-2'>
                        {notesLoading && query === '' ? (
                            <>
                                <Skeleton className='h-44 w-full rounded-[1.5rem] bg-slate-100' />
                                <Skeleton className='h-44 w-full rounded-[1.5rem] bg-slate-100' />
                            </>
                        ) : (query ? searchResults : notes).length > 0 ? (
                            <NotesCard
                                notes={query ? searchResults : notes}
                                deleteNote={deleteNote}
                                getNoteDetails={getNoteDetails}
                                setShow={setShow}
                            />
                        ) : (
                            <div className='motion-rise flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/70 px-6 text-center'>
                                <div className='motion-float flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm'>
                                    <FileText size={20} aria-hidden='true' />
                                </div>
                                <h3 className='mt-4 font-semibold text-slate-800'>
                                    {query ? 'No matching notes' : 'A fresh page'}
                                </h3>
                                <p className='mt-1 max-w-xs text-sm leading-6 text-slate-500'>
                                    {query ? 'Try another word or phrase.' : 'Your saved thoughts will be waiting here.'}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <ViewDetails
                show={show}
                setShow={setShow}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                createdAt={createdAt}
                updatedAt={updatedAt}
                updateState={updateState}
                setTypeCheck={setTypeCheck}
            />
        </div>

    )
}

export default Body