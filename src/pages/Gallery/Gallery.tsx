import { Header, GalleryList } from 'components'
import { FC } from 'react'

type TProps = {}

const Gallery: FC<TProps>  = () => {
    return (
        <div>
            <Header />
            <GalleryList />
        </div>
    )
}

export default Gallery
