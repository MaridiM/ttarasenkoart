import { ChangeEvent, FC, useState } from 'react'
import { MenuItem, TextField} from '@material-ui/core' 
import sass from './styles.module.sass'
import classNames from 'classnames'


type TProps = {
    items: Array<any>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    name: string
    label: string
    value?: string
    addBtn?: boolean
}

const SelectInput: FC<TProps>  = ({items, name, label, value, onChange, addBtn}) => {
    const [ changeInput, setChangeInput ] = useState<boolean>(false)
    return (
        <div className={sass.select} >
            <TextField
                required
                name={name}
                label={label}
                select={!changeInput}
                id={name}
                variant='outlined'
                value={value}
                onChange={onChange}
                className={sass.input}
                autoComplete='off'
            >
                {
                    items!.map((option) => {
                        return(
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    )})
                }
            </TextField>
            {
                addBtn && <button 
                    type="submit" 
                    onClick={() => setChangeInput(!changeInput)}
                    className={classNames(sass.btn_add, changeInput ? sass.active_btn : '')}
                >
                    {
                        !changeInput 
                            ? <i className="fas fa-plus"></i> 
                            : <i className="fas fa-times"></i>
                    }
                </button>
            }
        </div>
    )
}

export default SelectInput
