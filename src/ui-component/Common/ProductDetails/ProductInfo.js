import React from 'react'
// import Img
import user1 from '../../../assets/img/user/user1.png'
import user2 from '../../../assets/img/user/user2.png'
import user3 from '../../../assets/img/user/user3.png'

const ReviewData = [
    {
        img: user1,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },
    {
        img: user2,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },
    {
        img: user3,
        name: "Sara Anela",
        date: "5 days ago",
        replay: "Replay",
        report: "Report",
        para: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
        scelerisque Praesent sapien massa, convallis a pellentesque nec,
        egestas non nisi. Cras ultricies ligula sed magna dictum porta.
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
        dui. Vivamus magna justo.`
    },

]

const ProductInfo = (props) => {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="product_details_tabs">
                        <ul className="nav nav-tabs">
                            <li><a data-toggle="tab" className="active">Infos</a></li>

                        </ul>
                        <div className="tab-content">
                            <div id="description" className="tab-pane fade1 in show active">
                                <div className="product_description">
                                    <h5 style={{ marginTop: '1%' }}> Description</h5>
                                    <p>{props.product.description}</p>
                                    <h5 style={{ marginTop: '1%' }}> Stock</h5>

                                    {props.product.stoks.length > 0 ? (props.product.stoks.map((s) => (
                                        <p key={s.id}> taille {s.taille} : {s.quantite + ' pièces'} </p>))


                                    ) : (<p>Non disponible </p>)}



                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo