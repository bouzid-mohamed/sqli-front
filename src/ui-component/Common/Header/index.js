import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.png'
import logoWhite from '../../../assets/img/logo-white.png'
import { MenuData } from './MenuData'
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = () => {
    let query = useQuery();
    const params = useParams();
    const [click, setClick] = useState(false);
    const [show, setShow] = useState();
    const history = createBrowserHistory();
    const [listproducts, setListproducts] = useState([])
    let carts = useSelector((state) => state.products.carts);
    let favorites = useSelector((state) => state.products.favorites);
    let dispatch = useDispatch();
    const [filter, setFilter] = React.useState([]);

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

    // Sticky Menu Area
    useEffect(() => {
        ProductServices.getAllProductEntreprise(params.idE, query.get("page"), filter, null, null).then((res) => {
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
                    color:
                        im

                })

            })
            dispatch({ type: "products/setNumberPages", payload: res.data["pagination"] })
            dispatch({ type: "products/addProducts", payload: listproducts })

            if (localStorage.getItem('cart' + params.idE)) {
                var storedcarts = JSON.parse(localStorage.getItem('cart' + params.idE));
                dispatch({ type: "products/initCart", payload: storedcarts })
            }
            if (localStorage.getItem('favorites' + params.idE)) {
                var storedfavs = JSON.parse(localStorage.getItem('favorites' + params.idE));
                dispatch({ type: "products/initFav", payload: storedfavs })
            }

        })

        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };


    }, []);

    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    return (
        <>
            <TopHeader />
            <header className="header-section d-none d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">
                                    <div className="header-logo">
                                        <div className="logo">
                                            <Link to="/"><img src={logo} alt="logo" /></Link>
                                        </div>
                                    </div>
                                    <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {MenuData.map((item, index) => (
                                                    <NaveItems item={item} key={index} />
                                                ))}
                                            </ul>
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
                                            <a href="#search" className="search_width" onClick={handleSearch} >
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
                                        <Link to="/">
                                            <div className="logo">
                                                <img src={logo} alt="logo" />
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
                                <li>
                                    <a href="#!" onClick={() => handleShow("home")}><span>Home</span></a>
                                    {
                                        show === "home" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/">Fashion</Link></li>
                                                <li><Link to="/furniture">Furniture</Link></li>
                                                <li><Link to="/electronics">Electronics</Link></li>
                                            </ul> : null
                                    }

                                </li>
                                <li >
                                    <a href="#!" onClick={() => handleShow("shop")}><span>Shop</span></a>
                                    {
                                        show === "shop" ? <>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Shop Layout</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/shop">Shop Four Grid</Link></li>
                                                        <li><Link to="/shopTwo">Shop Three Grid</Link></li>
                                                        <li><Link to="/shoplist">Shop List View</Link></li>
                                                        <li><Link to="/shop-left-bar">Shop Left Sidebar</Link></li>
                                                        <li><Link to="/shop-right-bar">Shop Right Sidebar</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Shop Pages</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/cart">Cart View One</Link></li>
                                                        <li><Link to="/cartTwo">Cart View Two </Link></li>
                                                        <li><Link to="/empty-cart">Empty Cart</Link></li>
                                                        <li><Link to="/checkout">Checkout View One</Link></li>
                                                        <li><Link to="/checkout">Checkout View Two</Link></li>
                                                        <li><Link to="/wishlist">Wishlist</Link></li>
                                                        <li><Link to="/compare">Compare</Link></li>
                                                        <li><Link to="/order-tracking">Order Tracking</Link></li>
                                                        <li><Link to="/order-complete">Order Complete</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Product Single</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/product-details/1">Product Single</Link></li>
                                                        <li><Link to="/product-details/1">Product Single Two</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </> : null
                                    }

                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("feature")}><span>Feature</span></a>
                                    {
                                        show === "feature" ?

                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/product-hover">Product Hover</Link></li>
                                                <li><Link to="/order-success">Order Success</Link></li>
                                                <li><Link to="/email-template-one">Email Template 1</Link></li>
                                                <li><Link to="/email-template-two">Email Template 2</Link></li>
                                                <li><Link to="/email-template-three">Email Template 3</Link></li>
                                                <li><Link to="/lookbooks">LookBook</Link></li>
                                                <li><Link to="/invoice-one">Invoice 1</Link></li>
                                                <li><Link to="/invoice-two">Invoice 2</Link></li>
                                            </ul>

                                            : null
                                    }
                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("blogs")}><span>Blogs</span></a>
                                    {
                                        show === "blogs" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/blog-grid-three">Blog Grid View One</Link></li>
                                                <li><Link to="/blog-grid-two">Blog Grid View Two</Link></li>
                                                <li><Link to="/blog-list-view">Blog List View</Link></li>
                                                <li><Link to="/blog-single-one">Blog Single View One </Link></li>
                                                <li><Link to="/blog-single-two">Blog Single View TWo</Link></li>
                                            </ul>
                                            : null
                                    }
                                </li>
                                <li>
                                    <a href="#!" onClick={() => handleShow("pages")}><span>Pages</span></a>

                                    {
                                        show === "pages" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/about">About Us</Link></li>
                                                <li><Link to="/vendor-dashboard">Vendor</Link></li>
                                                <li><Link to="/my-account">My Account</Link></li>
                                                <li><Link to="/contact-one">Contact Us One</Link></li>
                                                <li><Link to="/contact-two">Contact Us Two</Link></li>
                                                <li><Link to="/coming-soon">Coming Soon</Link></li>
                                                <li><Link to="/faqs">Frequently Questions</Link></li>
                                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                                <li><Link to="/error">404 Page</Link></li>
                                                <li><Link to="/login">Login</Link></li>
                                            </ul>
                                            : null
                                    }
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="mobile-contact-info">
                        <div className="logo">
                            <Link to="/"><img src={logoWhite} alt="img" /></Link>
                        </div>
                        <address className="address">
                            <span>Address: Your address goes here.</span>
                            <span>Call Us: 0123456789, 0123456789</span>
                            <span>Email: demo@example.com</span>
                        </address>
                        <ul className="social-link">
                            <li>
                                <a href="#!"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-linkedin"></i></a>
                            </li>
                        </ul>
                        <ul className="user-link">
                            <li><Link to="/wishlist">Wishlist</Link></li>
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
                        <img src={logoWhite} alt="logo" />
                        <span>Address: Your address goes here.</span>
                        <span>Call Us: 0123456789, 0123456789</span>
                        <span>Email: demo@example.com</span>
                    </address>
                    <ul className="social-link">
                        <li>
                            <a href="#!"><i className="fa fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                    <ul className="user-link">
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/checkout">Checkout</Link></li>
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
                    <h4 className="offcanvas1-title">Shopping Cart</h4>
                    <ul className="offcanvas1-cart">
                        {carts.map((data, index) => (
                            <li className="offcanvas1-wishlist-item-single" key={index}>
                                <div className="offcanvas1-wishlist-item-block">
                                    <Link to={`/product-details/${data.id}`} className="offcanvas1-wishlist-item-image-link" >
                                        <img src={data.img} alt="img"
                                            className="offcanvas1-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas1-wishlist-item-content">
                                        <Link to={`/product-details/${data.id}`} className="offcanvas1-wishlist-item-link">{data.title}</Link>
                                        <div className="offcanvas1-wishlist-item-details">
                                            <span className="offcanvas1-wishlist-item-details-quantity">{data.quantity || 1} x
                                            </span>
                                            <span className="offcanvas1-wishlist-item-details-price"> ${data.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas1-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas1-wishlist-item-delete" onClick={() => rmCartProduct(data.id)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="offcanvas1-cart-total-price">
                        <span className="offcanvas1-cart-total-price-text">Subtotal:</span>
                        <span className="offcanvas1-cart-total-price-value">${cartTotal()}.00</span>
                    </div>
                    <ul className="offcanvas1-cart-action-button">
                        <li>
                            <Link to="/cart" className="theme-btn-one btn-black-overlay btn_md">View Cart</Link>
                        </li>
                        <li>
                            <Link to="/checkout" className="theme-btn-one btn-black-overlay btn_md">Checkout</Link>
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
                    <h4 className="offcanvas1-title">Wishlist</h4>

                    <ul className="offcanvas1-wishlist">
                        {favorites.map((data, index) => (
                            <li className="offcanvas1-wishlist-item-single" key={index}>
                                <div className="offcanvas1-wishlist-item-block">
                                    <Link to={`/product-details/${data.id}`} className="offcanvas1-wishlist-item-image-link" >
                                        <img src={data.img} alt="img"
                                            className="offcanvas1-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas1-wishlist-item-content">
                                        <Link to={`/product-details/${data.id}`} className="offcanvas1-wishlist-item-link">{data.title}</Link>
                                        <div className="offcanvas1-wishlist-item-details">
                                            <span className="offcanvas1-wishlist-item-details-quantity">1 x
                                            </span>
                                            <span className="offcanvas1-wishlist-item-details-price">{data.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas1-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas1-wishlist-item-delete" onClick={() => rmFavProduct(data.id)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="offcanvas1-wishlist-action-button">
                        <li>
                            <Link to="/wishlist" className="theme-btn-one btn-black-overlay btn_md">View wishlist</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="search" className="search-modal">
                <button type="button" className="close" onClick={handleSearch}><img src={svg} alt="icon" /></button>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); Swal.fire('Success', 'Check out the Results', 'success'); history.push('/shop') }}>
                    <input type="search" placeholder="type keyword(s) here" required />
                    <button type="submit" className="btn btn-lg btn-main-search">Search</button>
                </form>
            </div>
        </>
    )
}

export default Header