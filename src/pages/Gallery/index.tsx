import { Loader } from 'components'
import { FC, useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { getCategories, getPictures } from 'store/actions'
import type { RootState } from 'store'
import type { TCategory, TPicture } from '../../types'

type TPictureState = {
  blur: boolean
  picture: string
}

const connector = connect(
  (state: RootState) => ({
    categories: state.categories,
    pictures: state.pictures,
  }),
  {
    getCategories,
    getPictures,
  }
)

type TProps = ConnectedProps<typeof connector>

const Gallery: FC<TProps> = ({
  getPictures,
  getCategories,
  categories,
  pictures,
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<string>('all')
  const [hoverId, setHoverId] = useState<number | string | null>(null)
  const [showPicture, setPicture] = useState<TPictureState>({
    blur: false,
    picture: '',
  })

  useEffect(() => {
    getCategories()
    getPictures(category)
  }, [category, getCategories, getPictures])

  useEffect(() => {
    if (pictures.length) {
      setLoading(false)
    }
  }, [pictures])

  const showBigPicture = (picture: string, blur: boolean): void =>
    setPicture({ blur, picture })

  return (
    <div className="gallery-page">
      <div className="category">
        {categories.map((item: TCategory) => (
          <button key={item.id} onClick={() => setCategory(item.id)}>
            {item.name}
          </button>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="gallery">
          {pictures.map((item: TPicture) => (
            <div
              key={item.id}
              className="item"
              onClick={() => showBigPicture(item.image, true)}
              onMouseEnter={() => setHoverId(item.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              {hoverId === item.id && (
                <div className="info">
                  <h2>{item.name}</h2>
                  <div>
                    <p>Availability :</p>
                    <span>{item.availability}</span>
                  </div>
                  <div>
                    <p>Type :</p>
                    <span>{item.type}</span>
                  </div>
                  <div>
                    <p>Size :</p>
                    <span>{item.size}</span>
                  </div>
                </div>
              )}
              <img
                src={item.image}
                alt={item.category}
                style={{ opacity: hoverId !== item.id ? 1 : 0.1 }}
              />
            </div>
          ))}
        </div>
      )}
      {showPicture.blur && (
        <div className="bigImg" onClick={() => showBigPicture('', false)}>
          <img src={showPicture.picture} alt="Tetiana Tarasenko" />
        </div>
      )}
    </div>
  )
}

export default connector(Gallery)
