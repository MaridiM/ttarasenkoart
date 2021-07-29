import { FC } from 'react'
import sass from './styles.module.sass'
import { GalleryList, SortPicture } from 'components'

type TPicture = {
    id: number | string
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string
}

type TProps = {
    availability: TCategory[]
    categories: TCategory[]
    removePicture: (id: string | number ) => void
    getPicture: (id: string | number ) => void
    pictures: TPicture[]
    setSort: (value: string) => void
    sort: string
}
type TCategory = {
    id: string
    name: string
}

const Gallery: FC<TProps>  = ({
    availability,
    categories,
    pictures,
    removePicture,
    setSort,
    sort,
    getPicture
}) => {
    return (
        <div className={sass.gallery}>
            <GalleryList 
                data={pictures} 
                removePicture={removePicture}
                getPicture={getPicture}
            />
            <SortPicture 
                setSort={setSort}
                sort={sort}
                categories={categories} 
                availability={availability} />
            
        </div>
    )
}

export default Gallery
