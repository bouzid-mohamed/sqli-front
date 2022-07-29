import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import { useSelector } from "react-redux";
import Loading from '../../ui-component/Common/loader';

const LeftSideBar = () => {

    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    let load = useSelector((state) => state.products.loading)


    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    let prods = [...useSelector((state) => state.products.products)];
    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            data = data.slice(0, 9);
            setProducts(data);
            setPage(page);
        }
    }
    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar filterEvent={randProduct} />
                        <div className="col-lg-9">
                            {load ? (<Loading></Loading>) : (<div className="row">
                                {prods.slice(0, 12).map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard data={data} />

                                    </div>
                                ))}
                                <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" >
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className={"page-item " + (page === 1 ? "active" : null)} ><a className="page-link" href="#!">1</a></li>
                                        <li className={"page-item " + (page === 2 ? "active" : null)} ><a className="page-link" href="#!">2</a></li>
                                        <li className={"page-item " + (page === 3 ? "active" : null)} ><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item" >
                                            <a className="page-link" href="#!" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>)}

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LeftSideBar
