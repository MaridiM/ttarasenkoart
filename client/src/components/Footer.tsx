import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import SaatchiartImg from 'assets/img/saatchiart.png'
import { paths } from 'paths'
import { FC } from 'react'

const Footer: FC<RouteComponentProps<any>> = ({location}) => {
    return (
        <footer className={classnames(
            location.pathname === paths.home || location.pathname === paths.main ? 'footer-home' : '',
            location.pathname === paths.contact ? 'footer-contact' : ''
        )}>
            <p><Link to={paths.home}>Tetiana Tarasenko</Link> &copy; 2019 </p>
            <div className="soc">
                <div><a href="https://www.facebook.com/tetianatarasenkoart"><i className="fab fa-facebook-square"></i></a> </div>
                <div><a href="https://www.instagram.com/tarasenko.art"><i className="fab fa-instagram"></i></a></div>
                <div><a href="https://www.saatchiart.com/tatianatarasenko"><img src={SaatchiartImg} alt="Tatiana Tarasenko" /></a></div>
            </div>

        </footer>
    )
}

export default withRouter(Footer)
