import { useCategoryAPI, usePicturesAPI } from 'api'
import { Header } from 'components'
import { useSort } from 'hooks'
import { 
    Gallery as GalleryModule,
    ModalPages,
} from 'modules'
import { paths } from 'paths'
import { FC, useEffect } from 'react'
import { 
    RouteComponentProps,
    withRouter
} from 'react-router-dom'
type TProps = {}

const Gallery: FC<RouteComponentProps<TProps>>  = ({ location }) => {
    const { categories, availability } = useCategoryAPI()
    const { 
        getPictures,
        getPicture,
        addPicture,
        editPicture,
        removePicture,
        picture,
        pictures: picturesDATA
    } = usePicturesAPI()

    useEffect(() => {
        getPictures()
    }, [])
       
    const { sort, setSort, pictures } = useSort(picturesDATA)
    
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
                        addPicture={addPicture}
                        editPicture={editPicture}
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
