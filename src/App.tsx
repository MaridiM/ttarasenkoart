import { Gallery, GalleryAdd, GalleryEdit } from 'pages'
import { paths } from 'paths'
import { FC } from 'react'
import { Switch, Route } from 'react-router-dom'

type TProps = {}

const App: FC<TProps> = () => {
    return (
        <Switch>
            <Route exact path={paths.admin} component={Gallery} />
            <Route exact path={paths.admin+paths.gallery} component={Gallery} />
            <Route exact path={paths.admin+paths.gallery+paths.add} component={GalleryAdd} />
            <Route exact path={paths.admin+paths.gallery+paths.edit} component={GalleryEdit} />
        </Switch>
    )
}

export default App
