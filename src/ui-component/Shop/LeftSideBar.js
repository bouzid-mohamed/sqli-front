import React, { useState } from 'react'
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import { useSelector } from "react-redux";
import Loading from '../../ui-component/Common/loader';
import { useLocation } from 'react-router';
import { createBrowserHistory } from 'history';
import { useParams } from 'react-router';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const LeftSideBar = () => {
    const params = useParams();

    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    let load = useSelector((state) => state.products.loading)
    let numberPages = useSelector((state) => state.products.numberPages)
    let query = useQuery();
    const [filter, setFilter] = React.useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
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
    const nextPage = () => {
        let value = 1
        if (page >= numberPages) {
            value = page
        } else {
            value = page + 1
        }
        if (query.get('filter')) {
            var myArray = query.get("filter").split(',');
            myArray.filter((e) => {
                filter.push(parseInt(e))
            })
        }
        const history = createBrowserHistory();
        if (filter.length > 0) {
            history.push("/shop/" + params.idE + "?page=" + value + '&filter=' + filter);
        } else if (query.get('search') != null) {
            history.push("/shop/" + params.idE + "?page=" + value + "&search=" + searchValue);
        }
        else {
            history.push("/shop/" + params.idE + "?page=" + value);
        }
        window.location.reload();
    }
    const previousPage = () => {
        let value = 1
        if (page <= 1) {
            value = 1
        } else {
            value = page - 1
        }
        if (query.get('filter')) {
            var myArray = query.get("filter").split(',');
            myArray.filter((e) => {
                filter.push(parseInt(e))
            })
        }
        const history = createBrowserHistory();
        if (filter.length > 0) {
            history.push("/shop/" + params.idE + "?page=" + value + '&filter=' + filter);
        } else if (query.get('search') != null) {
            history.push("/shop/" + params.idE + "?page=" + value + "&search=" + searchValue);
        }
        else {
            history.push("/shop/" + params.idE + "?page=" + value);
        }
        window.location.reload();
    }
    const handleChange = (value) => {
        if (query.get('filter')) {
            var myArray = query.get("filter").split(',');
            myArray.filter((e) => {
                filter.push(parseInt(e))
            })
        }
        const history = createBrowserHistory();
        if (filter.length > 0) {
            history.push("/shop/" + params.idE + "?page=" + value + '&filter=' + filter);
        } else if (query.get('search') != null) {
            history.push("/shop/" + params.idE + "?page=" + value + "&search=" + searchValue);
        }
        else {
            history.push("/shop/" + params.idE + "?page=" + value);
        }
        window.location.reload();
    };
    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar filterEvent={randProduct} />
                        <div className="col-lg-9">
                            {load ? (<Loading></Loading>) : (<div className="row">
                                {prods.slice(0, 16).map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard data={data} />

                                    </div>
                                ))}
                                <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" >
                                            <a className="page-link" href="" aria-label="Previous" onClick={previousPage}>
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        {[...Array(numberPages).keys()].map((i) => (
                                            <li key={i} className={"page-item " + (page === i + 1 ? "active" : null)} ><a className="page-link" onClick={() => { handleChange(i + 1) }} onKeyDown={() => { handleChange(i + 1) }} role="button" tabIndex={0}
                                            >{i + 1}</a></li>

                                        ))}

                                        <li className="page-item" >
                                            <a className="page-link" href="" aria-label="Next" onClick={nextPage}>
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
