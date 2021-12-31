import { FC } from 'react'
import sass from './styles.module.sass'
import { AccessModal, GalleryList, SortPicture } from 'components'
import { TCategory, TPicture, TStateRemovePicture } from 'types'

type TProps = {
    availability: TCategory[]
    categories: TCategory[]
    removePicture: () => void
    getPicture: (id: string | number ) => void
    pictures: TPicture[]
    setSort: (value: string) => void
    sort: string
    removePictureState: TStateRemovePicture
    setRemovePictureState: (value: TStateRemovePicture) => void
}


const Gallery: FC<TProps>  = ({
    availability,
    categories,
    pictures,
    removePicture,
    setSort,
    sort,
    getPicture,
    removePictureState,
    setRemovePictureState
}) => {
    return (
        <div className={sass.gallery}>
            {
                removePictureState.picture && removePictureState.status && 
                    <AccessModal
                        title='Remove picture'
                        success={removePicture}
                        cancel={() => setRemovePictureState({status: false})}
                    >
                        Do you really want to delete <strong>{removePictureState.picture!.name }</strong> picture?
                    </AccessModal>
            }

            <GalleryList 
                data={pictures} 
                removePicture={removePicture}
                getPicture={getPicture}
                setRemovePictureState={setRemovePictureState}
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
