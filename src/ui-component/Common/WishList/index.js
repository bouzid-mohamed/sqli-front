import { Link, useParams } from 'react-router-dom'
import Loading from '../loader'
import { useDispatch, useSelector } from "react-redux";
import img from '../../../assets/img/common/empty-cart.png'

const Wishlist = () => {
    let dispatch = useDispatch();
    const params = useParams();
    let favorites = useSelector((state) => state.products.favorites);

    const rmProduct = (id) => {
        dispatch({ type: "products/removeFav", payload: { id } });
    }


    const InStock = (d) => {
        let sum = 0;
        if (d.stoks.length > 0) {
            d.stoks.map((s) => {
                sum = sum + s.quantite
            })
        }
        if (sum > 0) return true
        else return false
    }
    return (
        <>
            {favorites.length
                ?
                <section id="Wishlist_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product_remove">Retirer</th>
                                                    <th className="product_thumb">Image</th>
                                                    <th className="product_name">Produit</th>
                                                    <th className="product-price">Prix</th>
                                                    <th className="product_stock">État des stocks</th>
                                                    <th className="product_addcart">Ajouter au panier</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {favorites.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data)} style={{ 'cursor': 'pointer' }} onKeyPress={() => rmProduct(data)} role="button" tabIndex={0}></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                            <Link to={'/' + params.idE + '/product-details/' + data.id}>
                                                                <img src={data.img} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={'/' + params.idE + '/product-details/' + data.id}>
                                                                {data.title}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price">Dt{data.price}.00</td>
                                                        {InStock(data) ? (<td className="product_stock"><h6>Disponible</h6></td>
                                                        ) : (<td className="product_stock"> <h6 style={{ color: 'red' }}>Non Disponible</h6></td>
                                                        )}
                                                        <td className="product_addcart">
                                                            <Link to={'/' + params.idE + '/product-details/' + data.id} type="button" className="theme-btn-one btn-black-overlay btn_sm" >Ajouter Au panier</Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={img} alt="img" />
                                    <h2>VOTRE LISTE DE FAVORIS EST VIDE</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>

    )
}

export default Wishlist
