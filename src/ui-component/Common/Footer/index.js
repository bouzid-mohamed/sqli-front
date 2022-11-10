import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { Rating } from '@mui/material'
import CompanyServices from 'services/companyServices/CompanyServices'



const Footer = () => {
    let load = useSelector((state) => state.products.loadingCategorie)
    let loadingEntreprise = useSelector((state) => state.products.loadingEntreprise)
    let entreprise = useSelector((state) => state.products.entreprise)
    const [value, setValue] = useState(0)

    let categories = [...useSelector((state) => state.products.categories)];

    const [fData, setFData] = useState([])
    const params = useParams()
    const [submitting, setSubmitting] = useState(false)
    let dispatch = useDispatch();


    useEffect(


        () => {
            let cat = []
            let d = []
            categories.filter((c) => {
                if (c.catPere === null) {
                    cat.push({ linkTitle: c.nom, link: '/' + params.idE + "/shop/?page=1&filter=" + c.id },)
                }
            })

            const infos = {
                title: "INFORMATIONS",
                links: [
                    { linkTitle: "Acceuil", link: '/' + params.idE + "/home" },
                    { linkTitle: "Produits", link: '/' + params.idE + "/shop" },
                    { linkTitle: "À PROPOS", link: '/' + params.idE + "/aboutUs" },
                    { linkTitle: "Panier", link: '/' + params.idE + "/cart" },
                    { linkTitle: "Favoris", link: '/' + params.idE + "/wishlist" },
                    { linkTitle: "Comparaison", link: '/' + params.idE + "/compare" }
                ]
            }
            d.push(infos)
            d.push({ title: 'Produits', links: cat })
            setFData(d)
            if (loadingEntreprise === false) {
                setValue(entreprise.note / entreprise.type)
            }
            if (localStorage.getItem('note' + params.idE)) {
                setSubmitting(true)
            }

        }, [load],

    );
    const changeCtegory = () => {
        dispatch({ type: "products/changeCategorie", payload: 1 })
    }
    const handleChangeNote = (newValue) => {
        setValue(newValue);
        CompanyServices.updateNote(newValue, params.idE).then(
            () => {

                Swal.fire({
                    title: 'Succès!',
                    text: 'Merci pour votre évaluation',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                })
                localStorage.setItem('note' + entreprise.id, true);
                setSubmitting(true);
            },


        );
    }

    return (
        <>
            {load ? (null) : (<>  <footer id="footer_one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="footer_left_side">

                                {loadingEntreprise ? (null) : (

                                    entreprise.textAbout?.length > 235 ? (<>  <Link to={'/' + params.idE + "/home"} ><img style={{ maxHeight: '80px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="logo" /></Link><p>{entreprise.textAbout.slice(0, 235)} ....  </p> </>) : (<>  <Link to="/" ><img style={{ maxWidth: '255px' }} src={"http://localhost:8000/uploads/" + entreprise.photo} alt="logo" /></Link><p>{entreprise.textAbout}</p></>)
                                )}


                            </div>
                        </div>
                        {load || fData.length < 0 ? (null) : (<div className="col-lg-3 col-md-6 col-sm-12 col-12">
                            {fData.slice(0, 1).map((data, index) => (
                                <div className="footer_one_widget" key={index}>
                                    <h3>{data.title}</h3>
                                    <ul>
                                        {data.links.map((link, index) => (
                                            <li key={index}><Link onClick={changeCtegory} to={link.link}>{link.linkTitle}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </div>)}

                        {load || fData.length < 2 ? (null) : (<div className="col-lg-2 col-md-6 col-sm-12 col-12">
                            {fData.slice(1, 2).map((data, index) => (
                                <div className="footer_one_widget" key={index}>
                                    <h3>{data.title}</h3>
                                    <ul>
                                        {data.links.map((link, index) => (
                                            <li key={index}><Link onClick={changeCtegory} to={link.link}>{link.linkTitle}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>)}

                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="footer_one_widget">
                                <h3>Évaluez notre entreprise</h3>
                                <div id="mc_embed_signup" className="subscribe-form">
                                    <form onSubmit={(e) => { e.preventDefault(); Swal.fire('Success', 'Thank you for your Subscribtion', 'success'); document.querySelector("input[type='email']").value = "" }}>

                                        <div className="mc-form" >
                                            <Rating name="size-large" precision={0.5} value={value} onChange={(event, newValue) => {
                                                handleChangeNote(newValue);
                                            }} size="large" readOnly={submitting} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="button"
                    tabIndex="0" className="go-top active" onClick={() => { window.scrollTo(0, 0) }} onKeyPress={() => { window.scrollTo(0, 0) }} >
                    <i className="fa fa-chevron-up"></i>
                    <i className="fa fa-arrow-up"></i>
                </div>
            </footer>

                <section id="copyright_one">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="copyright_left">
                                    <h6>© CopyRight 2022 <span> SQLI</span></h6>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </>)}

        </>
    )
}

export default Footer