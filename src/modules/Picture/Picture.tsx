import { paths } from "paths"
import { FC } from "react"
import { Link } from "react-router-dom"
import sass from './styles.module.sass'

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
    picture: TPicture
    removePicture: (id: string | number) => void
    getDataBeforeUpdate: () => void
}

const Picture: FC<TProps> = ({picture, removePicture, getDataBeforeUpdate }) => {
    return (
        <div className={sass.picture}>
            <div className={sass.img}>
                <img src={picture.image} alt={picture.name} />
            </div>
            <div className={sass.body}>
                <header>
                    <h4>{picture.name}</h4>
                    <span className={sass.param}>ID: {picture.id}</span>
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
                    <Link to={paths.edit(picture.id)} onClick={getDataBeforeUpdate}>Edit</Link>
                    <button onClick={() => removePicture(picture.id)}>Remove</button>
                    <button onClick={() => window.location.pathname = paths.gallery}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default Picture
