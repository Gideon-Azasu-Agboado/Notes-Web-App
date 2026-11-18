'use client'

import React, { useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import Body from './Body'

const Hero = () => {
    useEffect(() => {
        toast('Successfully logged in!')
    }, [])

    return (
        <div className='relative min-h-screen overflow-hidden bg-[#f5f6fa] text-slate-950'>
            <div className='motion-float pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-200/50 blur-3xl' />
            <div className='motion-float pointer-events-none absolute right-0 top-[30rem] h-72 w-72 rounded-full bg-sky-100/70 blur-3xl' style={{ animationDelay: '2.5s' }} />

            <div className='relative mx-auto max-w-[1440px] px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20'>
                <header className='mx-auto max-w-3xl text-center'>
                    <div className='motion-rise mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm shadow-slate-200/60 backdrop-blur'>
                        <Sparkles size={15} className='motion-sparkle text-violet-500' />
                        Your personal space to think
                    </div>
                    <h1 className='motion-rise text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl' style={{ animationDelay: '100ms' }}>
                        Make room for
                        <span className='block text-slate-400'>what matters.</span>
                    </h1>
                    <p className='motion-rise mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg' style={{ animationDelay: '180ms' }}>
                        A calm place to collect your thoughts, save the little things, and find them whenever you need them.
                    </p>
                </header>

                <Body />
            </div>
        </div>
    )
}

export default Hero
