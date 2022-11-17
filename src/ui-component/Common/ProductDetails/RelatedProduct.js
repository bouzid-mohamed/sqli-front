import React from 'react'
import ProductCard from '../Product/ProductCard'
import { useSelector } from "react-redux";
import Heading from '../../Fashion/Heading'
const RelatedProduct = (props) => {
    // let products = useSelector((state) => state.products.products);
    return (
        <>
            {props.data.length > 0 ? (<section id="related_product" className="pb-100">
                <div className="container">
                    <Heading heading="VOUS POURRIEZ AUSSI AIMER" />
                    <div className="row">
                        {props.load ? (null) : (<>
                            {props.data.map((data, index) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index} >
                                    <ProductCard data={data} />
                                </div>
                            ))}
                        </>)}

                    </div>
                </div>
            </section>) : (null)}

        </>
    )
}

export default RelatedProduct