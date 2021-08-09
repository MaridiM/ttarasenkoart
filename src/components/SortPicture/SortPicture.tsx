import { FC } from 'react'
import { TCategory } from 'types'
import sass from './styles.module.sass'

type TProps = {
    categories: TCategory[]
    availability: TCategory[]
    setSort: (value: string) => void
    sort: string
}

const SortPicture: FC<TProps> = ({categories, availability, setSort, sort }) => {
   
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
            { window.innerWidth >= 769 && <hr />}
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
