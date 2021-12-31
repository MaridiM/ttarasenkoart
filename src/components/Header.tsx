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
                <div style={{ fontSize: '24px'}}>+380999296141</div>
                <div className="logo">
                    <img src={LogoImg} alt="Tetiana Tarasenko " />
                </div>
            </div>
            <nav className={burger ? 'active' : ''}>
                <div className="mobMenu" onClick={() => setBurger(!burger)}><i className="fas fa-bars"></i></div>

                <div onClick={() => setBurger(false)}><Link to={paths.home}>Home</Link></div>
                <div onClick={() => setBurger(false)}><Link to={paths.gallery} >Gallery</Link></div>
                <div onClick={() => setBurger(false)}><Link to={paths.cv} >CV</Link></div>
                <div onClick={() => setBurger(false)}><Link to={paths.texts} >Texts</Link></div>
                <div onClick={() => setBurger(false)}><Link to={paths.contact} >Contact Me</Link></div>
            </nav>
        </header>
    )
}

export default Header
