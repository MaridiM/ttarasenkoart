import { useState } from 'react';
import { authAPI } from './../auth';
import { TAuthForm } from 'types'
import { paths } from 'paths'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

type TUseAuthAPI = {
    _login: (data: TAuthForm) => void
    _logout: () => void
    isAuth: boolean
}


export const useAuthAPI = (): TUseAuthAPI => {
    const [ isAuth, setAuth ] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('jwt_token')
        if(token) {
            setAuth(true)
            setTimeout(() => {
                _logout()
            }, 24*60*60*1000);
        }
    }, [])
    


    const _login = async (data: TAuthForm): Promise<void> => {
        await authAPI.login(data)
            .then(({data: { token, error }}) => {
                if(!token) return toast.error(error || 'Token is not valid')

                localStorage.setItem('jwt_token', token)
                return document.location.pathname = paths.gallery
            })
            .catch( async ({ response: { data: { error } }}) => {
                await setAuth(false)
                return toast.error(error)
            })
    }
    const _logout = () => {
        localStorage.removeItem('jwt_token')
        document.location.pathname = paths.admin
    }

    return {
        _login,
        _logout,
        isAuth
    }
}