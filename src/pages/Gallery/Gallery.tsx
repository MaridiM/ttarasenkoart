import { Header, GalleryList, SortPicture, Picture} from 'components'
import { FC, useState } from 'react'
import sass from './styles.module.sass'

type TProps = {}
type TPicture = {
    id: number
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string
}


const Gallery: FC<TProps>  = () => {
    const [showPicture, setShowPicture] = useState<boolean>(false)

    const picture: TPicture = {
        id: 89,
        name: "My little friend",
        category: "portrait",
        availability: "in stock",
        type: "Oil on canvas",
        size: "100x70 cm",
        image: "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087948/ttarasenkoart/gallery/portrait/245_yftaaw.jpg"
    }

    return (
        <div>
            {
                showPicture && <Picture
                    picture={picture}
                    showPicture={setShowPicture}
                />
            }
            
            <Header />
            <div className={sass.gallery}>
                <GalleryList showPicture={setShowPicture}/>
                <SortPicture />
                
            </div>
        </div>
    )
}

export default Gallery
