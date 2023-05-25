import Authentication from 'api/axios/Authentication'
import { API_CONFIG } from 'api/config'
import Action from 'components/shared/Action'
import Button from 'components/shared/Button'
import Card from 'components/shared/Card'
import Container from 'components/shared/Container'
import InputField from 'components/shared/InputField'
import Logo from 'components/template/Logo'
import { useFormik } from 'formik'
import ClipLoader from "react-spinners/ClipLoader";
import React, { useState } from 'react'
import { setLayout } from 'store/layout/layoutSlice'
import { useDispatch } from 'react-redux'
import { LAYOUTS } from 'constants'
import { useNavigate } from 'react-router-dom'
import { storeCredentials } from 'store/auth/sessionSlice'
import { setUserData } from 'store/auth/userSlice'
import Execute from 'api/axios/Execute'
export default function SignUp() {
    const dispatch = useDispatch()
    const natvigate = useNavigate()
    let [loading, setLoading] = useState(false);
    const [resp_error, setError] = useState('')
    const onSubmit = (values) => {
        setLoading(true)
        values['username'] = `${values.first_name} ${values.last_name} ${values.email} ${new Date().toISOString()}`
        new Execute().post({
            endpoint_extension: API_CONFIG.endpoint_extensions.user,
            body: values
        }).then(resolve => {
            setLoading(false)
            if (resolve.status) {
                dispatch(storeCredentials({ token: resolve.data.jwt, user: resolve.data.user }))
                dispatch(setLayout(LAYOUTS.ADMIN_LAYOUT))
                natvigate('/dbd')
            }
            else {
                setError("Something went wrong!")
                setTimeout(() => {
                    setError("")
                }, 3000);
            }
        })
    }
    const { values, touched, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            gender: '',
            email: '',
            password: '',
        },
        onSubmit
    })
    return (
        <form onSubmit={handleSubmit} className="w-[83%]">
            <h5 className='w-full items-center justify-center text-red-500 text-center'>{resp_error}</h5>
            <div className="w-full grid grid-cols-1 gap-4">
                <InputField
                    onChange={handleChange}
                    id="first_name"
                    value={values.first_name}
                    labelClassName="text-black text-[13px]"
                    label="First Name"
                    placeholder="Enter your first name"
                    wrapperClass="w-full"
                    className="text-black h-[50px] text-[14px]"
                    required={true}
                    type="text"
                />
                <InputField
                    onChange={handleChange}
                    id="last_name"
                    value={values.last_name}
                    labelClassName="text-black text-[13px]"
                    label="Last Name"
                    placeholder="Enter your last name"
                    wrapperClass="w-full"
                    className="text-black h-[50px] text-[14px]"
                    required={true}
                    type="text"
                />
                <InputField
                    onChange={handleChange}
                    id="email"
                    value={values.email}
                    labelClassName="text-black text-[13px]"
                    label="Email"
                    placeholder="Enter your email"
                    wrapperClass="w-full"
                    className="text-black h-[50px] text-[14px]"
                    required={true}
                    type="text"
                />
                <InputField
                    onChange={handleChange}
                    id="password"
                    value={values.password}
                    labelClassName="text-black text-[13px]"
                    label="Password"
                    placeholder="Enter your password"
                    wrapperClass="w-full"
                    className="text-black h-[45px]"
                    required={true}
                    type="password"
                />
                <div className="w-full h-full flex items-end justify-end mt-2">
                    <Button type="submit" disabled={loading ? true : false} onClick={handleSubmit} className="h-[45px] w-full border-0 hover:bg-indigo-900 bg-defaultcolor text-white font-bold" >
                        <span className="mr-3">{loading ? 'Please Wait' : 'Sign Up'}</span>
                        <ClipLoader
                            color='#ffffff'
                            loading={loading}
                            size={20}
                        />
                    </Button>
                </div>
            </div>
        </form>
    )
}
