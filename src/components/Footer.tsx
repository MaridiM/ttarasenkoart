import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { FC } from 'react'

import SaatchiartImg from 'assets/img/saatchiart.png'
import { paths } from 'paths'

const Footer: FC = () => {
  const location = useLocation()

  return (
    <footer
      className={classnames(
        location.pathname === paths.home || location.pathname === paths.main
          ? 'footer-home'
          : '',
        location.pathname === paths.contact ? 'footer-contact' : ''
      )}
    >
      <p>
        <Link to={paths.home}>Tetiana Tarasenko</Link> &copy; 2019{' '}
      </p>
      <div className="soc">
        <div>
          <a href="https://www.facebook.com/tetianatarasenkoart">
            <i className="fab fa-facebook-square"></i>
          </a>{' '}
        </div>
        <div>
          <a href="https://www.instagram.com/tarasenko.art">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div>
          <a href="https://www.saatchiart.com/tatianatarasenko">
            <img src={SaatchiartImg} alt="Tatiana Tarasenko" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
