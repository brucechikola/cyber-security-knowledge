import Select from 'components/shared/Select'
import React, { useEffect, useState } from 'react'
import InputField from 'components/shared/InputField'
import { API_CONFIG, SetHeaders } from 'api/config'
import { useDispatch, useSelector } from 'react-redux'
import Execute from 'api/axios/Execute'
import { useFormik } from 'formik'
import { ClipLoader } from 'react-spinners'
import { GetCrimeTypes, GetLocations } from 'functions/common'
import DateField from 'components/shared/DateField'
import TimeField from 'components/shared/TimeField'
export default function NewCriminalActivity() {
    const ex = new Execute()
    let [loading, setLoading] = useState(false);
    const [ctypes, setCtypes] = useState([])
    const [locs, setLocs] = useState([])
    const headers = SetHeaders()
    const dispatch = useDispatch()
    useEffect(() => {
        GetCrimeTypes(headers).then(resolve => {
            const ct = resolve.map(c => {
                return { label: c.type, value: c.id }
            })
            setCtypes(ct)
        })
        GetLocations(headers).then(resolve => {
            const lc = resolve.map(l => {
                return { label: l.location, value: l.id }
            })
            setLocs(lc)
        })
    }, [])
    const onSubmit = (values, { resetForm }) => {
        setLoading(true)
        ex.post({
            endpoint_extension: API_CONFIG.endpoint_extensions.criminal_activities,
            headers: headers,
            body: {
                data: values
            }
        }).then(resolve => {
            setLoading(false)
            resetForm()
        })
    }
    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            criminal_activity_type: '',
            location: '',
            description: '',
            date: '',
            time: ''
        },
        onSubmit
    })
    return (
        <form onSubmit={handleSubmit} className='w-[90%] dir-col grid grid-cols-2 gap-x-[5px] pb-4'>
            <span className='w-full col-span-2 font-bold my-2 text-gray-600'>Add New Crime Type</span>
            <Select
                className="border rounded-md h-[40px]"
                placeholder='Select Crime Type'
                label="Select Crime Type"
                labelClassName="text-[13px] text-gray-700 mb-2"
                wrapperClassName="w-full mb-2"
                options={ctypes}
                onChange={e => values.criminal_activity_type = e}
                id="criminal_activity_type"
            />
            <Select
                className="border rounded-md h-[40px]"
                placeholder='Select Location'
                label="Select Location"
                labelClassName="text-[13px] text-gray-700 mb-2"
                wrapperClassName="w-full mb-2"
                options={locs}
                onChange={e => values.location = e}
                id="location"
            />
            <InputField
                onChange={handleChange}
                id="description"
                value={values.description}
                labelClassName="text-[13px] text-gray-700 mb-2"
                label="Brief Description"
                placeholder="Enter brief description"
                wrapperClass="w-full"
                className="w-full col-span-2 h-[40px] text-[13px]"
                required
                type="text"
            />
            <div className="w-full">
                <DateField
                    onChange={(e, string) => values.date = new Date(string).toISOString()}
                    className="h-[40px] w-[100%]"
                    label="Select Date"
                    labelClassName="text-[13px] text-gray-700 mb-2"
                />
            </div>
            <div className="w-full">
                <TimeField
                    onChange={(e, string) =>
                        values.time = string}
                    className="h-[40px] w-[100%]"
                    label="Select Time"
                    labelClassName="text-[13px] text-gray-700 mb-2"
                />
            </div>
            <button type='submit' disabled={loading} className='flex items-center justify-center bg-indigo-900 hover:bg-indigo-800 text-white h-[40px] rounded-md border-0 mt-8'>
                <ClipLoader
                    color='#ffffff'
                    loading={loading}
                    size={17}
                />
                <span className="ml-2  text-[13px]">{loading ? 'Submitting' : 'Submit'}</span>
            </button>
        </form>
    )
}
