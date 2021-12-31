import { paths } from "paths"
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { FC } from "react"
import sass from './styles.module.sass'
import { useAuthAPI } from "api"

type TProps = {}

const Header: FC<RouteComponentProps<TProps>> = ({location}) => {
    const { _logout } = useAuthAPI()
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
                    {/* <li>
                        <Link 
                            to={paths.cv} 
                            className={location.pathname === paths.cv ? sass.active : ''} 
                            >Cv
                        </Link>
                    </li> */}
                    <li><button onClick={_logout}>Log Out</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default withRouter(Header)
