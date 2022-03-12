import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
                        <img src={`${process.env.PUBLIC_URL}/static/mock-images/products/` + image} alt="E-commerce" />
                    </div>
                )}





        </Carousel>
    );
}
