import { paths } from "paths"
import { FC } from "react"
import { Link, useHistory } from "react-router-dom"
import { TPicture, TStateRemovePicture } from "types"
import sass from './styles.module.sass'

type TProps = {
    picture: TPicture
    removePicture: (id: string | number) => void
    getDataBeforeUpdate: () => void
    setRemovePictureState: (value: TStateRemovePicture) => void
}

const Picture: FC<TProps> = ({picture, getDataBeforeUpdate, setRemovePictureState }) => {
    const history = useHistory()
    return (
        <div className={sass.picture}>
            <div className={sass.img}>
                <img src={picture.image} alt={picture.name} />
            </div>
            <div className={sass.body}>
                <header>
                    <h4>{picture.name}</h4>
                    {/* <span className={sass.param}>ID: {picture.id}</span> */}
                </header>
                <ul>
                    <li>
                        <div className={sass.param}>Category:</div>
                        {picture.category}
                    </li>
                    <li className={
                        picture.availability.toLowerCase() !== 'sold' 
                            ? sass.inStock : sass.sold
                    }>
                        <div className={sass.param}>Availability:</div>
                        {picture.availability}
                    </li>
                    <li><div className={sass.param}>Type:</div>{picture.type}</li>
                    <li><div className={sass.param}>Size:</div>{picture.size}</li>
                </ul>
                <footer>
                    <Link to={paths.edit(picture.id)} onClick={() => {
                        getDataBeforeUpdate()
                        history.push(paths.gallery)
                    }}>Edit</Link>
                    <button onClick={() => setRemovePictureState({status: true, picture})}>Remove</button>
                    <button onClick={() => history.push(paths.gallery)}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default Picture
