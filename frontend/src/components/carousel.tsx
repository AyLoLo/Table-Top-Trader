import React, {useState} from "react"

export const Carousel = (props : any) => {

    const {
        images 
    } = props
    
    const [index, setIndex] = useState(0);
    const [hideCarousel, setHideCarousel] = useState<boolean>(false)
    const length = images.length
    
    const handlePrevious = () => {
        const newIndex = index - 1;
        setIndex(newIndex < 0 ? length - 1 : newIndex);
    };

    const handleNext = () => {
        const newIndex = index + 1;
        setIndex(newIndex >= length ? 0 : newIndex)
    };

    if (length === 1)  {
        setHideCarousel(true)
    }

    return (
        <div>
            {!hideCarousel 
                ?   <div className="grid grid-flow-col">
                        <button className="text-right text-blue-700 font-semibold" onClick={handlePrevious}>Previous</button>
                        <span className="m-auto text-blue-700">{index}</span>
                        <button className="text-left text-blue-700 font-semibold" onClick={handleNext}>Next</button>
                    </div>
                : null
            }
        </div>
    );
};