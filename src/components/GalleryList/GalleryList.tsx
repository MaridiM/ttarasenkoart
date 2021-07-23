import { FC } from 'react'
import sass from './styles.module.sass'

type TProps = {
    showPicture: (status: boolean) => void,
}

const GalleryList: FC<TProps> = ({showPicture}) => {
    const data: Array<any> = [
        {
            "id": 89,
            "name": "My little friend",
            "category": "portrait",
            "availability": "in stock",
            "type": "Oil on canvas",
            "size": "100x70 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087948/ttarasenkoart/gallery/portrait/245_yftaaw.jpg"
        },
        {
            "id": 88,
            "name": "Where are you my little prince?",
            "category": "portrait",
            "availability": "in stock",
            "type": "Oil on canvas",
            "size": "60x50 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087944/ttarasenkoart/gallery/portrait/227%D0%B0_v7sv56.jpg"
        },
        {
            "id": 87,
            "name": "Poems and expectations",
            "category": "portrait",
            "availability": "Sold",
            "type": "Oil, Paper, pastel on canvas",
            "size": "100x55 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087944/ttarasenkoart/gallery/portrait/163_lr3zoi.jpg"
        },
        {
            "id": 86,
            "name": "Little Prince",
            "category": "portrait",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "100x70 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623087953/ttarasenkoart/gallery/portrait/237_nxislo.jpg"
        },
        {
            "id": 85,
            "name": "Face to face",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "90x60 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086797/ttarasenkoart/gallery/figurative/256_uavxbg.jpg"
        },
        {
            "id": 84,
            "name": "Geniuses draw (Mattis)",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "130x90 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086797/ttarasenkoart/gallery/figurative/243_ywzgqb.jpg"
        },
        {
            "id": 83,
            "name": "Blue jeans",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil, acrylic  on canvas",
            "size": "110x100 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086795/ttarasenkoart/gallery/figurative/221_uhldlm.jpg"
        },
        {
            "id": 82,
            "name": "The best friends",
            "category": "figurative",
            "availability": "Sold",
            "type": "Oil on canvas",
            "size": "95x55 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086795/ttarasenkoart/gallery/figurative/178_ry7h5p.jpg"
        },
        {
            "id": 81,
            "name": "Peter and his gift",
            "category": "figurative",
            "availability": "in stock",
            "type": "Oil on canvas",
            "size": "85x50 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086796/ttarasenkoart/gallery/figurative/224_fxthzq.jpg"
        },
        {
            "id": 80,
            "name": "Paris I love you",
            "category": "figurative",
            "availability": "Sold",
            "type": "Oil on canvas",
            "size": "100x80 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086795/ttarasenkoart/gallery/figurative/146_b7pmja.jpg"
        },
        {
            "id": 79,
            "name": "Alya",
            "category": "drawing",
            "availability": "Sold",
            "type": "Pencil on paper",
            "size": "30x21 cm",
            "image": "https://res.cloudinary.com/dki4lxdki/image/upload/v1623086558/ttarasenkoart/gallery/drawing/27_lzbv8k.jpg"
        }
    ]
    return (
        <div className={sass.list}>
            {
                data!.map(i => (
                    <article key={i.id} onClick={() => showPicture(true)}>
                        <div>
                            <header>
                                {i.name}
                            </header>
                            <div className={sass.picture}>
                                <img src={i.image} alt={i.name} />
                            </div>
                        </div>
                        
                        <footer>
                            <span className={i.availability.toLowerCase() !== 'sold' ? sass.inStock : sass.sold}>{i.availability.toLowerCase()}</span>
                            <span>{i.category}</span>
                            <button onClick={() => 'REMOVE PICTURE ' + i.id}><i className="fas fa-trash"></i></button>
                        </footer>
                    </article>
                ))
            }
        </div>
    )
}




export default GalleryList
