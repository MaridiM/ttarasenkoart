import { paths } from 'paths'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { TPicture, TStateRemovePicture } from 'types'
import sass from './styles.module.sass'

type TProps = {
    removePicture: () => void
    getPicture: (id: string | number ) => void
    data: TPicture[]
    setRemovePictureState: (value: TStateRemovePicture) => void
}

const GalleryList: FC<TProps> = ({getPicture, data, setRemovePictureState}) => {
    
    
    return (
        <div className={sass.list}>
           {
                data!.map(i => (
                    <article key={Math.floor(Math.random() * 999999999)}>
                        <Link to={paths.picture(i.id)} onClick={()=> getPicture(i.id)}>
                            <header>
                                {i.name}
                            </header>
                            <div className={sass.picture}>
                                <img src={i.image} alt={i.name} />
                            </div>
                        </Link>
                        
                        <footer>
                            <span className={i.availability.toLowerCase() !== 'sold' ? sass.inStock : sass.sold}>{i.availability.toLowerCase()}</span>
                            <span>{i.category}</span>
                            <button onClick={() => setRemovePictureState({status: true, picture: i})}><i className="fas fa-trash"></i></button>
                        </footer>
                    </article>
                ))
            }
        </div>
    )
}




export default GalleryList
