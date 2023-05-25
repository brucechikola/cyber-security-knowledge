import Select from 'components/shared/Select'
import React, { useState } from 'react'
import InputField from 'components/shared/InputField'
import { API_CONFIG, SetHeaders } from 'api/config'
import { useDispatch } from 'react-redux'
import Execute from 'api/axios/Execute'
import { useFormik } from 'formik'
import { ClipLoader } from 'react-spinners'
import { GiChalkOutlineMurder, GiCrimeSceneTape, GiDrippingKnife, GiPistolGun, GiPumpkinMask, GiRun } from 'react-icons/gi'
export default function NewCriminalActivityType() {
    const ex = new Execute()
    let [loading, setLoading] = useState(false);
    const [resp_error, setError] = useState('')
    const headers = SetHeaders()
    const dispatch = useDispatch()
    const icons = [
        {
            value: 'GiCrimeSceneTape',
            label: 'Rape Cases Icon',
        },
        {
            value: 'GiChalkOutlineMurder',
            label: 'Murder Cases Icon'
        },
        {
            value: 'GiRun',
            label: 'Snatching Cases Icon',
        },
        {
            value: 'GiPumpkinMask',
            label: 'Kidnapping Cases Icon',
        },
        {
            value: 'GiPistolGun',
            label: 'Shooting Cases Icon'
        },
        {
            value: 'GiDrippingKnife',
            label: 'Sturbing Cases Icon'
        }
    ]
    const onSubmit = (values, { resetForm }) => {
        setLoading(true)
        ex.post({
            endpoint_extension: API_CONFIG.endpoint_extensions.criminal_activity_types,
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
            type: '',
            // description: '',
        },
        onSubmit
    })
    return (
        <form onSubmit={handleSubmit} className='w-[90%] dir-col grid grid-cols-2 gap-x-[5px] pb-4'>
            <span className='w-full col-span-2 font-bold my-2 text-gray-600'>Add New Crime Type</span>
            <InputField
                onChange={handleChange}
                id="type"
                value={values.type}
                labelClassName="text-[13px] text-gray-700 mb-2"
                label="Enter Crime Type"
                placeholder="Enter your location"
                wrapperClass="w-full"
                className="w-full col-span-2 h-[40px] text-[13px] mb-3"
                required
                type="text"
            />
            {/* <InputField
                onChange={handleChange}
                id="description"
                value={values.description}
                labelClassName="text-[13px] text-gray-700 mb-2"
                label="Brief Description"
                placeholder="Enter brief description"
                wrapperClass="w-full"
                className="w-full col-span-2 h-[40px] text-[13px] mb-3"
                required
                type="text"
            /> */}
            <Select
                className="border rounded-md h-[40px]"
                placeholder='Select Icon'
                label="Select Icon"
                labelClassName="text-[13px] text-gray-700 mb-2"
                wrapperClassName="w-full mb-2"
                options={icons}
                onChange={e => values.icon = e}
                id="icon"
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
