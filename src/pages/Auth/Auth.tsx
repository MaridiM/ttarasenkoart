import { TextField } from '@material-ui/core'
import { useForm } from 'hooks'
import { FC } from 'react'
import sass from './styles.module.sass'

type TProps = {}
type TFormState = {
    login: string,
    password: string
}


const Gallery: FC<TProps>  = () => {
    const { form, onChange, onSubmit } = useForm<TFormState>({
        login: '',
        password: ''
    })

    return (
        <div className={sass.auth}>
            <form className={sass.auth_form}>
                <h3>Log In</h3>
                <TextField
                    required
                    name='login'
                    label='Title'
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
                />
                <button type="submit" className={sass.btn} onClick={onSubmit}>Log In</button>
            </form>
        </div>
    )
}

export default Gallery
