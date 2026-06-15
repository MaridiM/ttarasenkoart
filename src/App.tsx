import { FC } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import classnames from 'classnames'

import '@fortawesome/fontawesome-free/css/all.css'
import 'styles/main.css'

import { Contact, Cv, Gallery, Home, Texts } from 'pages'
import { paths } from 'paths'
import { Header, Footer } from 'components'

const App: FC = () => {
  const location = useLocation()

  return (
    <div
      className={classnames(
        location.pathname === paths.main || location.pathname === paths.home
          ? 'home'
          : 'page',
        location.pathname === paths.contact && 'page-contact'
      )}
    >
      <Header />

      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.main} element={<Home />} />
        <Route path={paths.gallery} element={<Gallery />} />
        <Route path={paths.cv} element={<Cv />} />
        <Route path={paths.texts} element={<Texts />} />
        <Route path={paths.contact} element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
