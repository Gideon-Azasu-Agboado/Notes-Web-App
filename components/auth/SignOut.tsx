type SignoutServerActionProps = {
    SignoutServerAction: (formData: FormData) => void;
}
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'

export default function SignOut({ SignoutServerAction }: SignoutServerActionProps) {
    return (
        <form
            action={SignoutServerAction}
        >
            <button
                type="submit"
                className='mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
                onClick={() => {
                    toast('Successfully logged out!');
                }}
            >
                <LogOut size={13} aria-hidden='true' />
                Sign out
            </button>
        </form>
    )
}