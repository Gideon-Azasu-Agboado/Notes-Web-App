type SignoutServerActionProps = {
    SignoutServerAction: (formData: FormData) => void;
}
import { toast } from 'sonner'

export default function SignOut({ SignoutServerAction }: SignoutServerActionProps) {
    return (
        <form
            action={SignoutServerAction}
        >
            <button
                type="submit"
                className='bg-blue-500 py-1 px-4 text-xs rounded-lg text-white mt-2'
                onClick={() => {
                    toast('Successfully logged out!');
                }}
            >
                Logout
            </button>
        </form>
    )
}