import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CommandeServices from 'services/commande-services/CommandeServices';
import Swal from 'sweetalert2';
var data = require('../../data/gouvernerat.json')

const BillingsInfo = (props) => {
    const [dataGouvernerat, setDataGouvernerat] = useState([]);
    const [gouv, setGouv] = useState('');
    const [dataDelegation, setDataDelgation] = useState([]);
    const [delegation, setDelegation] = useState('')
    const [addresse, setAddresse] = useState('')
    const params = useParams()
    const [submitting, setSubmitting] = useState(false)
    let carts = useSelector((state) => state.products.carts);

    const lignesCommande = () => {
        let a = []
        carts.map((c) => {
            a.push({ id: parseInt(c.stokChoisit.id), quantite: parseInt(c.quantity) })
        })
        return a;
    }
    const bon = () => {
        if (localStorage.getItem('coupon' + params.idE)) {
            return parseInt(JSON.parse(localStorage.getItem('coupon' + params.idE)).code)
        } else return ''
    }

    useEffect(() => {

        const gouvs = data.map((g) => {

            if (dataGouvernerat.indexOf(g.gouvernerat) === -1) {
                dataGouvernerat.push(g.gouvernerat)
            }
        });


    }, []);

    const handleSelectGouvernerat = async (e) => {
        const d = [];
        setGouv(e.target.value)
        await (setDataDelgation([]))
        const delegs = data.map((g) => {
            if (g.gouvernerat == e.target.value)
                d.push(g.delegation)
        })
        setDataDelgation(d);
    }
    const handleChangeDelegation = (e) => {
        setDelegation(e.target.value)
    }
    const handleChangeAddresse = (e) => {
        setAddresse(e.target.value)
    }
    const handleSubmit = () => {
        if (lignesCommande().length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'votre panier est vide'
            })

        }
        else if (gouv.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Choisir votre gouvernerat et délégation'
            })
        } else if (delegation.length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Choisir votre  délégation'
            })
        } else {
            Swal.fire({
                title: 'Confirmer commande !!',
                text: "Voulez vous vraiment passer cette commande!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {

                    setSubmitting(true)
                    CommandeServices.addCommande(addresse, gouv, delegation, lignesCommande(), bon()).then(
                        () => {
                            localStorage.removeItem('coupon' + params.idE)
                            setSubmitting(false);
                            Swal.fire({
                                title: 'Bon travail!!',
                                text: "Vous avez passé votre commande avec succès!",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {

                                    const history = createBrowserHistory();
                                    history.push("/my-account/customer-order/" + params.idE);
                                    window.location.reload();
                                } else {
                                    const history = createBrowserHistory();
                                    history.push("/my-account/customer-order/" + params.idE);
                                    window.location.reload();
                                }
                            })

                        },
                        error => {
                            const resMessage = error.message


                            setSubmitting(false);
                        }
                    );
                }
            })

        }



    }
    return (
        <>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="checkout-area-bg bg-white">
                    <div className="check-heading">
                        <h3>Informations du client</h3>
                    </div>
                    <div className="check-out-form">
                        <form method="post" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fname">Nom<span className="text-danger">*</span> </label>
                                        <input type="text" required="" defaultValue={props.user.nom} className="form-control" id="fname"
                                            placeholder="First name" disabled />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lname">Prénom<span className="text-danger">*</span></label>
                                        <input type="text" required="" className="form-control" id="lname"
                                            placeholder="Last name" defaultValue={props.user?.prenom} disabled />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="cname">Email<span className="text-danger">*</span></label>
                                        <input className="form-control" required="" type="text" id="cname"
                                            defaultValue={props.user?.email} disabled />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Num tel <span className="text-danger">*</span></label>
                                        <input className="form-control" required="" type="text" id="email"
                                            defaultValue={props.user?.numTel} disabled />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="city">Gouvernerat/Délégation<span className="text-danger">*</span></label>
                                        <select className="form-control first_null" id="city" onChange={handleSelectGouvernerat} onBlur={handleSelectGouvernerat} value={gouv} required={true}>
                                            <option defaultValue="">Choisir votre gouvernerat...</option>
                                            {dataGouvernerat.map((option) => (
                                                <option key={Math.random().toString(36).substr(2, 9)} value={option} >   {option}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="city">Gouvernerat/Délégation<span className="text-danger">*</span></label>
                                        <select className="form-control first_null" id="city" value={delegation} onChange={handleChangeDelegation} onBlur={handleChangeDelegation} required={true} >
                                            <option defaultValue="">Choisir votre delegation...</option>
                                            {dataDelegation.map((option) => (
                                                <option key={Math.random().toString(36).substr(2, 9)} value={option}>  {option}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="faddress"> Addresse<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="faddress" required={true} minLength="2"
                                            placeholder="Entrer votre addresse ..." value={addresse} onChange={handleChangeAddresse} />
                                    </div>
                                </div>
                                <div className="order_button pt-3">
                                    <button className="theme-btn-one btn-black-overlay btn_sm" type="submit" disabled={submitting}>{submitting ? ('Loading...') : ('Passer Commande')}</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillingsInfo