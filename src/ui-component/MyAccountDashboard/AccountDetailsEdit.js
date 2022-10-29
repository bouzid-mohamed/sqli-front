import { Alert, Checkbox, FormControlLabel } from '@mui/material';
import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import AuthService from 'services/auth-services/AuthService';
import ClientServices from 'services/user-services/ClientServices';
import Swal from 'sweetalert2';
import Loading from '../Common/loader'


const AccountDetailsEdit = () => {
    const params = useParams()
    const history = createBrowserHistory();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [numTel, setNumTel] = useState('')
    let load = useSelector((state) => state.products.loading)
    const [img, setImg] = useState();
    const [file, setFile] = useState([]);
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [showPasswordEdit, setShowPasswordEdit] = useState(false);
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')


    useEffect(() => {
        AuthService.show().then((res) => {
            setUser(res.data);
            setImg('http://localhost:8000/uploads/' + res.data.photo)
            setNom(res.data.nom)
            setPrenom(res.data.prenom)
            setNumTel(res.data.numTel)
            setEmail(res.data.email)
            setLoading(false);
        })
    }, [])


    const onImageChange = (e) => {
        const [file] = e.target.files;
        setFile([file])
        setImg(URL.createObjectURL(file));
    };

    const handleChangeNom = (e) => {
        setNom(e.target.value)
    }
    const handleChangePrenom = (e) => {
        setPrenom(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeNumTel = (e) => {
        setNumTel(e.target.value)
    }


    const handleShowPassword = (event) => {

        setShowPasswordEdit(event.target.checked);
        if (event.target.checked === false) {
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);

    }
    const handleChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value);

    }
    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);

    }
    const handleSubmit = () => {
        let formData = new FormData()

        if (file[0] != null) {
            //   let formData = new FormData()
            const fileObjects = file.map(file => {
                formData.append('assets[]', file, file.name)
            })
        }
        if (newPassword != confirmNewPassword) {
            setMessage('Confirmer votre nouveau mot de passe ')
        } else {

            setSubmitting(true)
            if (user.password === null)
                setPassword(null)
            ClientServices.updateClient(nom, prenom, email, numTel, newPassword, password, formData, user.id).then(
                (res) => {

                    Swal.fire({
                        title: 'Bon travail!!',
                        text: "Votre compte a été modifié avec succès!",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const history = createBrowserHistory();
                            history.push("/my-account/customer-account-details/" + params.idE);
                            window.location.reload();
                        }
                    })
                    setMessage('');
                    localStorage.setItem('user', JSON.stringify({ nom: res.nom, prenom: res.prenom, photo: res.photo, email: res.email, numTel: res.numTel }))
                    setSubmitting(false);
                },
                error => {
                    const resMessage = 'Mot de passe incorrect'
                    setMessage(resMessage);
                    setSubmitting(false);
                }
            );
        }
    }


    return (

        <>
            {loading ? (<Loading />) : (<>
                <section id="account_edit" className="pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="back_btn">
                                    <Link to={"/my-account/customer-account-details/" + params.idE} ><i className="fa fa-arrow-left"></i>Retour</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="account_thumd">
                                    <div className="account_thumb_img">
                                        <img src={user?.photo?.startsWith('https://') ? user?.photo : img} alt="img" />
                                        <div className="fixed_icon"><input type="file" onChange={onImageChange} accept="image/png, image/gif, image/jpeg" /><i className="fa fa-camera"></i></div>
                                    </div>
                                    <h4>{user.nom}  {user.prenom} </h4>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="account_setting">
                                    <div className="account_setting_heading">
                                        <h2>Détails du compte</h2>
                                        <p>Modifiez les paramètres de votre compte et changez votre mot de passe ici.</p>
                                    </div>
                                    <form id="account_info_form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>

                                        <div className="form-group">
                                            <label htmlFor="f_name" >Nom*</label>
                                            <input minlength="2" type="text" className="form-control" id="f_name" value={nom} onChange={handleChangeNom} placeholder="Nom" required />
                                            <label htmlFor="f_prenom">Prenom*</label>
                                            <input type="text" className="form-control" minlength="2" id="f_prenom" value={prenom} onChange={handleChangePrenom} placeholder="Prenom" required />
                                            <label htmlFor="email_address">Adresse email*</label>
                                            <input type="email" className="form-control" id="email_address" value={email} onChange={handleChangeEmail} placeholder="Email" required />
                                            <label htmlFor="f_numTel" >Numtel*</label>
                                            <input type="number" className="form-control" id="f_numTel" min='10000000' max='99999999' value={numTel} onChange={handleChangeNumTel} placeholder="NumTel" required />
                                        </div>
                                        <div className="input-radio">
                                            <span className="custom-radio">  <FormControlLabel control={<Checkbox checked={showPasswordEdit} onChange={handleShowPassword} />} label="Modifier votre mot de passe" /></span>
                                        </div>
                                        {showPasswordEdit ? (

                                            <div className="form-group">
                                                {user.password === null ? (null) : (<> <label htmlFor="current_password">Mot de passe actuel</label>
                                                    <input type="password" className="form-control" id="current_password" value={password} onChange={handleChangePassword}
                                                        placeholder="mot de passe " required={user.password === null ? false : true} /></>)}

                                                <label htmlFor="new_password">Nouveau mot de passe</label>
                                                <input type="password" className="form-control" id="new_password" value={newPassword} onChange={handleChangeNewPassword}
                                                    placeholder="Nouveau mot de passe" required />
                                                <label htmlFor="re_password">Confirmer votre nouveau mot de passe</label>
                                                <input type="password" className="form-control" id="re_password" value={confirmNewPassword} onChange={handleChangeConfirmNewPassword}
                                                    placeholder="Re-tapez votre nouveau mot de passe" required />
                                            </div>
                                        ) : (null)}
                                        {message && (
                                            <Alert severity="error"  >{message}</Alert>

                                        )}
                                        <button className="theme-btn-one btn-black-overlay btn_sm" type="submit" disabled={submitting}>{submitting ? ('Loading...') : ('Modifier les informations')}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>)}
        </>
    )
}

export default AccountDetailsEdit
