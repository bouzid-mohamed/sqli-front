import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import logoWhite from '../../../assets/img/logo-white.png'
import NaveItems from './NaveItems'
import TopHeader from './TopHeader'
import { createBrowserHistory } from 'history';
import svg from '../../../assets/img/svg/cancel.svg'
import svgsearch from '../../../assets/img/svg/search.svg'
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import 'font-awesome/css/font-awesome.min.css'
import "../../../assets/css/color.css"
import "../../../assets/css/responsive.css"
import "../../../assets/css/animate.min.css"
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../assets/css/style.css"
import ProductServices from 'services/productServices/ProductServices'
import CategorieServices from 'services/categories-services/CategorieServices'
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = () => {
    let query = useQuery();
    const params = useParams();
    const [click, setClick] = useState(false);
    const [show, setShow] = useState();
    const [show2, setShow2] = useState();

    const history = createBrowserHistory();
    const [listproducts, setListproducts] = useState([])
    const [listCategories, setListCategories] = useState([])
    const [errorPage, setErrorPage] = useState(1)
    const [dataMenu, setDataMenu] = useState([]);
    let carts = useSelector((state) => state.products.carts);
    let favorites = useSelector((state) => state.products.favorites);
    let dispatch = useDispatch();
    const [filter, setFilter] = React.useState([]);
    let loadingEntreprise = useSelector((state) => state.products.loadingEntreprise)
    let entreprise = useSelector((state) => state.products.entreprise)
    const [rechercheValue, setRechercheValue] = useState('');
    const rmCartProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id } });
    }

    const rmFavProduct = (id) => {
        dispatch({ type: "products/removeFav", payload: { id } });
    }

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }

    const handleClick = () => {
        if (click) {
            document.querySelector("#offcanvas1-add-cart").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas1-add-cart").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handleWish = () => {
        if (click) {
            document.querySelector("#offcanvas1-wishlish").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas1-wishlish").style = ("transform: translateX(0);")
        }
        setClick(!click);
    }

    const handleSearch = () => {
        if (click) {
            document.querySelector("#search").style = ("transform: translate(-100%, 0); opacity: 0")
        } else {
            document.querySelector("#search").style = ("transform: translate(0px, 0px); opacity: 1")
        }
        setClick(!click);
    }
    const handleabout = () => {
        if (click) {
            document.querySelector("#offcanvas1-about").style = ("transform: translate(-100%, 0); opacity: 0")
        } else {
            document.querySelector("#offcanvas1-about").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handlemenu = () => {
        if (click) {
            document.querySelector("#mobile-menu-offcanvas1").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#mobile-menu-offcanvas1").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }

    const handleShow = (value) => {
        value === show ? setShow("") : setShow(value)
    }
    const handleShow2 = (value) => {
        value === show2 ? setShow2("") : setShow2(value)
    }

    // Sticky Menu Area query.get("page"), query.getAll("filter"), query.get('order'), query.get('search')
    useEffect(() => {
        ProductServices.getAllProductEntreprise(params.idE, query.get("page"), query.getAll("filter"), query.get('order'), query.get('search')).then((res) => {
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
            if (localStorage.getItem('user') && localStorage.getItem('token')) {
                dispatch({ type: "user/login" })

            }


            dispatch({ type: "products/setNumberPages", payload: res.data["pagination"] })
            dispatch({ type: "products/addProducts", payload: listproducts })

            dispatch({ type: "products/addEntreprise", payload: res.data["entreprise"] })

            if (localStorage.getItem('cart' + params.idE)) {
                var storedcarts = JSON.parse(localStorage.getItem('cart' + params.idE));
                dispatch({ type: "products/initCart", payload: storedcarts })
            }
            if (localStorage.getItem('favorites' + params.idE)) {
                var storedfavs = JSON.parse(localStorage.getItem('favorites' + params.idE));
                dispatch({ type: "products/initFav", payload: storedfavs })
            }
            if (localStorage.getItem('compare' + params.idE)) {
                var storedcomps = JSON.parse(localStorage.getItem('compare' + params.idE));
                dispatch({ type: "products/initCompare", payload: storedcomps })
            }
            setErrorPage(0)

        }).catch(res => {
            if (res.message === 'Request failed with status code 404') setErrorPage(1); dispatch({ type: "products/addError", payload: 1 })
        })

        //debut categories 
        CategorieServices.getAllFront(params.idE).then((res) => {
            let tabItems = []
            let children = []
            let children2 = []
            let mega = false
            setListCategories(res.data)
            res.data.filter((c) => {

                if (c.catFils.length === 0 && c.catPere === null) {
                    children.push({ name: c.nom, href: '/shop/' + params.idE + '?page=1&filter=' + c.id })
                }
                if (c.catFils.length > 0 && c.catPere === null) {
                    mega = true
                    let tabch = []
                    c.catFils.map((f) => {
                        tabch.push({ name: f.nom, href: '/shop/' + params.idE + '?page=1&filter=' + f.id })
                    })
                    let n = { name: c.nom, href: '/shop/' + params.idE + '?page=1&filter=' + c.id, children: tabch }
                    children2.push(n)

                }
            })
            tabItems.push({ name: 'accueil', href: '/home/' + params.idE, children: [] })
            children2.push({ name: 'Autre', href: '#!', children: children })
            tabItems.push({ name: 'Produits', href: '/shop/' + params.idE, mega_menu: mega, children: children2 })
            tabItems.push({ name: 'commandes', href: '/my-account/customer-order/' + params.idE, children: [] })
            tabItems.push({ name: 'à propos', href: '/aboutUs/' + params.idE, children: [] })
            setDataMenu(tabItems)
            dispatch({ type: "products/addCategories", payload: res.data })



        })

        //fin categories 

        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };


    }, []);

    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        if (header != null) {
            scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
        }
    };

    return (
        <>
            {errorPage === 0 && loadingEntreprise === false ? (<>    <TopHeader />
                <header className="header-section d-none d-xl-block">
                    <div className="header-wrapper">
                        <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <div className="header-logo">
                                            <div className="logo">
                                                <Link to={"/home/" + params.idE}><img style={{ maxHeight: '80px', maxWidth: '255px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="logo" /></Link>
                                            </div>
                                        </div>
                                        <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                            <nav>
                                                {dataMenu.length > 0 ? (<ul>
                                                    {dataMenu.map((item, index) => (
                                                        <NaveItems item={item} key={index} />
                                                    ))}
                                                </ul>) : (null)}


                                            </nav>
                                        </div>

                                        <ul className="header-action-link action-color--black action-hover-color--golden">
                                            <li>
                                                {favorites.length
                                                    ? <a href="#offcanvas1-wishlish" className="offcanvas1-toggle" onClick={handleWish}><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                                    : <a href="#offcanvas1-wishlish" className="offcanvas1-toggle"><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                                }
                                            </li>
                                            <li>
                                                {carts.length
                                                    ? <a href="#!" className="offcanvas1-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                                    : <a href="#!" className="offcanvas1-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                                }
                                            </li>
                                            <li>
                                                <a href="#" className="search_width" onClick={handleSearch} >
                                                    <img src={svgsearch} alt="img" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#offcanvas1-about" className="offacnvas offside-about offcanvas1-toggle" onClick={handleabout}>
                                                    <i className="fa fa-bars"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mobile-header sticky-header sticky-color--golden mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center justify-content-between">

                                <div className="mobile-header-left">
                                    <ul className="mobile-menu-logo">
                                        <li>
                                            <Link to={"/home/" + params.idE}>
                                                <div className="logo">
                                                    <img style={{ maxHeight: '80px', maxWidth: '255px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="logo" />
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mobile-right-side">
                                    <ul className="header-action-link action-color--black action-hover-color--golden">
                                        <li>
                                            <a href="#!" className="search_width" onClick={handleSearch}>
                                                <img src={svgsearch} alt="img" />
                                            </a>
                                        </li>
                                        <li>
                                            {favorites.length
                                                ? <a href="#offcanvas1-wishlish" className="offcanvas1-toggle" onClick={handleWish}><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                                : <a href="#offcanvas1-wishlish" className="offcanvas1-toggle"><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                            }
                                        </li>
                                        <li>
                                            {carts.length
                                                ? <a href="#!" className="offcanvas1-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                                : <a href="#!" className="offcanvas1-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                            }
                                        </li>
                                        <li>
                                            <a href="#!" className="offcanvas1-toggle offside-menu" onClick={handlemenu}>
                                                <i className="fa fa-bars"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div id="mobile-menu-offcanvas1" className="offcanvas1 offcanvas1-rightside offcanvas1-mobile-menu-section">

                    <div className="offcanvas1-header text-right">
                        <button className="offcanvas1-close" onClick={handlemenu}>
                            <img src={svg} alt="icon" />
                        </button>
                    </div>
                    <div className="offcanvas1-mobile-menu-wrapper">
                        <div className="mobile-menu-bottom">
                            <div className="offcanvas1-menu">
                                <ul>

                                    <li >
                                        {dataMenu.map((item, index) => (

                                            item.name === 'Produits' ? (
                                                <div style={{ marginTop: '10px' }} key={Math.random().toString(36).substr(2, 9)}><a href={'#'} onClick={() => handleShow(item.name)}><span>{item.name}</span></a>
                                                    {
                                                        show === item.name ?

                                                            item.children.map((c, i1) => (<ul className="mobile-sub-menu" key={Math.random().toString(36).substr(2, 9)}>
                                                                <li  >
                                                                    <a href={'#'} onClick={() => handleShow2(c.name)}>{c.name}</a>
                                                                    {show2 === c.name ? (<ul className="mobile-sub-menu">
                                                                        {c.children.map((f1, i2) => (
                                                                            <li key={Math.random().toString(36).substr(2, 9)}><a href={f1.href}>{f1.name}</a></li>

                                                                        ))}

                                                                    </ul>) : (null)}

                                                                </li>
                                                            </ul>))

                                                            : null
                                                    }</div>

                                            ) : (<div style={{ marginTop: '10px' }} key={Math.random().toString(36).substr(2, 9)}> <a href="#!" onClick={() => handleShow("home")}><span>{item.name}</span></a></div>)


                                        ))}


                                    </li>



                                </ul>
                            </div>

                        </div>
                        <div className="mobile-contact-info">
                            <div className="logo">
                                <Link to={"/home/" + params.idE}><img style={{ maxHeight: '80px', maxWidth: '255px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="img" /></Link>
                            </div>
                            <address className="address">
                                <img style={{ maxHeight: '80px', maxWidth: '255px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="logo" />
                                <span>Addresse: {entreprise.gouvernerat + ' / ' + entreprise.delegation}</span>
                                <span>Appelez-nous : {entreprise.numTel}</span>
                                <span>Email:{entreprise.email}</span>
                            </address>

                            <ul className="user-link">
                                <li><Link to="/wishlist">Favoris</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                                <li><Link to="/checkout">Checkout</Link></li>
                            </ul>
                        </div>

                    </div>

                </div>
                <div id="offcanvas1-about" className="offcanvas1 offcanvas1-rightside offcanvas1-mobile-about-section" >
                    <div className="offcanvas1-header text-right">
                        <button className="offcanvas1-close" onClick={handleabout}>
                            <img src={svg} alt="icon" />
                        </button>
                    </div>
                    <div className="mobile-contact-info">
                        <address className="address">
                            <img style={{ maxHeight: '80px', maxWidth: '255px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="logo" />
                            <span>Addresse: {entreprise.gouvernerat + ' / ' + entreprise.delegation}</span>
                            <span>Appelez-nous : {entreprise.numTel}</span>
                            <span>Email:  {entreprise.email}</span>
                        </address>

                        <ul className="user-link">
                            <li><Link to={"/wishlist/" + params.idE}>Favoris</Link></li>
                            <li><Link to={"/cart/" + params.idE}>Panier</Link></li>
                            <li><Link to={'/compare/' + params.idE}>Comparaison</Link></li>
                        </ul>
                    </div>
                </div>

                <div id="offcanvas1-add-cart" className="offcanvas1 offcanvas1-rightside offcanvas1-add-cart-section">
                    <div className="offcanvas1-header text-right">
                        <button className="offcanvas1-close" onClick={handleClick}>
                            <img src={svg} alt="icon" />
                        </button>
                    </div>
                    <div className="offcanvas1-add-cart-wrapper">
                        <h4 className="offcanvas1-title">Panier</h4>
                        <ul className="offcanvas1-cart">
                            {carts.map((data, index) => (
                                <li className="offcanvas1-wishlist-item-single" key={index}>
                                    <div className="offcanvas1-wishlist-item-block">
                                        <Link to={'/product-details/' + params.idE + '/' + data.id} className="offcanvas1-wishlist-item-image-link" >
                                            <img src={data.img} alt="img"
                                                className="offcanvas1-wishlist-image" />
                                        </Link>
                                        <div className="offcanvas1-wishlist-item-content">
                                            <Link to={'/product-details/' + params.idE + '/' + data.id} className="offcanvas1-wishlist-item-link">{data.title}</Link>
                                            <div className="offcanvas1-wishlist-item-details">
                                                <span className="offcanvas1-wishlist-item-details-quantity">{data.quantity || 1} x
                                                </span>
                                                <span className="offcanvas1-wishlist-item-details-price"> Dt{data.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="offcanvas1-wishlist-item-delete text-right">
                                        <a href="#!" className="offcanvas1-wishlist-item-delete" onClick={() => rmCartProduct(data)}><i className="fa fa-trash"></i></a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="offcanvas1-cart-total-price">
                            <span className="offcanvas1-cart-total-price-text">Total:</span>
                            <span className="offcanvas1-cart-total-price-value">Dt{cartTotal()}.00</span>
                        </div>
                        <ul className="offcanvas1-cart-action-button">
                            <li>
                                <Link to={"/cart/" + params.idE} className="theme-btn-one btn-black-overlay btn_md">Panier</Link>
                            </li>
                            <li>
                                <Link to={"/checkout/" + params.idE} className="theme-btn-one btn-black-overlay btn_md">Vérifier</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="offcanvas1-wishlish" className="offcanvas1 offcanvas1-rightside offcanvas1-add-cart-section">
                    <div className="offcanvas1-header text-right">
                        <button className="offcanvas1-close" onClick={handleWish}>
                            <img src={svg} alt="icon" />
                        </button>
                    </div>
                    <div className="offcanvas1-wishlist-wrapper">
                        <h4 className="offcanvas1-title">Favoris</h4>

                        <ul className="offcanvas1-wishlist">
                            {favorites.map((data, index) => (
                                <li className="offcanvas1-wishlist-item-single" key={index}>
                                    <div className="offcanvas1-wishlist-item-block">
                                        <Link to={'/product-details/' + params.idE + '/' + data.id} className="offcanvas1-wishlist-item-image-link" >
                                            <img src={data.img} alt="img"
                                                className="offcanvas1-wishlist-image" />
                                        </Link>
                                        <div className="offcanvas1-wishlist-item-content">
                                            <Link to={'/product-details/' + params.idE + '/' + data.id} className="offcanvas1-wishlist-item-link">{data.title}</Link>
                                            <div className="offcanvas1-wishlist-item-details">
                                                <span className="offcanvas1-wishlist-item-details-quantity">1 x
                                                </span>
                                                <span className="offcanvas1-wishlist-item-details-price">Dt{data.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="offcanvas1-wishlist-item-delete text-right">
                                        <a href="#!" className="offcanvas1-wishlist-item-delete" onClick={() => rmFavProduct(data)}><i className="fa fa-trash"></i></a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul className="offcanvas1-wishlist-action-button">
                            <li>
                                <Link to={"/wishlist/" + params.idE} className="theme-btn-one btn-black-overlay btn_md">Favoris</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="search" className="search-modal">
                    <button type="button" className="close" onClick={handleSearch}><img src={svg} alt="icon" /></button>
                    <form onSubmit={(e) => {
                        e.preventDefault(); handleSearch(); history.push("/shop/" + params.idE + "?page=1&search=" + rechercheValue);
                        window.location.reload();
                    }}>
                        <input type="search" placeholder="tapez le(s) mot(s) clé(s) ici" value={rechercheValue} onChange={(e) => { setRechercheValue(e.target.value) }} required />
                        <button type="submit" className="btn btn-lg btn-main-search">Chercher</button>
                    </form>
                </div></>) : (null)}

        </>
    )
}

export default Header