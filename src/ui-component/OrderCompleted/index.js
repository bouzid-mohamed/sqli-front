import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import CommandeServices from 'services/commande-services/CommandeServices';
import Loading from '../Common/loader'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import img404 from '../../assets/img/Na_Nov_26.jpg'

const OrderComplete = () => {
    const history = createBrowserHistory();
    const params = useParams()
    const [loading, setLoading] = useState(true)
    let load = useSelector((state) => state.products.loading)
    const [commande, setCommande] = useState(null)
    const [errorCommande, setErrorCommande] = useState(0)

    useEffect(() => {
        CommandeServices.showOneCommandeClient(params.idE, params.idOrder).then((res) => {
            setCommande(res.data[0])
            setLoading(false)

        }).catch(err => setErrorCommande(1))
    }, [])
    return (
        <>
            {errorCommande === 0 ? (<>
                {load || loading ? (<Loading />) : (<>
                    <section id="order_complet_area" className="ptb-100 ">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    {(commande.status === 'nouvelle') ? (
                                        <div className="text-center order_complete">
                                            <AddShoppingCartRoundedIcon color="success" sx={{ fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande est en cours de préparation par l'entreprise !</h2>
                                            </div>
                                            <p>Nous vous remercions de votre commande ! Votre commande est en cours de traitement et sera finalisée dans un délai de 1 à 7 jours. Vous recevrez un email pour vous informer  l'état de votre commande .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'confirmationClient') ? (
                                        <div className="text-center order_complete">
                                            <CheckRoundedIcon color="success" sx={{ fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande est confirmée par l'entreprise !</h2>
                                            </div>
                                            <p>Nous vous remercions de votre commande ! Votre commande est en cours de traitement et sera finalisée dans un délai de 1 à 7 jours. Vous recevrez un email pour vous informer  l'état de votre commande .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'affectationPoste') ? (
                                        <div className="text-center order_complete">
                                            <StoreRoundedIcon color="success" sx={{ fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande est Affectée à la poste !</h2>
                                            </div>
                                            <p>Nous vous remercions de votre commande ! Votre commande est en cours de traitement et sera finalisée dans un délai de 1 à 7 jours. Vous recevrez un email pour vous informer  l'état de votre commande .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'confirmationPoste') ? (
                                        <div className="text-center order_complete">
                                            <ThumbUpAltRoundedIcon color="success" sx={{ fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande est confirmée par la poste !</h2>
                                            </div>
                                            <p>Nous vous remercions de votre commande ! Votre commande est en cours de traitement et sera finalisée dans un délai de 1 à 7 jours. Vous recevrez un email pour vous informer  l'état de votre commande .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'affecterLivreur') ? (
                                        <div className="text-center order_complete">
                                            <DeliveryDiningIcon color="success" sx={{ fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande est Affectée à un livreur!</h2>
                                            </div>
                                            <p>Nous vous remercions de votre commande ! Votre commande est en cours de traitement et sera finalisée dans un délai de 1 à 7 jours. Vous recevrez un email pour vous informer  l'état de votre commande .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'finie') ? (
                                        <div className="text-center order_complete">
                                            <ThumbUpOffAltIcon color="success" sx={{ fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande est terminée!</h2>
                                            </div>
                                            <p>Merci de faire partie de notre communauté ! .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'retour') ? (
                                        <div className="text-center order_complete">
                                            <CancelIcon sx={{ color: 'red', fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande a été classée comme retour !</h2>
                                            </div>
                                            <p>Merci de faire partie de notre communauté ! .</p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                    {(commande.status === 'annulee') ? (
                                        <div className="text-center order_complete">
                                            <CancelIcon sx={{ color: 'red', fontSize: 70 }} style={{ marginBottom: '30px' }} />
                                            <div className="order_complete_heading">
                                                <h2>votre commande a été annulée !</h2>
                                            </div>
                                            <p>Merci de faire partie de notre communauté ! </p>
                                            <Link to={"/shop/" + params.idE} className="theme-btn-one bg-black btn_sm">Continuer vos achats</Link>
                                        </div>
                                    ) : (null)}
                                </div>
                            </div>
                        </div>
                    </section>
                </>)}

            </>) : (<> <>
                <div className="container ptb-100">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                            <div className="empaty_cart_area">
                                <img src={img404} alt="img" />
                                <h2>Vérifier l id de votre commande</h2>
                                <h3>Désolé ... Aucun élément trouvé selon votre requête !</h3>
                                <Link to={"/my-account/customer-order/" + params.idE} className="btn btn-black-overlay btn_sm">Consulter tout vos commande</Link>
                            </div>
                        </div>
                    </div>
                </div>


            </></>)}
        </>
    )
}
export default OrderComplete
