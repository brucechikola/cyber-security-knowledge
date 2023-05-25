import React, { useEffect, useState } from 'react'
import { GiGasMask } from 'react-icons/gi'
import { MdLocationPin } from 'react-icons/md'
import { BsCalendar2Date, BsClockFill } from 'react-icons/bs'
import { SetHeaders } from 'api/config'
import { useDispatch } from 'react-redux'
import { GetCriminalActivities } from 'functions/common'
import PaginatedTable from 'components/Tables/PaginatedTable'

export default function RecentCriminalCases(props) {
    const headers = SetHeaders('', false)
    const [activities, setActivities] = useState([])
    useEffect(() => {
        GetCriminalActivities(headers).then(resolve => {
            if (resolve.length > 0) {
                let nd = []
                resolve?.reverse()?.map((ca, i) => {
                    if (nd.length < 5)
                        nd.push({
                            type: <Type title={ca.type} />,
                            location: <Location title={ca.location} />,
                            date: <div className='flex items-center justify-start'><BsCalendar2Date className='text-indigo-800 text-[14px] mr-2' />{ca.date}</div>,
                            time: <div className='flex items-center justify-start'><BsClockFill className='text-indigo-800 text-[14px] mr-2' />{ca.time}</div>,
                        })
                })
                setActivities(nd)
            }
        })
    }, [])

    const Location = ({ title }) => {
        return <div className="flex items-center justify-start">
            <MdLocationPin className="text-indigo-900 text-[18px] mr-2" />
            {title}
        </div>
    }

    const Type = ({ title }) => {
        return <div className="flex items-center justify-start">
            <GiGasMask className="text-red-700 text-[18px] mr-2" />
            {title}
        </div>
    }

    const cols = [
        {
            Header: 'Crime Type',
            accessor: 'type'
        },
        {
            Header: 'Location',
            accessor: 'location'
        },
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Time',
            accessor: 'time'
        },
    ]
    console.log(activities)
    return (
        <div className='w-full h-full bg-white shadow-default rounded-md p-2'>
            <span className='text-gray-500 font-bold text-sm ml-4'>Recent Criminal Cases Summary</span>
            <PaginatedTable columns={cols} data={activities} pageSize={8} />
        </div>
    )
}
