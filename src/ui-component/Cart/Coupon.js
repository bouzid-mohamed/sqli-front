import React, { useState } from 'react'
import { useParams } from 'react-router';
import BonServices from 'services/bons-services/BonServices';
import Swal from 'sweetalert2'

const Coupon = (props) => {
    const [bonCode, setBonCode] = useState('');
    const [successCoupon, setSuccessCoupon] = useState(false);
    const param = useParams();
    const [disbutton, setDisbutton] = useState(false)
    const handleChangeBon = (e) => {
        setBonCode(e.target.value)
    }
    const annulerCoupon = () => {
        setDisbutton(true)
        setSuccessCoupon(false)
        localStorage.removeItem('coupon' + param.idE)
        props.handleCoupon(null)
        Swal.fire('Succès', "votre copon à été retiré", 'success')
        setBonCode('')
        setDisbutton(false)
    }
    const couponVerif = () => {
        setDisbutton(true)
        BonServices.verifBon(param.idE, bonCode).then((res) => {
            setSuccessCoupon(true)
            localStorage.setItem('coupon' + param.idE, JSON.stringify({ code: res.data[0].code, reduction: res.data[0].reduction }))
            props.handleCoupon({ code: res.data[0].code, reduction: res.data[0].reduction })
            Swal.fire('Succès', "Code coupon valide ! ", 'success')
            setDisbutton(false)



        }).catch(err => {
            Swal.fire('Erreur!!', 'Code de Coupon Invalide', 'error'); setDisbutton(false)
        })
    }
    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="coupon_code left">
                    <h3>Coupon</h3>
                    <div className="coupon_inner">
                        <p>Entrez votre code promo si vous en avez un.</p>
                        <form onSubmit={(e) => { e.preventDefault(); couponVerif() }}>
                            <input className="mb-2" placeholder="Code coupon" value={bonCode} onChange={handleChangeBon} type="text" disabled={successCoupon} required />
                            <button type="submit" className="theme-btn-one btn-black-overlay btn_sm" style={{ display: successCoupon ? 'none' : '' }} disabled={disbutton}>{disbutton ? ('Chargement...') : ('Appliquer Coupon')}</button>
                            <button className="theme-btn-one btn-black-overlay btn_sm" disabled={disbutton} style={{ display: successCoupon ? '' : 'none' }} onClick={(e) => { e.preventDefault(); annulerCoupon() }}>Annuler le coupon</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coupon