import { FC, useState, useEffect } from 'react'
import categoryJSON from 'data/category.json'
import galleryJSON from 'data/gallery.json'

type TPictureState = {
    blur: boolean
    picture: string
}

const Gallery: FC = () => {
    const [category, setCategory] = useState<string>('all')
    const [hoverId, setHoverId] = useState<number | null>(null )
    const [gallery, setGallery] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [showPicture, setPicture] = useState<TPictureState>({
        blur: false,
        picture: ''
    })
    
    useEffect(()=> {
        const filteredGallery = galleryJSON.filter(item => item.category === category)
        setGallery(filteredGallery)
        category === 'all' && setGallery(galleryJSON)
        setLoading(false)

    }, [category])

    
    const showBigPicture = (picture: string, blur: boolean): void => setPicture({ blur, picture }) 
    
    
    return (
        <div className="gallery-page">
            <div className="category">
                {
                    categoryJSON!.map(item => {
                        return (
                            <button 
                                key={item.id} 
                                onClick={() => setCategory(item.id)}
                            >{item.name}</button>
                        )
                    })
                }
            </div>
            <div className="gallery">
                { loading && <span style={{fontSize: '18px', opacity: .7,}}>Loading....</span>}
                {
                    !loading && gallery!.map(item => {
                        return (
                            <div 
                                key={item.id} 
                                className="item"
                                onClick={() => showBigPicture(item.image, true)}
                                onMouseEnter={() => setHoverId(item.id)}
                                onMouseLeave={() => setHoverId(null)}
                            >
                                {
                                    hoverId === item.id && (
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
                                    )
                                }
                                <img 
                                    src={item.image}
                                    alt={item.category}
                                    style={{opacity:  hoverId !== item.id ? 1 : 0.1}} 
                                />
                            </div>
                        )

                    })
                }
            </div>
            { showPicture.blur && <div 
                className="bigImg"
                onClick={() => showBigPicture('', false)}
            >
                <img 
                    src={ showPicture.picture }
                    alt='Tetiana Tarasenko'
                />   
            </div>}
        </div>
    )
}

export default Gallery
