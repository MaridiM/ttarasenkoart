import { Auth, Gallery } from 'pages'
import { paths } from 'paths'
import { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuthAPI } from 'api'


type TProps = {}

const LoginAmin: FC = () => {

    return ( 
        <Switch>
            <Route exact path={[
                paths.admin,
                paths.gallery,
                paths.add,
                paths.edit(),
                paths.picture()           
            ]} component={Gallery} />
            <Redirect from='*' to={paths.admin} />
        </Switch>
    )
}
const LogoutAdmin: FC = () => {
    return ( 
        <Switch>
            <Route exact path={paths.admin} component={Auth} />
            <Redirect from={'*'} to={paths.admin} />
        </Switch>
    )
}

const App: FC<TProps> = () => {
    const { isAuth } = useAuthAPI()

    return (
        <div className='page'>
            {isAuth ? <LoginAmin /> : <LogoutAdmin />} 
        </div>
    )
}

export default App

