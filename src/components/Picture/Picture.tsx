import { FC } from "react"
import sass from './styles.module.sass'

type TPicture = {
    id: number
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string
}
type TProps = {
    picture: TPicture
    showPicture: (status: boolean) => void
}

const Header: FC<TProps> = ({picture, showPicture}) => {
    return (
        <div className={sass.pictureWrapper}>
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
                        <button onClick={() => console.log('Edit picture')}>Edit</button>
                        <button onClick={() => console.log('Remove picture')}>Remove</button>
                        <button onClick={() => showPicture(false)}>Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Header
