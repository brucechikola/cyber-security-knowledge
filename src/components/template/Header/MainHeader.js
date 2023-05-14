import React, { useState } from 'react'
import Avata from '../Avata'
import Logo from '../Logo/Logo'
import UserDisplay from '../UserDisplay'
import { GetUser } from 'api/config'
import { RiUserLine } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
import { MdEmail } from 'react-icons/md'
import { signOut } from 'store/auth/sessionSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function MainHeader() {
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState(false)
    const user = GetUser()
    const navigate = useNavigate()
    const goHome = () => {
        (user.is_super_admin) ? navigate('/sadbd') : navigate('/dbd')

    }
    const DropDown = () => {
        return (
            <div className="w-[280px] min-h-[max-content] text-slate-700 bg-white rounded-md shadow-darker z-[20] top-[80px] right-[0] text-[14px] p-5 absolute right-0 top-0">
                <span className="flex items-center justify-start mb-3 cursor-pointer transition transition-[2s]">
                    <RiUserLine className='mr-3' /> {user.username}
                </span>
                <span className="flex items-center justify-start mb-3 cursor-pointer transition transition-[2s]">
                    <RiUserLine className='mr-3' /> {user.first_name} {user.last_name}
                </span>
                <span className="flex items-center justify-start mb-3 cursor-pointer transition transition-[2s]">
                    <MdEmail className='mr-3' /> {user.email}
                </span>
                <span onClick={() => dispatch(signOut())} className="flex items-center justify-start mb-3 cursor-pointer transition transition-[2s]">
                    <FiLogOut className='mr-3' />Logout
                </span>
            </div>
        )
    }
    return (
        <>
            <div className='header w-full bg-whites h-[70px] text-white flex items-center justify-center shadows-mds z-10 '>
                <div className='absolute w-full h-[350px] bg-defaultcolor top-0 left-0 z-[-1] rounded-bl-[50px] rounded-br-[50px]'></div>
                <div className='w-4/5 h-full flex items-center justify-between'>
                    <div className='flex items-center justify-between cursor-pointer' onClick={goHome}>
                        <div className='flex items-center justify-center p-3 bg-white mr-3 rounded-b-[20px]'>
                            <Logo style={{ width: 90 }} />
                        </div>
                        <h2 className='text-white font-bold'>Crime Hotspot Knowledge Base System</h2>
                    </div>
                    <div className='flex items-center justify-center relative transition relative'>

                        <div onClick={() => setDropdown(!dropdown)} className='flex h-full items-center justify-center'>
                            <Avata />
                            <UserDisplay />

                        </div>
                        {dropdown && <DropDown />}
                    </div>

                </div>
            </div>

        </>
    )
}
