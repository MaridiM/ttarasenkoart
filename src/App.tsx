import { Auth, Gallery } from 'pages'
import { paths } from 'paths'
import { FC } from 'react'
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom'

type TProps = {}

const LoginAmin: FC = () => {
    return ( 
        <Switch>
            <Route exact path={[
                paths.admin,
                paths.gallery,
                paths.add,
                paths.edit(),
                paths.picture(),
                '*'
            ]} component={Gallery} />
        </Switch>
    )
}
const LogoutAdmin: FC = () => {
    return ( 
        <Switch>
            <Route exact path={[paths.admin, paths.auth]} component={Auth} />
            <Route exact path={'*'} component={Auth} />
        </Switch>
    )
}

const App: FC<RouteComponentProps<TProps>> = ({ location }) => {
    const auth: boolean = true
    return (
        <div className='page'>
            {auth ? <LoginAmin /> : <LogoutAdmin />} 
        </div>
    )
}

export default withRouter(App)
