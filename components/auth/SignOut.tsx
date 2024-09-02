type SignoutServerActionProps = {
    SignoutServerAction: (formData: FormData) => void;
}

export default function SignOut({ SignoutServerAction }: SignoutServerActionProps) {
    return (
        <form
            action={SignoutServerAction}
        >
            <button type="submit" className='bg-blue-500 py-1 px-4 text-xs rounded-lg text-white mt-2'>
                Logout
            </button>
        </form>
    )
}