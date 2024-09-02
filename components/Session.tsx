import Hero from './Hero'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';

const Session = async () => {
    const session = await auth();
    if (!session) {
        redirect('/login')
    }

    return (
        <>
            <Hero userEmail={session?.user?.email} />
        </>
    )
}

export default Session