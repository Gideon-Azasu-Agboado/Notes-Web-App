import React, { Suspense } from 'react'
import Form from './Form'
import NotesCard from './NotesCard'
import Header from './Header'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import ViewDetails from './ViewDetails'

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
        <div>
            <Header
                username={user?.username}
                query={query}
                setQuery={setQuery}
            />
            <div className='flex flex-row mt-12'>
                <div className='w-[40%]'>
                    <Form
                        title={title}
                        setTitle={setTitle}
                        btnLoading={btnLoading}
                        setBtnLoading={setBtnLoading}
                        subnitForm={subnitForm}
                        description={description}
                        setDescription={setDescription}
                        update={update}
                        setUpdate={setUpdate}
                        updateForm={updateForm}
                        typeCheck={typeCheck}
                    />
                </div>
                <div className='w-[50%] ml-20 pl-20 border-l border-l-slate-200'>
                    <div className='overflow-y-scroll h-[33rem] custom-scrollbar py-4 px-7 overflow-x-hidden'>
                        {
                            query !== ''
                                ?
                                <div>
                                    <NotesCard
                                        notes={searchResults}
                                        setNotes={setNotes}
                                        deleteNote={deleteNote}
                                        getNoteDetails={getNoteDetails}
                                        setShow={setShow}
                                    />
                                </div>
                                :
                                <div>
                                    {
                                        notesLoading
                                            ?
                                            <div>
                                                <Skeleton className='h-[12rem] w-full rounded-xl mb-6' />
                                                <Skeleton className='h-[12rem] w-full rounded-xl mb-6' />
                                            </div>
                                            :
                                            <NotesCard
                                                notes={notes}
                                                setNotes={setNotes}
                                                deleteNote={deleteNote}
                                                getNoteDetails={getNoteDetails}
                                                setShow={setShow}
                                            />
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
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