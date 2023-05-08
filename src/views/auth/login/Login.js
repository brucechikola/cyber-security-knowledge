import Authentication from 'api/axios/Authentication'
import { API_CONFIG } from 'api/config'
import Button from 'components/shared/Button'
import InputField from 'components/shared/InputField'
import { useFormik } from 'formik'
import ClipLoader from "react-spinners/ClipLoader";
import React, { useState } from 'react'
import { setLayout } from 'store/layout/layoutSlice'
import { useDispatch } from 'react-redux'
import { LAYOUTS } from 'constants'
import { useNavigate } from 'react-router-dom'
import { storeCredentials } from 'store/auth/sessionSlice'
export default function Login() {
    const dispatch = useDispatch()
    const natvigate = useNavigate()
    let [loading, setLoading] = useState(false);
    const [resp_error, setError] = useState('')
    const onSubmit = (values) => {
        setLoading(true)
        new Authentication().authenticate({
            endpoint_extension: API_CONFIG.endpoint_extensions.auth,
            body: {
                identifier: values.email,
                password: values.password
            }
        }).then(resolve => {
            setLoading(false)
            if (resolve.status) {
                dispatch(storeCredentials(resolve.data))
                dispatch(setLayout(LAYOUTS.ADMIN_LAYOUT))
                if (resolve.data.user.is_super_admin) {
                    natvigate('/sadbd')
                }
                else {
                    natvigate('/dbd')
                }
            }
            else {
                setError("Invalid credentials!")
                setTimeout(() => {
                    setError("")
                }, 3000);
            }
        })
    }
    const { values, touched, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            email: 'lacksonbanda@gmail.com',
            password: '377529',
        },
        onSubmit
    })
    return (
        <form onSubmit={handleSubmit} className="w-[83%]">
            <h5 className='w-full items-center justify-center text-red-500 text-center'>{resp_error}</h5>
            <div className="w-full grid grid-cols-1 gap-4">
                <InputField
                    onChange={handleChange}
                    id="email"
                    value={values.email}
                    labelClassName="text-black text-[13px]"
                    label="Email"
                    placeholder="Enter your email"
                    wrapperClass="w-full"
                    className="text-black h-[50px] text-[14px]"
                    required
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
                    required
                    type="password"
                />
                <div className="w-full h-full flex items-end justify-end mt-2">
                    <Button type="submit" disabled={loading ? true : false} onClick={handleSubmit} className="h-[45px] w-full border-0 hover:bg-indigo-900 bg-defaultcolor text-white font-bold" >
                        <span className="mr-3">{loading ? 'Please Wait' : 'Login'}</span>
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
