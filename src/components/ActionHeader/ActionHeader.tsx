import { FC } from 'react'
import { Link } from 'react-router-dom'
import sass from './styles.module.sass'

interface IProps {
    path: string
}

const ActionHeader: FC<IProps> = ({path}) => 
    <div className={sass.actionHeader}>
        <Link className={sass.actionHeader_link} to={path}>Add</Link>
    </div>




export default ActionHeader
