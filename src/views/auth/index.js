import Action from 'components/shared/Action'
import Card from 'components/shared/Card'
import Container from 'components/shared/Container'
import Logo from 'components/template/Logo'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Login from './login'
import SignUp from './signup'
export default function Auth() {
    const dispatch = useDispatch()
    const natvigate = useNavigate()
    const [currentAuthPage, setCurrentAuthPage] = useState('login')
    return (
        <Container className="flex items-center justify-center h-[100vh]">
            <div className="w-[100px] h-[100px] absolute rounded-md"></div>
            {/* <div className="w-[50%] h-[100%] bg-defaultcolor absolute right-0 bg-coverd"></div> */}
            <Card className="w-[500px] min-h-[600px] py-3 h-[max-content] bg-white shadow-darks border-slate-200 flex items-center justify-center flex-col z-[5]">
                <Logo width={100} />
                <div className="my-5">
                    <h5 className='font-bold my-10 text-[14px] text-slate-700 mt-3'>Crime Hotspot Knowledge Base System</h5>
                </div>
                {
                    currentAuthPage === 'login' && <Login />
                }
                {
                    currentAuthPage === 'signup' && <SignUp />
                }
                <div className="my-5 w-[83%] flex items-center justify-center mt-8">
                    {/* <Action title="Forgot Password?" className="text-defaultcolor text-[14px]" /> */}
                    {
                        currentAuthPage === 'login' && <Action onClick={() => setCurrentAuthPage('signup')} title="Dont have an account? Create one" className="text-defaultcolor text-[14px]" />
                    }
                    {
                        currentAuthPage === 'signup' && <Action onClick={() => setCurrentAuthPage('login')} title="Already have an account? Login" className="text-defaultcolor text-[14px]" />
                    }
                </div>
            </Card>
        </Container>
    )
}
