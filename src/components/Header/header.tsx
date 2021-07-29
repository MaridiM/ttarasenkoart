import { paths } from "paths"
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { FC } from "react"
import sass from './styles.module.sass'

type TProps = {}

const Header: FC<RouteComponentProps<TProps>> = ({location}) => {
    return (
        <header className={sass.header}>
            <nav className={sass.headerNav}>
                <ul className={sass.headerNavList}>
                    <li>
                        <Link 
                            to={paths.gallery} 
                            className={location.pathname === paths.gallery ? sass.active : ''} 
                            >Gallery
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={paths.add} 
                            className={location.pathname === paths.add ? sass.active : ''}
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
