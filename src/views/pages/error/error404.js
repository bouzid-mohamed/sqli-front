
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img404 from '../../../assets/img/Na_Nov_26.jpg'
import { Link } from "react-router-dom";


const Error404 = () => {

    return (
        <div className="container ptb-100">
            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                    <div className="empaty_cart_area">
                        <img src={img404} alt="img" />
                        <h2>Lien NON TROUVÉ</h2>
                        <h3>Désolé ... Aucun élément trouvé selon votre requête !</h3>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Error404