import { useCategoryAPI } from 'api'
import { Header } from 'components'
import { useSort } from 'hooks'
import { 
    Gallery as GalleryModule,
    ModalPages,
} from 'modules'
import { paths } from 'paths'
import { FC, useState } from 'react'
import { 
    RouteComponentProps,
    withRouter
} from 'react-router-dom'
import { TPicture } from 'types'

type TProps = {}

const Gallery: FC<RouteComponentProps<TProps>>  = ({ location }) => {
    const { categories, availability } = useCategoryAPI()

    const [picture, setPicture] = useState<TPicture>({
            id: '',
            name: '',
            category: '',
            availability: '',
            type: '',
            size: '',
            image: ''
    })
    // FAKE DATA
    const picturesDATA: TPicture[] = [
        {
            "id": 89,
            "name": "My little friend",
            "category": "portrait",
            "availability": "in stock",
            "type": "Oil on canvas",
            "size": "100x70 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087948/ttarasenkoart/gallery/portrait/245_yftaaw.jpg"
        },
        {
            "id": 88,
            "name": "Where are you my little prince?",
            "category": "portrait",
            "availability": "in stock",
            "type": "Oil on canvas",
            "size": "60x50 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087944/ttarasenkoart/gallery/portrait/227%D0%B0_v7sv56.jpg"
        },
        {
            "id": 87,
            "name": "Poems and expectations",
            "category": "portrait",
            "availability": "sold",
            "type": "Oil, Paper, pastel on canvas",
            "size": "100x55 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087944/ttarasenkoart/gallery/portrait/163_lr3zoi.jpg"
        },
        {
            "id": 86,
            "name": "Little Prince",
            "category": "portrait",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "100x70 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087953/ttarasenkoart/gallery/portrait/237_nxislo.jpg"
        },
        {
            "id": 85,
            "name": "Face to face",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "90x60 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086797/ttarasenkoart/gallery/figurative/256_uavxbg.jpg"
        },
        {
            "id": 84,
            "name": "Geniuses draw (Mattis)",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "130x90 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086797/ttarasenkoart/gallery/figurative/243_ywzgqb.jpg"
        },
        {
            "id": 83,
            "name": "Blue jeans",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "110x100 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086795/ttarasenkoart/gallery/figurative/221_uhldlm.jpg"
        },
        {
            "id": 82,
            "name": "The best friends",
            "category": "figurative",
            "availability": "sold",
            "type": "Oil on canvas",
            "size": "95x55 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086795/ttarasenkoart/gallery/figurative/178_ry7h5p.jpg"
        },
        {
            "id": 81,
            "name": "Peter and his gift",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil on canvas",
            "size": "85x50 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086796/ttarasenkoart/gallery/figurative/224_fxthzq.jpg"
        },
        {
            "id": 80,
            "name": "Paris I love you",
            "category": "figurative",
            "availability": "sold",
            "type": "Oil on canvas",
            "size": "100x80 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086795/ttarasenkoart/gallery/figurative/146_b7pmja.jpg"
        },
        {
            "id": 79,
            "name": "Alya",
            "category": "drawing",
            "availability": "sold",
            "type": "Pencil on paper",
            "size": "30x21 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086558/ttarasenkoart/gallery/drawing/27_lzbv8k.jpg"
        }
    ]
    
    const { sort, setSort, pictures } = useSort(picturesDATA)

    // Actions
    const removePicture = (id: string | number): void => {
        console.log(id)
        // TODO: Send id on server
    }
    const getPicture = (id: string | number): void => {
        const pict = picturesDATA.filter(p => p.id === id)[0]
        setPicture( state => ({...state, ...pict}))
    }
    
    const currentPictureID: string  = location.pathname.split('/')[location.pathname.split('/').length-1]
    return (
        <div>
            {
               ( location.pathname === paths.picture(currentPictureID) ||
                location.pathname === paths.add || 
                location.pathname === paths.edit(currentPictureID)) && (

                    <ModalPages 
                        availability={availability}
                        categories={categories}
                        removePicture={removePicture}
                        path={location.pathname}
                        picture={picture}
                    />
                )
            }

            
            <Header />
            <GalleryModule 
                availability={availability}
                categories={categories}
                pictures={pictures}
                removePicture={removePicture}
                setSort={setSort}
                sort={sort}
                getPicture={getPicture}
            />
        </div>
    )
}

export default withRouter(Gallery)
