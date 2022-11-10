import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../ui-component/Common/loader';
import { useLocation } from 'react-router';
import { createBrowserHistory } from 'history';
import { useParams } from 'react-router';
import ProductServices from 'services/productServices/ProductServices';
import { LinearProgress } from '@mui/material';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LeftSideBar = () => {
    const params = useParams();
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [numberPages, setNumberPages] = useState(1)
    let query = useQuery();
    const [filter, setFilter] = React.useState(query.get("filter") != null ? (query.get("filter")) : []);
    const [searchValue, setSearchValue] = useState(query.get("search") != null ? (query.get("search")) : '');
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [order, setOrder] = React.useState(query.get("order") != null ? (query.get("order")) : 0);
    let allData = [...useSelector((state) => state.products.products)];

    const [prods, setProds] = useState([]);
    const [listproducts, setListproducts] = useState([])
    const [load, setLoad] = useState(true)
    const [reload, setRelaoad] = useState(1);


    useEffect(() => {
        setLoad(true)
        setListproducts([])
        ProductServices.getAllProductEntreprise(params.idE, page, filter, order, searchValue).then((res) => {
            res.data[0].filter((p) => {
                let hov = ''
                let price = 0
                let label = ''
                let im = []
                if (p.images.length > 1)
                    hov = p.images[1].nom
                else hov = p.images[0].nom
                if (p.promotion) {
                    price = Math.trunc(p.prix - (p.prix * p.promotion.pourcentage / 100))
                    label = 'promo' + ' ' + p.promotion.pourcentage + '%'
                }
                else price = p.prix
                p.images.map((i) => {
                    im.push({
                        color: 'red', img: "http://localhost:8000/uploads/" + i.nom, quantity: 1,
                    })
                })

                listproducts.push({
                    id: p.id, labels: label, category: "fashion", img: "http://localhost:8000/uploads/" + p.images[0].nom, hover_img: "http://localhost:8000/uploads/" + hov,
                    title: p.nom,
                    price: price,
                    description: p.description,
                    rating: {
                        rate: 3.9,
                        count: 30
                    },
                    promotion: p.promotion,
                    categorie: p.categorie,
                    stoks: p.stoks,
                    entreprise: p.Entreprise,
                    color: im

                })

            })
            setNumberPages(res.data["pagination"])
            setProds(listproducts)
            setLoad(false)
        })

    }, [reload, page, searchValue])
    const randProduct = (page) => {
        if (page) {
            let data = allData.sort((a, b) => 0.5 - Math.random())
            data = data.slice(0, 9);
            setProducts(data);
            setPage(page);
        }
    }
    const nextPage = () => {
        if (page != numberPages) {
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
            setPage(value);
            const history = createBrowserHistory();
            if (filter.length > 0) {
                history.push('/' + params.idE + "/shop" + "?page=" + value + '&filter=' + filter);
            } else if (query.get('search') != null) {
                history.push('/' + params.idE + "/shop" + "?page=" + value + "&search=" + searchValue);
            }
            else {
                history.push('/' + params.idE + "/shop" + "?page=" + value);
            }
        }
    }
    const previousPage = () => {
        if (page != 1) {
            let value = 1
            if (page <= 1) {
                value = 1
            } else {
                value = page - 1
            }
            setPage(value);

            if (query.get('filter')) {
                var myArray = query.get("filter").split(',');
                myArray.filter((e) => {
                    filter.push(parseInt(e))
                })
            }
            const history = createBrowserHistory();
            if (filter.length > 0) {
                history.push('/' + params.idE + "/shop" + "?page=" + value + '&filter=' + filter);
            } else if (query.get('search') != null) {
                history.push('/' + params.idE + "/shop" + "?page=" + value + "&search=" + searchValue);
            }
            else {
                history.push('/' + params.idE + "/shop" + "?page=" + value);
            }
        }
    }
    const handleChange = (value) => {
        if (page != value) {
            setPage(value);
            if (query.get('filter')) {
                var myArray = query.get("filter").split(',');
                myArray.filter((e) => {
                    filter.push(parseInt(e))
                })
            }
            const history = createBrowserHistory();
            if (filter.length > 0) {
                history.push('/' + params.idE + "/shop" + "?page=" + value + '&filter=' + filter);
            } else if (query.get('search') != null) {
                history.push('/' + params.idE + "/shop" + "?page=" + value + "&search=" + searchValue);
            }
            else {
                history.push('/' + params.idE + "/shop" + "?page=" + value);
            }
        }
    }
    const refrchSearch = (searchVal) => {
        const history = createBrowserHistory();
        history.push('/' + params.idE + "/shop" + "?page=1&search=" + searchVal);
        setSearchValue(searchVal);
    }
    const refrchOrderFilter = (list, price) => {
        setFilter(list)
        setOrder(price)
        let link = price === 0 ? '/' + params.idE + "/shop" + '?page=1&filter=' + list : '/' + params.idE + "/shop" + '?page=1&filter=' + list + '&order=' + price
        const history = createBrowserHistory();
        history.push(link);
        setRelaoad(reload + 1)
        setPage(1)

    }

    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">

                        <SideBar refrchOrderFilter={refrchOrderFilter} refrchSearch={refrchSearch} filterEvent={randProduct} />

                        <div className="col-lg-9">
                            {load ? (<Loading />) : (
                                <div className="row">
                                    {prods.slice(0, 16).map((data, index) => (
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                            <ProductCard data={data} />

                                        </div>
                                    ))}
                                    <div className="col-lg-12">
                                        <ul className="pagination">
                                            <li className="page-item" >
                                                <a className="page-link" aria-label="Previous" onClick={previousPage}>
                                                    <span aria-hidden="true">«</span>
                                                </a>
                                            </li>
                                            {[...Array(numberPages).keys()].map((i) => (
                                                <li key={i} className={"page-item " + (page === i + 1 ? "active" : null)} ><a className="page-link" onClick={() => { handleChange(i + 1) }} onKeyDown={() => { handleChange(i + 1) }} role="button" tabIndex={0}
                                                >{i + 1}</a></li>

                                            ))}

                                            <li className="page-item" >
                                                <a className="page-link" aria-label="Next" onClick={nextPage}>
                                                    <span aria-hidden="true">»</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeftSideBar
