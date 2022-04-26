import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'ui-component/cards/MainCard';
import commandeServices from 'services/commande-services/CommandeServices';
import { useLocation } from 'react-router';
import Row from './rows/LivreurRows'
import GirdSkeleton from 'ui-component/cards/Skeleton/NormalGirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { Pagination, Stack } from '@mui/material';
import Swal from 'sweetalert2';
import CommandeServices from 'services/commande-services/CommandeServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function CollapsibleTable() {
    const history = createBrowserHistory();
    let query = useQuery();
    const [rows, setRows] = React.useState([]);
    const [numberPages, setNumberPages] = React.useState(0);
    const [isLoading, setIsloading] = React.useState(true);
    const [page, setPage] = React.useState(parseInt(query.get("page")));


    const handleChange = (event, v) => {
        setPage(v);
        const history = createBrowserHistory();
        history.push("/livreur/girdView/commandes?page=" + v);
        window.location.reload();
    };
    React.useEffect(() => {
        commandeServices.getAllRoleLivreur(query.get("page")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);
        })
    }, []);



    // etat commande vers affecterPoste
    const handleFinirCommande = (row) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous voulez modifier l'état de cette commande ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok, Modifier!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsloading(true);
                CommandeServices.finirCommande(row.id).then(() => {
                    CommandeServices.getAllRoleLivreur(query.get("page")).then((res) => {
                        setRows(res.data[0]);
                        setNumberPages(res.data["pagination"])
                        setIsloading(false);
                        toast(" la état du commande du  " + row.client.nom + ' ' + row.client.prenom + " est modifiée");

                    })
                })
            }
        })

    }

    // etat commande vers annulée
    const handleRetourCommande = (row) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous voulez modifier l'état de cette commande ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok, Modifier!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsloading(true);
                CommandeServices.retourCommande(row.id).then(() => {
                    CommandeServices.getAllRoleLivreur(query.get("page")).then((res) => {
                        setRows(res.data[0]);
                        setNumberPages(res.data["pagination"])
                        setIsloading(false);
                        toast(" la état du commande du  " + row.client.nom + ' ' + row.client.prenom + "est modifiée");

                    })
                })
            }
        })

    }





    if (AuthService.getCurrentUser().roles.indexOf("ROLE_LIVREUR") > -1)
        return (
            <MainCard
                title="Liste des Commandes"
                style={{ height: '100%' }}>
                <TableContainer component={Paper}>
                    {isLoading ? (
                        <>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
                                <GirdSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        <>
                            <Table aria-label="collapsible table">
                                <TableHead style={{ backgroundColor: "#5a33aa" }}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell style={{ color: '#ffffff' }}>id</TableCell>
                                        <TableCell style={{ color: '#ffffff' }}>Nom</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Email</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Num tel</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Addresse</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Gouvernerat</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Delegation</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Total</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Statut</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="right">Changer état</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows?.map((row) => (
                                        <Row key={row.id} row={row} handleFinirCommande={handleFinirCommande} handleRetourCommande={() => handleRetourCommande(row)} />
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                    <Stack direction="row-reverse" marginTop={"2%"}>
                        <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
                    </Stack>
                </TableContainer>


                <ToastContainer />


            </MainCard>
        );
    else {
        history.push('/login');
        window.location.reload();
    }

}