// import { 
//     useCategoryAPI, 
//     // usePicturesAPI
// } from 'api'
import { Header } from 'components'
import { useSort } from 'hooks'
import { 
    Gallery as GalleryModule,
    ModalPages,
} from 'modules'
import { paths } from 'paths'
import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { 
    RouteComponentProps,
    withRouter
} from 'react-router-dom'
import { 
    getCategories,
    getPictures,
    getPicture,
    addPicture,
    editPicture,
    removePicture
} from 'store/actions'
import { TCategory, TPicture, TPictureForm, TStateRemovePicture } from 'types'

interface IProps extends RouteComponentProps<any> {
    getCategories: () => void
    getPictures: () => void
    getPicture: (id: string | number) => void
    addPicture: (dataForm: TPictureForm) => void
    editPicture: (id: string | number, dataForm: TPictureForm) => void
    removePicture: (id: string | number) => void
    pictures: TPicture[]
    picture: TPicture
    availability: TCategory[]
    categories: TCategory[]
}

const Gallery: FC<IProps>  = ({ 
    location,
    getCategories,
    getPictures,
    getPicture,
    addPicture,
    editPicture,
    removePicture,
    picture,
    pictures: picturesDATA,
    availability,
    categories
}) => {

    const [removePictureState, setRemovePictureState] = useState<TStateRemovePicture>({
        picture: undefined,
        status: true
    })

    useEffect(() => {
        getCategories()
        getPictures()
    }, [getCategories, getPicture, getPictures, removePictureState])
       
    const { sort, setSort, pictures } = useSort(picturesDATA)

    const currentPictureID: string  = location.pathname.split('/')[location.pathname.split('/').length-1]

    const removePictureAction = () => {
        removePicture(removePictureState.picture!.id)
        setRemovePictureState({status: false})
    }

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
                        setRemovePictureState={setRemovePictureState}
                    />
                )
            }

            
            <Header />
            <GalleryModule 
                availability={availability}
                categories={categories}
                pictures={pictures}
                removePicture={removePictureAction}
                setSort={setSort}
                sort={sort}
                getPicture={getPicture}
                removePictureState={removePictureState}
                setRemovePictureState={setRemovePictureState}
            />
        </div>
    )
}
const mapStateToProps = (state, ownProp) => ({
    pictures: state.pictures,
    picture: state.picture,
    availability: state.availability,
    categories: state.categories
})

const mapDispatchToProps = {
    getCategories,
    getPictures,
    getPicture,
    addPicture,
    editPicture,
    removePicture
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Gallery))
