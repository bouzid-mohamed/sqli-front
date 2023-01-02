import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { RatingStar } from "rating-star";
import img from '../../assets/img/common/empty-cart.png'
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Common/loader'

const Compare = () => {
    let products = useSelector((state) => state.products.compare);
    let load = useSelector((state) => state.products.loading)
    const params = useParams()

    let dispatch = useDispatch();
    // Add to cart
    const addToCart = async (id) => {
        dispatch({ type: "products/addToCart", payload: { id } })
        dispatch({ type: "products/delCompare", payload: { id } })
    }
    // del comp
    const delCompare = async (id) => {
        dispatch({ type: "products/delCompare", payload: { id } })
    }
    return (
        <> {products.length ?
            <section id="compare_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="table_desc">
                                <div className="table_page table-responsive compare-table">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="first-column">Produit</td>

                                                {
                                                    products.map((item, index) => (
                                                        <td className="product-image-title" key={index}>
                                                            <Link to={'/' + params.idE + '/product-details/' + item.id}>
                                                                {
                                                                    products.length === 3 ?
                                                                        <img src={item.img} alt="Compare_Product" style={{ height: '43vh' }} />
                                                                        :
                                                                        <img src={item.img} alt="Compare_Product" style={{ height: '70vh' }} />
                                                                }
                                                            </Link>
                                                            <Link to={'/' + params.idE + "/shop?filter=" + item.categorie.id} className="category">{item.categorie.nom}</Link>
                                                            <h5><Link to={'/' + params.idE + '/product-details/' + item.id} className="title">{item.title}</Link></h5>
                                                        </td>
                                                    ))
                                                }

                                            </tr>
                                            <tr>
                                                <td className="first-column">Description</td>
                                                {
                                                    products.map((item, index) => (
                                                        <td className="pro-desc" key={index}>
                                                            <p>{item.description}</p>
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td className="first-column">Prix</td>
                                                {
                                                    products.map((item, index) => (
                                                        <td className="pro-price" key={index}>Dt{item.price}</td>
                                                    ))
                                                }


                                            </tr>
                                            <tr>
                                                <td className="first-column">Couleur</td>
                                                {
                                                    products.map((item, index) => (
                                                        item.stoks.length > 0 ? item.stoks.length === 1 ? (item.stoks.map((stok) => (
                                                            <td className="product-variable-color" key={stok.id}><label htmlFor={stok.id}>
                                                                <span className="product-color-red" style={{ background: stok.couleur }}></span>
                                                            </label>
                                                            </td>
                                                        ))) : ((


                                                            <td className="product-variable-color" >
                                                                {item.stoks.map((stok) => (
                                                                    <label key={stok.id} htmlFor={stok.id}>
                                                                        <span className="product-color-red" style={{ background: stok.couleur }}></span>
                                                                    </label>

                                                                ))}</td>)) : (<td key={item.id} className="product-variable-color" >n'est pas disponible</td>)
                                                    ))
                                                }

                                            </tr>
                                            <tr>
                                                <td className="first-column">Stock</td>
                                                {
                                                    products.map((item, index) => (
                                                        item.stoks.length > 0 ? (

                                                            <td className="pro-stock" key={index}>Disponible</td>) : (<td key={index} className="pro-stock" >N'est pas disponible</td>)
                                                    ))
                                                }

                                            </tr>
                                            <tr>
                                                <td className="first-column">Actions</td>
                                                {
                                                    products.map((item, index) => (
                                                        <td className="pro-addtocart" key={index}><Link to={'/' + params.idE + '/product-details/' + item.id} className="theme-btn-one btn-black-overlay btn_sm"><span>Ajouter au panier</span></Link></td>
                                                    ))
                                                }
                                            </tr>
                                            <tr>
                                                <td className="first-column">Supprimer</td>
                                                {
                                                    products.map((item, index) => (
                                                        <td className="pro-remove" key={index}><button onClick={() => delCompare(item)}><i className="fa fa-trash"></i></button></td>
                                                    ))
                                                }

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :
            <section id="empty_cart_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                            <div className="empaty_cart_area">
                                <img src={img} alt="img" />
                                <h2>PRODUIT NON TROUVÉ</h2>
                                <h3>Désolé ... Aucun article trouvé dans votre liste de comparaison !</h3>
                                <Link to={'/' + params.idE + "/shop"} className="btn btn-black-overlay btn_sm">Continuer vos achats</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        }
        </>

    )
}
export default Compare