import SignOut from './auth/SignOut';
import SignOutActions from '@/actions/SignOutActions';
import { Search, X } from 'lucide-react'

interface Props {
    username: string | undefined,
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
}

const Header = ({ username, query, setQuery }: Props) => {
    const initials = username?.trim().split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase() ?? ''

    return (
        <div className='motion-rise mx-auto mt-12 flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex min-w-0 items-center gap-4'>
                <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-slate-900 text-lg font-semibold text-white shadow-lg shadow-slate-900/10'>
                    {initials}
                </div>
                <div className='min-w-0'>
                    <p className='text-sm text-slate-500'>Welcome back</p>
                    <h2 className='truncate text-lg font-semibold tracking-tight text-slate-900 sm:text-xl'>{username}</h2>
                    <p className='mt-0.5 text-sm text-slate-500'>What would you like to write today?</p>
                </div>
                <div className='ml-auto sm:ml-0'>
                    <SignOut SignoutServerAction={SignOutActions} />
                </div>
            </div>
            <label className='flex h-12 w-full items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-slate-400 shadow-sm transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100 sm:max-w-xs'>
                <Search size={18} aria-hidden='true' />
                <input
                    type='text'
                    aria-label='Search notes'
                    placeholder='Search your notes'
                    value={query}
                    className='min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400'
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') setQuery('')
                    }}
                />
                {query && (
                    <button
                        type='button'
                        aria-label='Clear search'
                        className='flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-90'
                        onClick={() => setQuery('')}
                    >
                        <X size={15} />
                    </button>
                )}
            </label>
        </div>)
}

export default Header