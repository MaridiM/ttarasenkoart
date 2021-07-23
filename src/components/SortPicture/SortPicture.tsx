import { FC, useState } from 'react'
import sass from './styles.module.sass'

type TCategory = {
    id: string
    name: string
}

const SortPicture: FC = () => {
    const [ sort, setSort ] = useState<string>('all')
    const [
        categories, 
        // setCategories
    ] = useState<TCategory[]>([
        {
            "id" : "all",
            "name" : "All"
        },
        {
            "id" : "stil-life",
            "name" : "Stil Life"
        },
        {
            "id" : "nude",
            "name" : "Nude"
        },
        {
            "id": "portrait",
            "name": "Portrait"
        },
        {
            "id": "drawing",
            "name": "Drawing"
        },
        {
            "id": "figurative",
            "name": "Figurative"
        }
    ])

     const availability: TCategory[] = [
        {
            "id" : "sold",
            "name" : "Sold"
        },
        {
            "id" : "inStock",
            "name" : "In Stock"
        },
    ]
    return (
        <ul className={sass.category}>
            {
                categories!.map(c => 
                    <li
                        key={c.id}
                        className={sort === c.id ? sass.active : ''}
                        onClick={() => setSort(c.id)}
                    >
                        {c.name}
                    </li>
                )
            }
            <hr />
            {
                availability!.map(a => 
                    <li
                        key={a.id}
                        className={sort === a.id ? sass.active : ''}
                        onClick={() => setSort(a.id)}
                    >
                        {a.name}
                    </li>
                )
            }
        </ul>
    )
}

export default SortPicture
