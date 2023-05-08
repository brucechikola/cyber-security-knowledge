import React from 'react'
import AreaChart from 'components/Charts/AreaChart/AreaChart'

export default function RecentCriminalCases(props) {

    return (
        <div className='w-full h-full bg-white shadow-default rounded-md p-2'>
            <span className='text-gray-500 font-bold text-sm ml-4'>Recent Criminal Cases Summary</span>
            <AreaChart data={null} />
        </div>
    )
}
