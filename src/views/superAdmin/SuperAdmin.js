import Container from 'components/shared/Container'
import DateField from 'components/shared/DateField'
import PageControlsTab from 'components/shared/PageControlsTab'
import Select from 'components/shared/Select'
import Title from 'components/shared/Title'
import React, { useEffect, useState } from 'react'
import { MdArrowRightAlt, MdOutlineAddCircleOutline } from 'react-icons/md'
import Locations from './components/Locations'
import CriminalActivityTypes from './components/CriminalActivityTypes'
import CriminalActivities from './components/CriminalActivities'
import NewLocation from './components/NewLocation'
import NewCriminalActivityType from './components/NewCriminalActivityType'
import { useSelector } from 'react-redux'
import NewCriminalActivity from './components/NewCriminalActivity'
import { FaRegTimesCircle } from 'react-icons/fa'
import { GetLocations } from 'functions/common'
import { SetHeaders } from 'api/config'
import { useNavigate } from 'react-router-dom'

export default function SuperAdmin() {
    const headers = SetHeaders()
    const { locations } = useSelector(state => state.data)
    const [locState, setLocState] = useState(false)
    const [activityTypeState, setActivityTypeState] = useState(false)
    const [activityListState, setActivityListState] = useState(false)
    const [locOptions, setLocOptions] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        GetLocations(headers).then(locs => {
            const nl = locs?.map(l => {
                return {
                    label: l.location,
                    value: l.location
                }
            })
            setLocOptions(nl)
        })
    }, [])
    return (
        <Container className='flex items-center justify-start flex-col mt-2'>
            <PageControlsTab>
                <div>
                    <Title title="Crime Hotspot Super Admin" className="text-white" />
                    <span className='text-[13px] text-white'>Update the info from here</span>
                </div>
                <button
                    className="flex items-center justify-center px-3 py-2 rounded-md bg-white text-[13px] w-[200px]"
                    onClick={() => navigate('/crime-details')}
                >View Full Details <MdArrowRightAlt className="ml-2 text-[20px]" />
                </button>
            </PageControlsTab>
            <div className='w-full  mt-4 grid grid-cols-2 gap-x-4'>
                <div className='w-full bg-white shadow-dark rounded-md flex items-center justify-start flex-col min-h-[400px]'>
                    <div className='w-full flex items-center justify-between h-[60px] mt-4 border-b pb-5'>
                        <span className='text-gray-500 font-bold text-sm ml-4 flex items-center mr-10'>
                            {
                                locState && (
                                    <button className='flex items-center justify-center mr-5 w-[100px] h-[30px]  rounded-md bg-red-800 text-white' onClick={() => setLocState(false)}>
                                        <FaRegTimesCircle className='mr-2' />
                                        Close
                                    </button>
                                )
                            }
                            Crime Locations
                        </span>
                        {
                            !locState && (
                                <button onClick={() => setLocState(!locState)} className='w-[200px] h-[40px] rounded-md bg-indigo-900 text-white text-[13px] mr-5 hover:bg-indigo-800 flex items-center justify-center'>
                                    <MdOutlineAddCircleOutline className='mr-2' />
                                    Add New Location
                                </button>
                            )
                        }
                    </div>
                    {
                        !locState ? <Locations /> : <NewLocation />
                    }
                </div>
                <div className='w-full bg-white shadow-dark rounded-md flex items-center justify-start flex-col min-h-[250px]'>
                    <div className='w-full flex items-center justify-between h-[60px] mt-4 border-b pb-5'>
                        <span className='text-gray-500 font-bold text-sm ml-4 flex items-center mr-10'>
                            {
                                activityTypeState && (
                                    <button className='flex items-center justify-center mr-5 w-[100px] h-[30px]  rounded-md bg-red-800 text-white' onClick={() => setActivityTypeState(false)}>
                                        <FaRegTimesCircle className=' mr-2' />
                                        Close
                                    </button>
                                )
                            }
                            Criminal Activity Types
                        </span>
                        {
                            !activityTypeState && (
                                <button onClick={() => setActivityTypeState(!activityTypeState)} className='w-[250px] text-[13px] h-[40px] rounded-md bg-indigo-900 text-white mr-5 hover:bg-indigo-800 flex items-center justify-center'>
                                    <MdOutlineAddCircleOutline className='mr-2' />
                                    Add Criminal Activity Type
                                </button>
                            )
                        }
                    </div>
                    {
                        !activityTypeState ? <CriminalActivityTypes /> : <NewCriminalActivityType />
                    }

                </div>
                <div className='w-full bg-white shadow-dark rounded-md flex items-center justify-start flex-col min-h-[400px] col-span-2 mt-5'>
                    <div className='w-full flex items-center justify-between h-[60px] mt-4 border-b pb-5'>
                        <span className='text-gray-500 font-bold text-sm ml-4 flex items-center mr-10'>
                            {
                                activityListState && (
                                    <button className='flex items-center justify-center mr-5 w-[100px] h-[30px]  rounded-md bg-red-800 text-white' onClick={() => setActivityListState(false)}>
                                        <FaRegTimesCircle className=' mr-2' />
                                        Close
                                    </button>
                                )
                            }
                            Criminal Activities
                        </span>
                        {
                            !activityListState && (
                                <div className="flex items-center justify-center">
                                    {/* <Select
                                        options={locOptions}
                                        wrapperClassName='w-[200px]'
                                        className="mr-2 h-[40px] bg-white rounded-md w-[200px] border"
                                        placeholder="Filter by Location"
                                    />
                                    <div className="w-[200px] mx-5">
                                        <DateField className="h-[40px] w-[100%]" />
                                    </div> */}
                                    <button onClick={() => setActivityListState(!activityListState)} className='w-[240px] text-[13px] h-[40px] rounded-md bg-indigo-900 text-white mr-5 hover:bg-indigo-800 flex items-center justify-center'>
                                        <MdOutlineAddCircleOutline className='mr-2' />
                                        Add Criminal Activity
                                    </button>
                                </div>
                            )
                        }

                    </div>
                    {
                        !activityListState ? <CriminalActivities /> : <NewCriminalActivity />
                    }
                </div>

            </div>

        </Container>
    )
}
