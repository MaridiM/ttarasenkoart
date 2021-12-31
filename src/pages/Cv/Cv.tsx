import { Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { ActionHeader, Header, CvListItem, AccessModal } from 'components'
import { useForm } from 'hooks'
import { paths } from 'paths'
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
    getAllCv,
    getCv,
    addCv,
    editCv,
    removeCv 
} from 'store/actions'
import { TCv, TCvForm } from 'types'
import sass from './styles.module.sass'

type TProps = {
    cvList: TCv[]
    cv: TCv
    getAllCv: () => void
    getCv: (id: string | number) => void
    addCv: (dataForm: TCvForm) => any
    editCv: (id: string | number, dataForm: TCvForm) => void
    removeCv: (id: string | number) => void
    
}

const Cv: FC<TProps>  = ({
    cvList,
    cv,
    getAllCv,
    getCv,
    addCv,
    editCv,
    removeCv 
}) => {
    const history = useHistory()
    const [cvState, setCvState] = useState<TCv>({
        id: undefined,
        dateFrom: '',
        dateTo: '',
        now: false,
        text: ''
    })
    const [checkNow, setCheckNow] = useState<boolean>(false)
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const [removeCvStatus, setRemoveCvStatus] = useState<boolean>(false)

    const currentID = history.location.pathname.split('/')[history.location.pathname.split('/').length -1]

    const { form, setForm, onChange, onSubmit } = useForm<TCvForm>({
        dateFrom:  '',
        dateTo: '',
        now: false,
        text: ''
    })  
    
    useEffect(() => {
        getAllCv()
    }, [getAllCv])

    const removeCvAction = (id: string | number | undefined) => {

        if(id === undefined) return toast.error('Error Items')
        removeCv(id)
        return setRemoveCvStatus(false)
    }

    const addCvRetuning = async (dataForm: TCvForm) => {
        const noError = await addCv(dataForm)

        if(noError) {
            setTimeout(() => {
                history.push(paths.cv)
            }, 1000)
        }
    }
    const editCvRetuning = (id: string | number, dataForm: TCvForm) => {
        editCv(id, dataForm)
        setTimeout(() => {
            history.push(paths.cv)
        }, 1000)
    }   
    return (
        <div style={{position: 'relative'}}>
            <Header />
            <ActionHeader path={paths.cvAdd} />
            {
                removeCvStatus && cvState!.id &&
                    <AccessModal
                        title='Remove picture'
                        success={() => removeCvAction(cvState ? cvState!.id : '')}
                        cancel={() => {
                            editStatus && setEditStatus(false)
                            setRemoveCvStatus(false)
                        }}
                    >
                        Do you really want to delete <strong>1985 - 1986</strong>?
                    </AccessModal>
            }
            { 
                (history.location.pathname === paths.cvAdd || history.location.pathname === paths.cvEdit(currentID)) &&
                    <div className={sass.modal_blur}>
                        <div className={sass.modal_window}>

                            <div className={sass.form} >
                            <header>
                                    <h4>{ 
                                        history.location.pathname === paths.cvAdd  ? 
                                            'Add cv' : 
                                            'Update cv' 
                                    }</h4>
                                </header>
                                <div className={sass.inputGroup}>
                                    <TextField
                                        name='dateFrom'
                                        label='Date From'
                                        variant='outlined'
                                        value={form.dateFrom}
                                        onChange={onChange}
                                        className={sass.input}
                                    />
                                    {
                                        (checkNow && !form.now  ) &&
                                            <TextField
                                                name='dateTo' 
                                                label='Date To'
                                                variant='outlined'
                                                value={form.dateTo}
                                                onChange={onChange}
                                                className={sass.input}
                                            />
                                    }
                                    <FormControlLabel
                                        label="Now"
                                        control={
                                            <Checkbox
                                                name='now'
                                                checked={form.now}
                                                onChange={() => {
                                                    setCheckNow(!checkNow)
                                                    return setForm(state => ({...state, now: !form.now}))
                                                }}
                                            />
                                        }
                                    />
                                    <TextField
                                        name='text'
                                        label='Text'
                                        variant='outlined'
                                        value={form.text}
                                        onChange={onChange}
                                        className={sass.input}
                                        multiline
                                        rows={4}
                                    />
                                </div>
                                <footer>
                                    <button 
                                        type="submit" 
                                        className={sass.btn}
                                        onClick={(e) => {
                                            history.location.pathname === paths.cvAdd  
                                                ? onSubmit(e, addCvRetuning) 
                                                : onSubmit(e, editCvRetuning, cv.id)
                                        }
                                    }>
                                        { 
                                            history.location.pathname === paths.cvAdd
                                                ? 'Add cv' 
                                                : 'Update cv' 
                                        }
                                    </button>
                                    <Link 
                                        to={paths.cv}
                                        className={sass.link}
                                    >Cancel</Link>
                                </footer> 
                            </div>
                        </div>
                    </div>
            }
            {
                history.location.pathname === paths.cv &&
                    <ul className={sass.list}>
                        {
                            cvList.map(c => {
                                return(
                                    <CvListItem
                                        key={c.id}
                                        date={`${c.dateFrom ? c.dateFrom : ''}${c.dateFrom ? ' - '  : '' }${c.dateTo ? c.dateTo : c.now && 'Now'}`}
                                        text={c.text}
                                        edit={()=>{
                                            history.push(paths.cvEdit(c.id))
                                            setEditStatus(true)
                                            // setForm(c)  
                                        }}
                                        remove={() => {
                                            setRemoveCvStatus(true)
                                            setCvState(c)  
                                        }}
                                    />
                                )
                            })
                        }
                    </ul>
            }
        

        </div>
    )
}

const mapStateToProps = (state, ownProp) => ({
    cvList: state.cvList,
    cv: state.cv,
})

const mapDispatchToProps = {
    getAllCv,
    getCv,
    addCv,
    editCv,
    removeCv
}

export default connect(mapStateToProps, mapDispatchToProps)(Cv)
