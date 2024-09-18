'use server'

export default async function NotesFetch({ userEmail }: { userEmail: string | undefined }) {
    await fetch(`http://localhost:3000/api/note?email=${userEmail}`)
    return null;
}