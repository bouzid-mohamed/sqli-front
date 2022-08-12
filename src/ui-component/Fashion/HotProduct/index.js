import React, { useState } from 'react'
import ProductCard from '../../Common/Product/ProductCard';
import Heading from '../Heading';

import { useSelector } from "react-redux";
const HotProduct = (props) => {
    const [isActive, setIsActive] = useState([1, 0, 0, 0, 0])
    let products = useSelector((state) => state.products.products);
    const changeActive = (num) => {
        let act2 = [0, 0, 0, 0, 0]
        act2[num] = 1
        setIsActive(act2)
    }

    return (
        <>
            <section id="hot_Product_area" className="ptb-100">
                <div className="container">
                    <Heading heading="Nos Produits" para="" />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tabs_center_button">
                                <ul className="nav nav-tabs">
                                    <li><a data-toggle="tab" href="#new_arrival" className={isActive[0] === 1 ? 'active' : ''} onClick={() => changeActive(0)}>Meilleurs prix</a></li>
                                    <li><a data-toggle="tab" href="#trending" className={isActive[1] === 1 ? 'active' : ''} onClick={() => changeActive(1)}>Nouveaux</a></li>
                                    <li><a data-toggle="tab" href="#best_sellers" className={isActive[2] === 1 ? 'active' : ''} onClick={() => changeActive(2)}>Avec promos</a></li>
                                    <li><a data-toggle="tab" href="#featured" className={isActive[3] === 1 ? 'active' : ''} onClick={() => changeActive(3)}>les plus vendus</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="tabs_el_wrapper">
                                <div className="tab-content">
                                    <div id="new_arrival" className={isActive[0] === 1 ? 'tab-pane fade show in active' : 'tab-pane fade'} >
                                        <div className="row">
                                            {props.prods[0].map((data, index) => (
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                                    <ProductCard data={data} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="trending" className={isActive[1] === 1 ? 'tab-pane fade show in active' : 'tab-pane fade'}>
                                        <div className="row">
                                            {props.prods[1].map((data, index) => (
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                                    <ProductCard data={data} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="best_sellers" className={isActive[2] === 1 ? 'tab-pane fade show in active' : 'tab-pane fade'}>
                                        <div className="row">
                                            {props.prods[2].map((data, index) => (
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                                    <ProductCard data={data} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="featured" className={isActive[3] === 1 ? 'tab-pane fade show in active' : 'tab-pane fade'}>
                                        <div className="row">
                                            {props.prods[3].map((data, index) => (
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                                    <ProductCard data={data} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HotProduct
