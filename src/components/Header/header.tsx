import { paths } from "paths"
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { FC } from "react"
import sass from './styles.module.sass'

type TProps = {}

const Header: FC<RouteComponentProps<TProps>> = ({location}) => {
    const galleryPath = paths.admin+paths.gallery
    const addPicturePath = paths.admin+paths.gallery+paths.add
    return (
        <header className={sass.header}>
            <nav className={sass.headerNav}>
                <ul className={sass.headerNavList}>
                    <li>
                        <Link 
                            to={galleryPath} 
                            className={location.pathname === galleryPath ? sass.active : ''} 
                            >Gallery
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={addPicturePath} 
                            className={location.pathname === addPicturePath ? sass.active : ''}
                            >Add Picture
                        </Link>
                    </li>
                    <li><button onClick={() => console.log('Log Out')}>Log Out</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default withRouter(Header)
