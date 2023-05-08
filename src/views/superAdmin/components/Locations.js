import { SetHeaders } from 'api/config'
import PaginatedTable from 'components/Tables/PaginatedTable'
import { GetLocations } from 'functions/common'
import React, { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdLocationPin } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { setLocations } from 'store/data/dataSlice'

export default function Locations() {
    const headers = SetHeaders('', false)
    const dispatch = useDispatch()
    const { locations } = useSelector(state => state.data)
    useEffect(() => {
        GetLocations(headers).then(resolve => {
            if (resolve.length > 0) {
                const nd = resolve.map(l => {
                    return {
                        location: <Location title={l.location} />,
                        province: l.province,
                        edit: <CreateActions data={l} type="edit" />,
                        delete: <CreateActions data={l} type="delete" />
                    }
                })
                dispatch(setLocations(nd))
            }
        })
    }, [])
    const CreateActions = ({ data, type }) => {
        return type === 'edit' ?
            <button className="border-indigo-400 rounded-md flex items-center justify-center">
                <FiEdit className='text-indigo-900 mr-1' size={14} />
                Edit
            </button>
            :
            <button className="border-indigo-400 rounded-md flex items-center justify-center">
                <RiDeleteBin6Line color='red' className='mr-1' size={14} />
                Delete
            </button>
    }
    const Location = ({ title }) => {
        return <div className="flex items-center justify-start">
            <MdLocationPin className="text-indigo-900 text-[18px] mr-2" />
            {title}
        </div>
    }
    const cols = [
        {
            Header: 'Location',
            accessor: 'location'
        },
        {
            Header: 'Province',
            accessor: 'province'
        },
        {
            Header: 'Edit',
            accessor: 'edit'
        },
        {
            Header: 'Delete',
            accessor: 'delete'
        },
    ]


    return (
        <div className='w-[90%] items-center justify-ceter'>
            <PaginatedTable columns={cols} data={locations} pageSize={3} />
        </div>
    )
}
