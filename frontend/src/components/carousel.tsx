import React, {useState} from "react"

export const Carousel = () => {
    
    const [index, setIndex] = useState(0);
    const length = post.images.length
    const handlePrevious = () => {
        const newIndex = index - 1;
        setIndex(newIndex < 0 ? length - 1 : newIndex);
    };

    const handleNext = () => {
        const newIndex = index + 1;
        setIndex(newIndex >= length ? 0 : newIndex)
    };

    return (
        <div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <span>{index}</span>
        </div>
    );
};