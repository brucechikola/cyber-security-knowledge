import React from 'react'
import { GiCrimeSceneTape, GiChalkOutlineMurder, GiRun, GiPumpkinMask, GiPistolGun, GiDrippingKnife } from 'react-icons/gi'
export default function Crime({ title, total, icon }) {
    const icons = {
        GiCrimeSceneTape: <GiCrimeSceneTape size={25} color='white' />,
        GiChalkOutlineMurder: <GiChalkOutlineMurder size={25} color='white' />,
        GiRun: <GiRun size={25} color='white' />,
        GiPumpkinMask: <GiPumpkinMask size={25} color='white' />,
        GiPistolGun: <GiPistolGun size={25} color='white' />,
        GiDrippingKnife: <GiDrippingKnife size={25} color='white' />
    }
    return (
        <div className='w-[90%] flex items-center justify-between my-3'>
            <div className='flex items-center justify-center'>
                <div className='w-[30px] h-[30px] flex items-center justify-center bg-defaultcolor rounded-md mr-3'>
                    {icons[icon]}
                </div>
                <span className='text-[14px]'>{title}</span>
            </div>
            {total}
        </div>
    )
}
