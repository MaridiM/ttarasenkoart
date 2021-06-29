import { Link } from 'react-router-dom'

import LogoImg from 'assets/img/logo.jpg'
import { paths } from 'paths'
import { useState } from 'react'
import { useWindowSize } from 'hooks'

const Header = () => {
    const [burger, setBurger] = useState(false)
    const { windowSize } = useWindowSize()

    return (
        <header style={{ 
            height: windowSize.width <= 515 ? ( burger ? '100vh' : '115px') : '' 
        }}>
            <div className="header">
                <div className="name"><Link to={paths.home}>Tetiana Tarasenko</Link></div>
                <div className="logo">
                    <img src={LogoImg} alt="Tetiana Tarasenko " />
                </div>
            </div>
            <nav className={burger ? 'active' : ''}>
                <div className="mobMenu" onClick={() => setBurger(!burger)}><i className="fas fa-bars"></i></div>

                <div onClick={() => setBurger(false)}><Link to={paths.home} >Home</Link></div>
                <div><Link to={paths.gallery} onClick={() => setBurger(false)}>Gallery</Link></div>
                <div><Link to={paths.cv} onClick={() => setBurger(false)}>CV</Link></div>
                <div><Link to={paths.texts} onClick={() => setBurger(false)}>Texts</Link></div>
                <div><Link to={paths.contact} onClick={() => setBurger(false)}>Contact Me</Link></div>
            </nav>
        </header>
    )
}

export default Header
