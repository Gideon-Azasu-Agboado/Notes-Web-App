'use client'
import React, { useState } from 'react'
import Body from './Body'
import UserNameForm from './UserNameForm'

type Props = {
    userEmail: string | null | undefined
}

const Hero = ({ userEmail }: Props) => {
    const [check, setCheck] = useState(true)

    return (
        <div className='mt-4'>
            <h1 className='text-4xl font-semibold text-center mt-20'>Notes Web App</h1>
            <p className='text-center pt-3'>Save notes that you would like to keep with you forever</p>
            {/* <p className='pt-5'>{userEmail}</p> */}
            {
                check
                    ?
                    <Body />
                    :
                    <UserNameForm />
            }
        </div>
    )
}

export default Hero