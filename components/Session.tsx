
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDb from '@/lib/dbConnect';
import User from '@/models/user';

const Session = async () => {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/login');
    }

    const email = session.user.email;

    await connectDb();

    const user = await User.findOne({ email }).lean();

    if (user) {
        redirect(`/home/${user.username}`);
    }

    redirect(`/create-user/${encodeURIComponent(email)}`);
};

export default Session;
