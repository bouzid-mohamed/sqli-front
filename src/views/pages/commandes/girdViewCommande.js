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
import Row from './rows/EntrepriseRows'
import GirdSkeleton from 'ui-component/cards/Skeleton/NormalGirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { Divider, IconButton, InputBase, Pagination, Stack } from '@mui/material';
import Swal from 'sweetalert2';
import CommandeServices from 'services/commande-services/CommandeServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';

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
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        if (query.get('search') != null) {
            history.push("/girdView/commandes?page=" + value + "&search=" + searchValue);
        } else {
            history.push("/girdView/commandes?page=" + value);

        }
        window.location.reload();
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/girdView/commandes?page=1&search=" + searchValue);
            window.location.reload();
        }
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    React.useEffect(() => {
        if (query.get('search') != null) {
            setSearchValue(query.get('search'))
        }
        commandeServices.getAll(query.get("page"), query.get("search")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);
        })
    }, []);

    // etat commande vers confirmer
    const handleConfirmation = (row) => {
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
                CommandeServices.ConfirmerCommande(row.id).then(() => {
                    if (query.get('search') != null) {
                        setSearchValue(query.get('search'))
                    }
                    commandeServices.getAll(query.get("page"), query.get("search")).then((res) => {
                        setRows(res.data[0]);
                        setNumberPages(res.data["pagination"])
                        setIsloading(false);
                        toast(" la état du commande du  " + row.client.nom + ' ' + row.client.prenom + " " + "est modifiée");

                    })
                })
            }
        })

    }

    // etat commande vers affecterPoste
    const handleaffecterposte = (row) => {
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
                CommandeServices.AffecterPoste(row.id).then(() => {
                    if (query.get('search') != null) {
                        setSearchValue(query.get('search'))
                    }
                    commandeServices.getAll(query.get("page"), query.get("search")).then((res) => {
                        setRows(res.data[0]);
                        setNumberPages(res.data["pagination"])
                        setIsloading(false);
                        toast(" la état du commande du  " + row.client.nom + ' ' + row.client.prenom + " " + "est modifiée");

                    })
                })
            }
        })

    }

    // etat commande vers annulée
    const handleAnnulee = (row) => {
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
                CommandeServices.Annulee(row.id).then(() => {
                    if (query.get('search') != null) {
                        setSearchValue(query.get('search'))
                    }
                    commandeServices.getAll(query.get("page"), query.get("search")).then((res) => {
                        setRows(res.data[0]);
                        setNumberPages(res.data["pagination"])
                        setIsloading(false);
                        toast(" la état du commande du  " + row.client.nom + ' ' + row.client.prenom + " " + "est modifiée");

                    })
                })
            }
        })

    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (
            <MainCard
                title="Liste des Commandes"
                style={{ height: '100%' }}>
                <TableContainer component={Paper}>
                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}

                    >


                        <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                            <Paper style={{ 'border': "1px solid #5e35b1" }}
                                component="form"
                                sx={{ display: 'flex', alignItems: 'center', width: 400 }}
                            >

                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Rechercher"
                                    inputProps={{
                                        'aria-label': 'Rechercher'
                                    }}
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}


                                />
                                <IconButton onClick={event => window.location.href = "/girdView/commandes?page=1&search=" + searchValue
                                }
                                    aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                            </Paper>
                        </Stack>

                    </Stack>
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
                                        <TableCell style={{ color: '#ffffff' }}>Id</TableCell>

                                        <TableCell style={{ color: '#ffffff' }}>Nom client</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="center">Email</TableCell>
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
                                        <Row key={row.id} row={row} handleaffecterposte={handleaffecterposte} handleConfirmation={handleConfirmation} handleAnnulee={handleAnnulee} />
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
