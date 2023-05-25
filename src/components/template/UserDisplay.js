import { GetUser } from 'api/config'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs'

export default function UserDisplay(props) {
    const user = GetUser()

    return (
        <div className='ml-2 nav-email flex items-start justify-center relative cursor-pointer'>
            <small className=" font-bold text-white mr-2">{user.email}</small>
            <BsChevronDown size={14} className='mt-1' />
        </div>
    )
}
