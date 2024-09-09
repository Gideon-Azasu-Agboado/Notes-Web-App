import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';

const Session = async () => {
    const session = await auth();
    if (!session || !session.user?.email) {
        redirect('/login');
        return null;
    }

    const email = session.user.email;

    const response = await fetch(`http://localhost:3000/api/user?email=${encodeURIComponent(email)}`);
    const data = await response.json();

    if (response.ok) {
        console.log('SUCCESSFUL >>>>>>> ', data);
        if (data.message === 'success') {
            redirect(`/home/${data.user.username}`)
        } else if (data.message === 'create') {
            redirect(`/create-user/${email}`)
        }
    }

    return (
        <div className='container mt-24 flex justify-center'>
            <div>
                <h1 className='text-center'>Redirecting....</h1>
            </div>
        </div>
    )
}

export default Session