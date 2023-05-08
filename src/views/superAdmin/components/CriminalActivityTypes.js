import { SetHeaders } from 'api/config'
import PaginatedTable from 'components/Tables/PaginatedTable'
import { GetCrimeTypes } from 'functions/common'
import React, { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { GiGasMask } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { setCrimeTypes } from 'store/data/dataSlice'

export default function CriminalActivityTypes() {
    const headers = SetHeaders('', false)
    const dispatch = useDispatch()
    const { crime_types } = useSelector(state => state.data)
    useEffect(() => {
        GetCrimeTypes(headers).then(resolve => {
            if (resolve.length > 0) {
                const nd = resolve.map(ct => {
                    return {
                        type: <Type title={ct.type} />,
                        desc: ct.description,
                        edit: <CreateActions data={ct} type="edit" />,
                        delete: <CreateActions data={ct} type="delete" />
                    }
                })

                dispatch(setCrimeTypes(nd))
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
            Header: 'Brief Description',
            accessor: 'desc'
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
            <PaginatedTable columns={cols} data={crime_types} pageSize={3} />
        </div>
    )
}
