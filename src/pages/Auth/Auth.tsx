import { TextField } from '@mui/material'
import { useAuthAPI } from 'api'
import { useForm } from 'hooks'
import { FC } from 'react'
import { TAuthForm } from 'types'
import sass from './styles.module.sass'

type TProps = {}

const Gallery: FC<TProps>  = () => {
    const { form, onChange, onSubmit } = useForm<TAuthForm>({
        login: '',
        password: ''
    })
    const { _login } = useAuthAPI()

    return (
        <div className={sass.auth}>
            <form className={sass.auth_form}>
                <h3>Log In</h3>
                <TextField
                    required
                    name='login'
                    label='Login'
                    variant='outlined'
                    value={form.login}
                    onChange={onChange}
                    className={sass.input}
                />
                <TextField
                    required
                    name='password'
                    type='password'
                    label='Password'
                    variant='outlined'
                    value={form.password}
                    onChange={onChange}
                    className={sass.input}
                    autoComplete="off" 
                />
                <button type="submit" className={sass.btn} onClick={(e) => onSubmit(e, _login)}>Log In</button>
            </form>
        </div>
    )
}

export default Gallery
