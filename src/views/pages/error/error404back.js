
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img404 from '../../../assets/img/Na_Nov_26.jpg'
import MainCard from "ui-component/cards/MainCard";


const Error404 = () => {

    return (
        <MainCard style={{ minHeight: "100%" }}>
            <div style={{ paddingTop: '50px', marginLeft: '25%' }}>
                <img src={img404} alt="img" style={{
                    maxHeight: '400px',
                }} />
                <h2>Lien NON TROUVÉ</h2>
                <h3>Désolé ... Aucun élément trouvé selon votre requête !</h3>
            </div>
        </MainCard>


    )
}

export default Error404