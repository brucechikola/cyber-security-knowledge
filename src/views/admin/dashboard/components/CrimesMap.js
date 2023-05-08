import React from 'react'
import Crime from './Crime'
import { useSelector } from 'react-redux'
import { Unique } from 'functions/common'
export default function CrimesMap(props) {
    const { filterDate, crime_types } = useSelector(state => state.data)
    return (
        <div className="w-full h-full bg-white rounded-md shadow-default p-2 flex items-center justify-start flex-col">
            <span className='text-gray-500 font-bold text-sm w-[90%]'>Crime Total Summed as at {`${filterDate}`.split('GMT')[0]}</span>
            {
                crime_types?.length > 0 && crime_types.map(ct => (
                    <Crime key={Unique()} title={ct.type} total={ct?.criminal_activities?.length || 0} icon={ct.icon} />
                ))
            }
        </div>
    )
}
