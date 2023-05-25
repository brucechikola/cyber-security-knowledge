import { SetHeaders } from 'api/config'
import PaginatedTable from 'components/Tables/PaginatedTable'
import Container from 'components/shared/Container'
import PageControlsTab from 'components/shared/PageControlsTab'
import Select from 'components/shared/Select'
import Title from 'components/shared/Title'
import { DownloadReport, GetLocations } from 'functions/common'
import { GetCrimeTypes } from 'functions/common'
import { GetCriminalActivities } from 'functions/common'
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BsCalendar2Date, BsClockFill } from 'react-icons/bs'
import { FiDownload } from 'react-icons/fi'
import { GiGasMask } from 'react-icons/gi'
import { MdLocationPin } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedLocation, setSelectedType } from 'store/data/dataSlice'
export default function CrimeDetails() {
    const headers = SetHeaders()
    const dispatch = useDispatch()
    const { selectedLocation, selectedType } = useSelector(state => state.data)
    console.log(selectedLocation, selectedType)
    const [data, setData] = useState([])
    const [ctypes, setCtypes] = useState([])
    const [locs, setLocs] = useState([])
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        GetCrimeTypes(headers).then(resolve => {
            let ct = resolve.map(c => {
                return { label: c.type, value: c.type }
            })
            ct[0] = { label: 'All Crime Types', value: 'All Crime Types' }
            setCtypes(ct)
        })
        GetLocations(headers).then(resolve => {
            let lc = resolve.map(l => {
                return { label: l.location, value: l.location }
            })
            lc[0] = { label: 'All Locations', value: 'All Locations' }
            setLocs(lc)
        })
    }, [])
    useEffect(() => {
        GetCriminalActivities(headers, selectedType, selectedLocation).then(resolve => {
            if (resolve.length > 0) {
                let d = []
                const nd = []
                resolve.map((ca, i) => {
                    let allow = true
                    if (selectedLocation && selectedLocation !== 'All Locations') {
                        if (ca.location !== selectedLocation) {
                            allow = false
                        }
                    }
                    if (selectedType && selectedType !== 'All Crime Types') {
                        if (ca.type !== selectedType) {
                            allow = false
                        }
                    }
                    if (allow) {
                        nd.push({
                            sn: nd.length + 1,
                            type: <Type title={ca.type} />,
                            location: <Location title={ca.location} />,
                            desc: <div className='flex items-center justify-start'><AiFillEdit className='text-indigo-800 text-[14px] mr-2' />{ca.description}</div>,
                            date: <div className='flex items-center justify-start'><BsCalendar2Date className='text-indigo-800 text-[14px] mr-2' />{ca.date}</div>,
                            time: <div className='flex items-center justify-start'><BsClockFill className='text-indigo-800 text-[14px] mr-2' />{ca.time || 'N/A'}</div>,
                        })
                        d.push({
                            sn: d.length + 1,
                            type: ca.type,
                            location: ca.location,
                            description: ca.description,
                            date: ca.date?.toString() || 'N/A',
                            time: ca.time?.toString() || 'N/A',
                        })
                    }
                })
                setData(d)
                setFiltered(nd)
            }

        })
    }, [selectedLocation, selectedType])
    const cols = [
        {
            Header: 'SN',
            accessor: 'sn'
        },
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
    ]
    const cols2 = [
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
        <Container className="wrapper-97 mx-auto">
            <PageControlsTab className="controls-tab">
                <div>
                    <Title title="Criminal Activities In Details" className="text-white" />
                    <span className='text-[13px] text-white'>Get the most updated info about crimes occurred in different areas</span>
                </div>
                <div className='flex items-center filters-wrapper'>
                    <Select
                        className="border rounded-md h-[40px] bg-white"
                        placeholder='Select Crime Type'
                        label="Select Crime Type"
                        labelClassName="text-[13px] mb-2 text-white"
                        wrapperClassName="w-full mb-2 min-w-[200px] mx-3"
                        options={ctypes}
                        onChange={e => dispatch(setSelectedType(e))}
                        id="criminal_activity_type"
                    />
                    <Select
                        className="border rounded-md h-[40px] bg-white"
                        placeholder='Select Location'
                        label="Select Location"
                        labelClassName="text-[13px] mb-2 text-white"
                        wrapperClassName="w-full mb-2 min-w-[200px]"
                        options={locs}
                        onChange={e => dispatch(setSelectedLocation(e))}
                        id="location"
                    />
                </div>
            </PageControlsTab>
            <div className='w-full h-full bg-white min-h-[400px] rounded-md p-3'>
                <div className='w-full head-content flex items-center justify-between'>
                    <span className='text-slate-700 text-[13px]'>Details | Crime Type: <span className='text-red-600'>{selectedType}</span> | Location: <span className='text-red-600'>{selectedLocation}</span></span>
                    <button
                        className='flex items-center justify-center bg-indigo-900 px-4 py-1 rounded-md text-white text-[14px]'
                        onClick={() => DownloadReport(data)}
                    >
                        <FiDownload className='mr-2' />
                        Download Report
                    </button>
                </div>
                <div className='w-full full-1'>
                    <PaginatedTable columns={cols} data={filtered} pageSize={10} />
                </div>
                <div className='w-full full-2'>
                    <PaginatedTable columns={cols2} data={filtered} pageSize={10} />
                </div>
            </div>
        </Container>
    )
}
