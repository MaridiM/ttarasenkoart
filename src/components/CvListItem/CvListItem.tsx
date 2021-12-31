import { FC } from 'react'
import sass from './styles.module.sass'

interface IProps {
    date: string
    text: string
    edit: () => void
    remove: (state: any) => void
}

const CvListItem: FC<IProps> = ({date, text, edit, remove }) => 
    <li className={sass.item}>
        <div className={sass.content}>
            <span className={sass.date}>{date}</span> 
            <span className={sass.text}>{text}</span>
        </div>
        <div className={sass.action}>
            <button className={sass.btn} onClick={edit}><i className="fas fa-pen"></i></button>
            <button className={sass.btn} onClick={remove}><i className="fas fa-trash"></i></button>
        </div>
    </li>




export default CvListItem
