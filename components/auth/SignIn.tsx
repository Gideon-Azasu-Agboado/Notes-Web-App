import { signIn } from "@/lib/auth"
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
    return (
        <div className="flex justify-center mt-[2rem]">
            <form
                action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: '/redirecting' })
                }}
            >
                <button type="submit" className="h-12 w-[18rem] rounded-xl bg-slate-100 shadow-lg flex flex-row justify-center items-center">
                    <span className="pr-4 text-blue-500">
                        <FaGoogle />
                    </span>
                    Signin with Google
                </button>
            </form>
        </div>
    )
} 