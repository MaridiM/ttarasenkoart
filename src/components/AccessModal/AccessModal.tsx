import { FC, ReactNode } from 'react'
import sass from './styles.module.sass'

interface IProps {
    success: () => void
    cancel: (value?: any) => void
    title: string
    children: ReactNode
}

const AccessModal: FC<IProps> = ({ success, cancel, children, title }) => 
    <div className={sass.blur}>
        <div className={sass.modal}>
            <h3 className={sass.modal_title}>{title}</h3>
            <hr className={sass.modal_line} />
            <p className={sass.modal_text}>{children}</p>
            <hr className={sass.modal_line} />
            <div className={sass.modal_btn_group}>
                <button className={sass.modal_success} onClick={success}>Delete</button>
                <button className={sass.modal_cancel} onClick={cancel}>Cancel</button>
            </div>
        </div>
    </div>




export default AccessModal
