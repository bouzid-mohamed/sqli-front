import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import AuthService from 'services/auth-services/AuthService'
import Loading from '../Common/loader'

const AccountDetails = () => {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    let load = useSelector((state) => state.products.loading)

    useEffect(() => {
        AuthService.show().then((res) => {
            setUser(res.data);

            setLoading(false);
        })
    }, [])

    return (
        <>
            {load || loading ? (<Loading />) : (<>
                <div className="myaccount-content">
                    <div className="save_button mt-3 d-flex align-items-center justify-content-between">
                        <h4 className="title">Détails du compte</h4>
                        <Link to={"/account-edit/" + params.idE} className="theme-btn-one bg-black btn_sm">Modifier le compte</Link>
                    </div>
                    <div className="login_form_container">
                        <div className="account_details_form">
                            <form action="#">
                                <div className="img_profiles">
                                    <img src={"http://localhost:8000/uploads/" + user?.photo} alt="img" />
                                </div>

                                <div className="default-form-box mb-20">
                                    <label>Nom</label>
                                    <input type="text" name="first-name" className="form-control" defaultValue={user.nom}
                                        readOnly />
                                </div>
                                <div className="default-form-box mb-20">
                                    <label>Prénom</label>
                                    <input type="text" name="last-name" className="form-control" defaultValue={user.prenom}
                                        readOnly />
                                </div>
                                <div className="default-form-box mb-20">
                                    <label>Num Tel</label>
                                    <input type="text" name="tel" className="form-control" defaultValue={user.numTel}
                                        readOnly />
                                </div>
                                <div className="default-form-box mb-20">
                                    <label>Email</label>
                                    <input type="text" name="email-name" defaultValue={user.email}
                                        className="form-control" readOnly />
                                </div>
                                <div className="default-form-box mb-20">
                                    <label>Mot de passe</label>
                                    <input type="password" name="user-password" defaultValue="123456789"
                                        className="form-control" readOnly />
                                </div>


                                <br />

                                <br />

                            </form>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default AccountDetails
