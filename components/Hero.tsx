'use client'
import React, { useEffect, useState } from 'react'
import Body from './Body'
import { toast } from 'sonner'

const Hero = () => {
    const [check, setCheck] = useState(false)

    useEffect(() => {
        toast('Successfully logged in!');
    }, [])

    return (
        <div className='mt-4'>
            <h1 className='text-4xl font-semibold text-center mt-20'>Notes Web App</h1>
            <p className='text-center pt-3'>Save notes that you would like to keep with you forever</p>
            <Body />

        </div>
    )
}

export default Hero