import { FC } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom' 
import classnames from 'classnames'

import '@fortawesome/fontawesome-free/css/all.css'
import 'styles/main.css'

import { Contact, Cv, Gallery, Home, Texts } from 'pages'
import { paths } from 'paths'
import { Header, Footer } from 'components'


type TProps = {}

const App: FC<RouteComponentProps<TProps>> = ({location}) => {
  return (
      <div className={classnames(
        location.pathname === paths.main || location.pathname === paths.home  ? 'home' : 'page',
        location.pathname === paths.contact && 'page-contact',
      )}>
        <Header />

        <Switch>
            <Route exact path={[paths.home, paths.main]} component={Home} />
            <Route exact path={paths.gallery} component={Gallery} />
            <Route exact path={paths.cv} component={Cv} />
            <Route exact path={paths.texts} component={Texts} />
            <Route exact path={paths.contact} component={Contact} />
            <Route path={'*'} component={Home} />
        </Switch>  

        <Footer /> 
      </div>
  );
}

export default withRouter(App)
