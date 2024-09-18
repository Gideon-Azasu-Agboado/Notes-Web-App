import React, { useEffect, useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { IoPencilSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

interface PassedNotesProps {
    notes: any[]
    setNotes: React.Dispatch<React.SetStateAction<any[]>>
    deleteNote: (note_id: string) => Promise<void>;
    getNoteDetails: (note_id: string, type: string) => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

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

const NotesCard = ({ notes, deleteNote, getNoteDetails, setShow }: PassedNotesProps) => {
    // const [notes, setNotes] = useState([])

    // useEffect(() => {
    //     fetchNotes()
    // }, [userEmail])

    // const fetchNotes = async () => {
    //     const response = await fetch(`http://localhost:3000/api/note?email=${userEmail}`)
    //     const notesData = await response.json()
    //     setNotes(notesData)
    //     console.log('USERDATE >>>>>>>> ', notesData)
    // }

    const ViewDetails = (note_id: string, type: string) => {
        getNoteDetails(note_id, type)
        setShow(true)
    }

    const formatRelativeTime = (timestamp: string) => {
        const date = parseISO(timestamp);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div>
            {
                notes.map((note: NotesProps) => (
                    <div key={note._id} className='p-9 shadow-lg rounded-xl mb-6 hover:shadow-xl'>
                        <div className='flex justify-end'>
                            <div className='flex flex-row gap-5'>
                                <div className='group relative'>
                                    <h1 className='cursor-pointer'>
                                        <FaEye onClick={() => ViewDetails(note._id, 'view')} />
                                    </h1>
                                    <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 right-1 hidden group-hover:block transition duration-700'>
                                        <p className='text-blue-700 text-[14px]'>View</p>
                                    </div>
                                </div>
                                <div className='group relative'>
                                    <h1 className='cursor-pointer'>
                                        <IoPencilSharp
                                            onClick={() => getNoteDetails(note._id, 'update')}
                                        />
                                    </h1>
                                    <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 -right-5 hidden group-hover:block transition duration-700'>
                                        <p className='text-blue-700 text-[14px]'>Edit</p>
                                    </div>
                                </div>
                                <div className='group relative'>
                                    <h1 className='cursor-pointer'>
                                        <RiDeleteBin6Fill
                                            onClick={() => deleteNote(note._id)}
                                        />
                                    </h1>
                                    <div className='px-5 py-1 shadow-xl rounded-md absolute -top-12 hidden group-hover:block transition duration-700'>
                                        <p className='text-blue-700 text-[14px]'>Delete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className='font-medium text-xl mt-3'>{note.title}</h1>
                        <p className='pt-2 line-clamp-3'>
                            {note.description}
                        </p>
                        <div className='flex justify-end mt-4'>
                            {
                                note.updateState
                                    ?
                                    <p className='text-xs text-gray-500'>Updated {formatRelativeTime(note.updatedAt)}</p>
                                    :
                                    <p className='text-xs text-gray-500'>Created {formatRelativeTime(note.createdAt)}</p>
                            }
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default NotesCard