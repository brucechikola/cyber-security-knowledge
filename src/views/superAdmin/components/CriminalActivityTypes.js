import Execute from 'api/axios/Execute'
import { API_CONFIG, SetHeaders } from 'api/config'
import PaginatedTable from 'components/Tables/PaginatedTable'
import { DeleteEntry, GetCrimeTypes } from 'functions/common'
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { GiGasMask } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { setCrimeTypes } from 'store/data/dataSlice'

export default function CriminalActivityTypes() {
    const headers = SetHeaders('', false)
    const dispatch = useDispatch()
    const { crime_types } = useSelector(state => state.data)
    const [refresh, setRefresh] = useState(false)
    const ex = new Execute()
    useEffect(() => {
        GetCrimeTypes(headers).then(resolve => {
            setRefresh(false)
            if (resolve.length > 0) {
                const nd = resolve.map(ct => {
                    return {
                        type: <Type title={ct.type} />,
                        // desc: ct.description,
                        edit: <CreateActions data={ct} type="edit" />,
                        delete: <CreateActions data={ct} type="delete" />
                    }
                })

                dispatch(setCrimeTypes(nd))
            }
        })
    }, [refresh])
    const CreateActions = ({ data, type }) => {
        const [d, setD] = useState(false)
        return type === 'edit' ?
            <button className="border-indigo-400 rounded-md flex items-center justify-center">
                <FiEdit className='text-indigo-900 mr-1' size={14} />
                Edit
            </button>
            :
            <button
                onClick={() => {
                    setD(true)
                    DeleteEntry(headers, data.id, API_CONFIG.endpoint_extensions.criminal_activity_types_delete).then(setRefresh(true))
                }}
                className="border-indigo-400 rounded-md flex items-center justify-center">
                {
                    !d && <>
                        <RiDeleteBin6Line color='red' className='mr-1' size={14} />
                        Delete
                    </>
                }
                {
                    d && <>
                        <ClipLoader
                            color='#f00000'
                            className='mr-1'
                            loading={d}
                            size={16}
                        />
                        Deleting..
                    </>
                }
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
        // {
        //     Header: 'Brief Description',
        //     accessor: 'desc'
        // },
        // {
        //     Header: 'Edit',
        //     accessor: 'edit'
        // },
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
