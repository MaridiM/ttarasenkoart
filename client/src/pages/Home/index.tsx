import { FC } from 'react'
import { useSlider } from 'hooks'


const Home: FC = () => {
    const { slide } = useSlider()
    return (
        <div className="home-page">
            <div className="slider">
                <img src={slide} alt="tetiana tarasenko" />
            </div>
        </div>
    )
}

export default Home
