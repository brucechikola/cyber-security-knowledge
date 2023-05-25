import Select from 'components/shared/Select'
import React, { useEffect, useState } from 'react'
import InputField from 'components/shared/InputField'
import { ClipLoader } from 'react-spinners'
import { useFormik } from 'formik'
import Execute from 'api/axios/Execute'
import { API_CONFIG, SetHeaders } from 'api/config'
import { GetProvinces } from 'functions/common'
import { setProvinces } from 'store/data/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function NewLocation() {
    let [loading, setLoading] = useState(false);
    const ex = new Execute()
    const [resp_error, setError] = useState('')
    const headers = SetHeaders()
    const dispatch = useDispatch()
    const { provinces } = useSelector(state => state.data)
    useEffect(() => {
        GetProvinces(headers).then(resolve => {
            dispatch(setProvinces(resolve))
        })
    }, [])
    const onSubmit = (values, { resetForm }) => {
        setLoading(true)
        ex.post({
            endpoint_extension: API_CONFIG.endpoint_extensions.new_location,
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
            province: '',
            location: '',
            latitude: '',
            longitude: '',
        },
        onSubmit
    })
    return (
        <form onSubmit={handleSubmit} className='w-[90%] dir-col grid grid-cols-2 gap-x-[5px]'>
            <span className='w-full col-span-2 font-bold my-2 text-gray-600'>Add New Location</span>
            <Select
                className="border rounded-md h-[40px]"
                placeholder='Select Province'
                label="Select Province"
                labelClassName="text-[14px] text-gray-700 mb-2"
                wrapperClassName="w-full mb-2"
                options={provinces}
                onChange={e => values.province = e}
                id="province"
            />
            <InputField
                onChange={handleChange}
                id="location"
                value={values.location}
                labelClassName="text-[14px] text-gray-700 mb-2"
                label="Enter Location title"
                placeholder="Enter your location"
                wrapperClass="w-full"
                className="w-full col-span-2 h-[40px]"
                required
                type="text"
            />
            <InputField
                onChange={handleChange}
                id="latitude"
                value={values.latitude}
                labelClassName="text-[14px] text-gray-700 mb-2"
                label="Latitude"
                placeholder="Enter Latitude"
                wrapperClass="w-full"
                className="w-full col-span-2 h-[40px]"
                required
                type="text"
            />
            <InputField
                onChange={handleChange}
                id="longitude"
                value={values.longitude}
                labelClassName="text-[14px] text-gray-700 mb-2"
                label="Longitude"
                placeholder="Enter longitude"
                wrapperClass="w-full"
                className="w-full col-span-2 h-[40px]"
                required
                type="text"
            />
            <button type='submit' disabled={loading} className='flex items-center justify-center bg-indigo-900 hover:bg-indigo-800 text-white h-[40px] rounded-md border-0 mt-8'>
                <ClipLoader
                    color='#ffffff'
                    loading={loading}
                    size={17}
                />
                <span className="ml-2  text-[14px]">{loading ? 'Submitting' : 'Submit'}</span>
            </button>
        </form>
    )
}
