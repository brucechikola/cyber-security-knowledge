import React from 'react'
import { GiCrimeSceneTape, GiChalkOutlineMurder, GiRun, GiPumpkinMask, GiPistolGun, GiDrippingKnife } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedType } from 'store/data/dataSlice'
export default function Crime({ title, total, icon }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const icons = {
        GiCrimeSceneTape: <GiCrimeSceneTape size={25} color='white' />,
        GiChalkOutlineMurder: <GiChalkOutlineMurder size={25} color='white' />,
        GiRun: <GiRun size={25} color='white' />,
        GiPumpkinMask: <GiPumpkinMask size={25} color='white' />,
        GiPistolGun: <GiPistolGun size={25} color='white' />,
        GiDrippingKnife: <GiDrippingKnife size={25} color='white' />
    }
    const filter = () => {
        dispatch(setSelectedType(title))
        navigate('/crime-details')
    }
    return (
        <div className='w-[90%] flex items-center justify-between min-h-[60px] hover:bg-slate-100 cursor-pointer' onClick={filter}>
            <div className='flex items-center justify-center'>
                <div className='w-[30px] h-[30px] flex items-center justify-center bg-defaultcolor rounded-md mr-3'>
                    {icons[icon]}
                </div>
                <span className='text-[14px]'>{title}</span>
            </div>
            <span className=' bg-indigo-900 rounded-full w-[30px] h-[30px] flex items-center justify-center text-white font-bold'>{total}</span>
        </div>
    )
}
