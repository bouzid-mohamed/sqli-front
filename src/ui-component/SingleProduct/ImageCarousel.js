import { useEffect, useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';

ImageCarousel.propTypes = {
    images: PropTypes.array,
};
export default function ImageCarousel(props) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(props.images)

    });
    return (
        <Carousel thumbWidth={"30%"} style={{ "maxHeight": "509px" }}	>
            {
                images.map((image) =>
                    <div key={image}>
                        <img src={`http://localhost:8000/uploads/` + image} alt="E-commerce" />
                    </div>
                )}





        </Carousel>
    );
}
