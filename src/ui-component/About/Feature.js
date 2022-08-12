import { maxHeight } from '@mui/system'
import React, { useEffect } from 'react'
// import img
import img1 from '../../assets/img/icon/2947981.png'
import img2 from '../../assets/img/icon/address--v1.png'
import img3 from '../../assets/img/icon/561127.png'
import img4 from '../../assets/img/icon/4812244.png'


const Feature = (props) => {
    const FeatureData = [
        {
            img: img1,
            title: "Numéro de telephone",
            para: 'Tél: ' + props.user.numTel
        },
        {
            img: img2,
            title: "Addresse",
            para: props.user.gouvernerat + ' / ' + props.user.delegation
        },
        {
            img: img3,
            title: "Email",
            para: props.user.email
        },
        {
            img: img4,
            title: "Entreprise",
            para: props.user.nom
        }
    ]
    return (
        <>
            <section id="service_promo_area" className="ptb-100">
                <div className="container" >
                    <div className="row" >
                        {
                            FeatureData.map((data, index) => (
                                <div className="col-lg-3 col-sm-6 col-12" key={index}>
                                    <div className="service_promo_single_item">
                                        <div className="service_prom_image">
                                            <img src={data.img} alt="img" style={{ 'maxHeight': '100px' }} />
                                        </div>
                                        <div className="service_prom_content">
                                            <h3>{data.title}</h3>
                                            <p>{data.para}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Feature
