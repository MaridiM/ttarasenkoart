import { useState, useEffect } from 'react'
import SlidersJSON from 'data/slider.json'

export const useSlider = () => {
    const [slide, setSlide ] = useState(SlidersJSON[0].image)

    useEffect(() => {
        let slideCount = 1
        setInterval(() => {
            if( slideCount < SlidersJSON.length) {
                setSlide(SlidersJSON[slideCount].image)
                slideCount++
            } else {
                setSlide(SlidersJSON[0].image)
                slideCount = 1
            }
        }, 2000)

       

    }, [setSlide])

    return { slide }
}