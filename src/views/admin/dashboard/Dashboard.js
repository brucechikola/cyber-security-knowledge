import React, { useEffect, useState } from 'react'
import Container from 'components/shared/Container/Container'
import PageControlsTab from 'components/shared/PageControlsTab'
import Title from 'components/shared/Title'
import RecentCriminalCases from './components/RecentCriminalCases'
import MultiAxisChart from 'components/Charts/MultiAxisChart'
import DateField from 'components/shared/DateField'
import Select from 'components/shared/Select'
import { FullMap } from '../fullMap/FullMap'
import { setCrimeTypes, setFilterDate, setLocations } from 'store/data/dataSlice'
import { GetCrimeTypes, GetLocations } from 'functions/common'
import { SetHeaders } from 'api/config'
import { useDispatch, useSelector } from 'react-redux'
import CrimesMap from './components/CrimesMap'
import CrimesByLocation from './components/CrimesByLocation'
export default function Dashboard() {
    const headers = SetHeaders()
    const dispatch = useDispatch()
    const [isFullScreen, setIsFullScreen] = useState(false)
    useEffect(() => {
        GetLocations(headers).then(resolve => {
            if (resolve) {
                dispatch(setLocations(resolve))
            }
        })
        GetCrimeTypes(headers).then(resolve => {
            if (resolve) {
                dispatch(setCrimeTypes(resolve))
            }
        })
    }, [])
    const { locations } = useSelector(state => state.data)
    return (
        <Container className='flex items-center justify-start flex-col mt-2'>
            <PageControlsTab>
                <div>
                    <Title title="Crime Hotspot Dashboard" className="text-white" />
                    <span className='text-[13px] text-white'>Get the most updated info about crimes occurred in different areas</span>
                </div>
                <div className="flex items-center justify-center w-[max-content]">
                    <Select className="mr-2 h-[40px] w-[200px] bg-white rounded-md" />
                    <div className="w-[200px]">
                        <DateField onCahnge={(e, string) => setFilterDate(string)} className="h-[40px] w-[100%]" label='' />
                    </div>
                </div>
            </PageControlsTab>
            <div className={`w-full min-h-[400px] mt-4 ${!isFullScreen ? 'grid grid-cols-3 gap-x-4' : 'flex items-start justify-center h-[70vh]'}`}>
                <FullMap data={locations} onFullScreen={state => setIsFullScreen(state)} />
                {
                    !isFullScreen && <CrimesMap />
                }
            </div>
            {
                !isFullScreen && <div className='w-full h-m-[250px] mt-4 grid grid-cols-2 gap-x-4'>
                    <CrimesByLocation />
                    <RecentCriminalCases />
                </div>
            }

        </Container>
    )
}
