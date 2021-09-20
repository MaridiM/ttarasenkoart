import { FC } from 'react'
import sass from './styles.module.sass'
import { GalleryList, SortPicture } from 'components'
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
                    <div className={sass.blur}>
                        <div className={sass.modal}>
                            <h3 className={sass.modal_title}>Remove picture</h3>
                            <hr className={sass.modal_line} />
                            <p className={sass.modal_text}>Do you really want to delete <strong>{removePictureState.picture!.name }</strong> picture?</p>
                            <hr className={sass.modal_line} />
                            <div className={sass.modal_btn_group}>
                                <button className={sass.modal_success} onClick={removePicture}>Delete</button>
                                <button className={sass.modal_cancel} onClick={() => setRemovePictureState({status: false})}>Cancel</button>
                            </div>
                        </div>
                    </div>
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
