import SignIn from "@/components/auth/SignIn"
import Image from "next/image"

const Page = () => {
    return (
        <div className="">
            <div className="flex justify-center mt-[10rem]">
                <div>
                    <h1 className="text-center text-5xl font-semibold text-slate-600 mb-[2rem]">Hello there, welcome to the <span className="text-blue-600">Notes Web App</span></h1>
                    <div className="flex justify-center">
                        <p className="mb-[4rem] text-center w-[50%] text-lg">
                            We're thrilled to have you here. Whether you're organizing your daily
                            tasks, brainstorming your next big idea, or jotting down important
                            reminders, Notes Web App is designed to make your note-taking experience
                            smooth and effortless.
                        </p>
                    </div>
                    <p className="mb-[2rem] text-center text-blue-700">Sign in using your google account</p>
                    <div className="flex justify-center">
                        <div className="flex flex-row gap-5 items-end">
                            <div className="h-[15rem] w-[30%] relative">
                                <Image
                                    src={'/notes2.jpg'}
                                    alt="notes-pic"
                                    height={1200}
                                    width={1200}
                                    className="object-cover h-full w-full rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-slate-700/10 rounded-2xl" />
                            </div>
                            <div className="h-[25rem] w-[40%] relative">
                                <Image
                                    src={'/notes1.jfif'}
                                    alt="notes-pic"
                                    height={1200}
                                    width={1200}
                                    className="object-cover h-full w-full rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-500 rounded-2xl">
                                    <SignIn />
                                </div>
                            </div>
                            <div className="h-[15rem] w-[30%] relative">
                                <Image
                                    src={'/notes3.jpg'}
                                    alt="notes-pic"
                                    height={1200}
                                    width={1200}
                                    className="object-cover h-full w-full rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-slate-700/10 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page