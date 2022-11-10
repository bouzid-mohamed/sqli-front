import { CardContent, Chip, LinearProgress, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommandeServices from 'services/commande-services/CommandeServices'
import Loading from '../Common/loader'
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CheckIcon from '@mui/icons-material/Check';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';


import { Box } from '@mui/system'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxHeight: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',

};
const Order = () => {

    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    const [open, setOpen] = useState(false);
    const [commande, setCommande] = useState(null);
    const [loadingSingle, setLoadingSingle] = useState(true)
    const [nbrEncour, setNbrEncour] = useState(0);
    const [nbrFinie, setNbrFinie] = useState(0);
    const [nbrTotal, setNbrTotal] = useState(0);
    const [nbrAnnule, setNbrAnnule] = useState(0);

    const handleOpen = (c) => {
        setOpen(true)
        setCommande(c)
        console.log(c.lignesCommandes)
        setLoadingSingle(false)
    }
    const handleClose = () => setOpen(false);
    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }
    useEffect(() => {
        CommandeServices.getCommandeClient(params.idE).then((res) => {
            let nbrCour = 0;
            let nbrT = 0;
            let nbrF = 0;
            let rA = 0;

            setdata(res.data)
            res.data.filter((n) => {
                if (n.status === 'nouvelle') {
                    nbrCour = nbrCour + 1
                    nbrT = nbrT + 1
                } else if (n.status === 'confirmationClient') {
                    nbrCour = nbrCour + 1
                    nbrT = nbrT + 1
                } else if (n.status === 'affectationPoste') {
                    nbrCour = nbrCour + 1
                    nbrT = nbrT + 1
                } else if (n.status === 'confirmationPoste') {
                    nbrCour = nbrCour + 1
                    nbrT = nbrT + 1
                } else if (n.status === 'finie') {

                    nbrF = nbrF + 1
                }
                else if (n.status === 'annulee') {
                    nbrT = nbrT + 1
                    rA = rA + 1

                } else if (n.status === 'retour') {
                    nbrT = nbrT + 1
                    rA = rA + 1

                }
                else if (n.status === 'affecterLivreur') {
                    nbrT = nbrT + 1
                }
            })
            setNbrEncour(nbrCour)
            setNbrTotal(nbrT)
            setNbrFinie(nbrF)
            setNbrAnnule(rA)
            setLoading(false)

        })
    }, [])
    return (
        <>
            {loading ? (<Loading />) : (<>

                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div className="vendor_top_box pt-4">
                            <h2>{nbrTotal}</h2>
                            <h4>Total </h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div className="vendor_top_box pt-4">
                            <h2>{nbrEncour}</h2>
                            <h4>En cours</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div className="vendor_top_box">
                            <h2>{nbrFinie}</h2>
                            <h4>Finie</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div className="vendor_top_box">
                            <h2>{nbrAnnule}</h2>
                            <h4>Annulée/Retour</h4>
                        </div>
                    </div>
                </div>
                <div className="myaccount-content">
                    <h4 className="title">Commandes </h4>
                    <div className="table_page table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Commande</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.createdAt}</td>
                                        <td>{(c.status === 'nouvelle') ? (
                                            <Chip icon={<FiberNewIcon />} label="Nouvelle" color="success" variant="outlined" />
                                        )
                                            : (null)}
                                            {(c.status === 'confirmationClient') ? (
                                                <Chip icon={<CheckIcon />} label="Confirmée par le client" color="primary" variant="outlined" />
                                            )
                                                : (null)}

                                            {(c.status === 'confirmationPoste') ? (
                                                <Chip icon={<AssuredWorkloadIcon />} label="Confirmée par la poste" color="primary" />
                                            )
                                                : (null)}
                                            {(c.status === 'affectationPoste') ? (
                                                <Chip icon={<AssignmentTurnedInIcon />} label="Affectée a la poste" color="success" />
                                            )
                                                : (null)}
                                            {(c.status === 'finie') ? (
                                                <Chip icon={<ThumbUpOffAltIcon />} label="Finie" color="success" />
                                            )
                                                : (null)}
                                            {(c.status === 'annulee') ? (
                                                <Chip icon={<CancelIcon style={{ color: "white" }} />} label="Annulée" style={{ backgroundColor: "red", color: "white" }} />
                                            )
                                                : (null)}

                                            {(c.status === 'affecterLivreur') ? (
                                                <Chip icon={<DeliveryDiningIcon />} label="Affecter à un livreur " color="success" />
                                            )
                                                : (null)}
                                            {(c.status === 'retour') ? (
                                                <Chip icon={<CancelIcon style={{ color: "white" }} />} label="Retour" style={{ backgroundColor: "red", color: "white" }} />
                                            )
                                                : (null)}
                                        </td>
                                        <td>Dt {c.prix}.00 </td>
                                        <td><a href="#" className="view" onClick={() => { handleOpen(c) }}>Consulter</a>   </td>

                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    <ul className="pagination">
                        <li className="page-item" >
                            <a className="page-link" href="#" aria-label="Previous" onClick={prevPage}>
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        {pageNumbers.map((pgNumber) => (
                            <li key={pgNumber} className={"page-item " + (currentPage === pgNumber ? "active" : null)} ><a className="page-link" onClick={() => { setCurrentPage(pgNumber) }} onKeyDown={() => { setCurrentPage(pgNumber) }} role="button" tabIndex={0}
                            >{pgNumber}</a></li>

                        ))}

                        <li className="page-item" >
                            <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Produits achetés
                        </Typography>

                        <CardContent id="modal-modal-description">
                            <div className="vendor_order_boxed pt-4">

                                {loadingSingle ? (<LinearProgress />) : (<table className="table pending_table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Nom produit</th>
                                            <th scope="col">Quantité</th>
                                            <th scope="col">Prix pièce</th>
                                            <th scope="col">Prix total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {commande.lignesCommandes.map((l) => (
                                            <tr key={l.id}>
                                                <td><img width="52px" src={"http://localhost:8000/uploads/" + l.stock.produit.images[0].nom} alt="img" /></td>
                                                <td>{l.stock.produit.nom}</td>
                                                <td> x {l.quantite}</td>
                                                <td>  {l?.stock?.produit.promotion ? (l?.stock?.produit.prix + ' dt') : (Math.trunc(l?.stock?.produit.prix - (l?.stock?.produit.prix * l?.stock?.produit.promotion?.pourcentage / 100)))}</td>
                                                <td>  {l?.stock?.produit.promotion ? (l?.stock?.produit.prix * l?.quantite + ' dt') : (Math.trunc((l?.stock?.produit.prix - (l?.stock?.produit.prix * l?.stock?.produit.promotion?.pourcentage / 100)) * l.quantite) + ' dt')}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>)}
                            </div>
                        </CardContent>

                    </Box>
                </Modal>
            </>)}
        </>
    )
}

export default Order
