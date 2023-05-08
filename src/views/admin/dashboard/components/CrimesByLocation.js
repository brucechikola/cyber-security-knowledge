import MultiAxisChart from 'components/Charts/MultiAxisChart'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function CrimesByLocation() {
    const { locations } = useSelector(state => state.data)
    const [locs, setLocs] = useState({ categories: [], values: [] })
    useEffect(() => {
        let cats = [],
            values = []
        if (locations?.length > 0) {
            locations.map(l => {
                cats.push(l.location)
                values.push(l.criminal_activities?.length || 0)
            })
            setLocs({ categories: cats, values: values })
        }
    }, [locations])
    return (
        <div className='w-full bg-white shadow-dark rounded-md'>
            <span className='text-gray-500 font-bold text-sm ml-4'>Crimes By Location</span>
            {
                locs.categories.length > 0 && <MultiAxisChart data={locs} />
            }
        </div>
    )
}
