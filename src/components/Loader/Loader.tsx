import { useState, useEffect } from 'react'
import './Loader.css'

const Loader = () => {
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDotCount((prevCount) => (prevCount % 4) + 1);
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="loader">
            <div className="loader-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="loader-text">Loading{Array.from({ length: dotCount }, (_, index) => ".")}</div>
        </div>
    );
};

export default Loader;