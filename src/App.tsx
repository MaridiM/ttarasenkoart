import { Gallery, GalleryAdd, GalleryEdit } from 'pages'
import { paths } from 'paths'
import { FC } from 'react'
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom'

type TProps = {}

const App: FC<RouteComponentProps<TProps>> = ({ location }) => {
    return (
        <div className='page'>
            <Switch>
                <Route exact path={[paths.admin, paths.admin+paths.gallery]} component={Gallery} />
                <Route exact path={paths.admin+paths.gallery+paths.add} component={GalleryAdd} />
                <Route exact path={paths.admin+paths.gallery+paths.edit} component={GalleryEdit} />
            </Switch>
        </div>
    )
}

export default withRouter(App)
