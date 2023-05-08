import { SetHeaders } from 'api/config'
import PaginatedTable from 'components/Tables/PaginatedTable'
import { GetCriminalActivities } from 'functions/common'
import React, { useEffect } from 'react'
import { BsCalendar2Date, BsClockFill } from 'react-icons/bs'
import { GiGasMask } from 'react-icons/gi'
import { MdLocationPin } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setCriminalActivities } from 'store/data/dataSlice'
export default function CriminalActivities() {
    const headers = SetHeaders('', false)
    const dispatch = useDispatch()
    const { criminal_activities } = useSelector(state => state.data)
    useEffect(() => {
        GetCriminalActivities(headers).then(resolve => {
            if (resolve.length > 0) {
                const nd = resolve.map(ca => {
                    return {
                        type: <Type title={ca.type} />,
                        location: <Location title={ca.description} />,
                        desc: <div className='flex items-center justify-start'><AiFillEdit className='text-indigo-800 text-[14px] mr-2' />{ca.description}</div>,
                        date: <div className='flex items-center justify-start'><BsCalendar2Date className='text-indigo-800 text-[14px] mr-2' />{ca.date}</div>,
                        time: <div className='flex items-center justify-start'><BsClockFill className='text-indigo-800 text-[14px] mr-2' />{ca.time}</div>,
                        delete: <Delete data={ca} />
                    }
                })
                dispatch(setCriminalActivities(nd))
            }
        })
    }, [])
    const Delete = ({ data }) => {
        return (
            <button className="border-indigo-400 rounded-md flex items-center justify-center text-red-500">
                <RiDeleteBin6Line color='red' className='mr-1' size={14} />
                Delete
            </button>
        )
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
            Header: 'Description',
            accessor: 'desc'
        },
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Time',
            accessor: 'time'
        },
        {
            Header: 'Delete',
            accessor: 'delete'
        },
    ]

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

    return (
        <div className='w-[90%] items-center justify-ceter'>
            <PaginatedTable columns={cols} data={criminal_activities} pageSize={5} />
        </div>
    )
}
