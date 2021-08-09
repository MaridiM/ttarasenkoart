import { paths } from 'paths'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { TPicture } from 'types'
import sass from './styles.module.sass'

type TProps = {
    removePicture: (id: string | number ) => void
    getPicture: (id: string | number ) => void
    data: TPicture[]
}

const GalleryList: FC<TProps> = ({removePicture, getPicture, data}) => {
    
    return (
        <div className={sass.list}>
            {
                data!.map(i => (
                    <article key={i.id}>
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
                            <button onClick={() => removePicture(i.id)}><i className="fas fa-trash"></i></button>
                        </footer>
                    </article>
                ))
            }
        </div>
    )
}




export default GalleryList
