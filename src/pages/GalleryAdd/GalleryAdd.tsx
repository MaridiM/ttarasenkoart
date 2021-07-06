import { FC } from 'react'
import { Header, AddPicture } from 'components'

type TProps = {}

const GalleryAdd: FC<TProps> = () => {
    return (
        <div>
            <Header />
            <AddPicture />
        </div>
    )
}

export default GalleryAdd