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
import Row from './rows/postrows'
import GirdSkeleton from 'ui-component/cards/Skeleton/NormalGirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { InputBase, Pagination, IconButton, Stack, Divider, } from '@mui/material';
import Swal from 'sweetalert2';
import CommandeServices from 'services/commande-services/CommandeServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import SearchIcon from '@mui/icons-material/Search';
import ConfirmationDialogRaw from './affecterLivreur/ConfirmationDialogRaw';
import NotificationServices from 'services/notification-services/NotificationServices';
import { useSelector } from 'react-redux';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function CollapsibleTable() {
    const history = createBrowserHistory();
    let query = useQuery();
    const [rows, setRows] = React.useState([]);
    const [numberPages, setNumberPages] = React.useState(0);
    const [isLoading, setIsloading] = React.useState(true);
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [openForm, setOpenForm] = React.useState(false);
    const [value, setValue] = React.useState(-1);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [commande, setCommande] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState(query.get("search") != null ? (query.get("search")) : '');
    const [reload, setRelaoad] = React.useState(1);
    let byId = useSelector((state) => state.notifications.byId);


    const handleChange = (event, v) => {
        setPage(v);
        const history = createBrowserHistory();
        if (searchValue != '') {
            history.push("/post/girdView/commandes?page=" + v + "&search=" + searchValue);
        } else {
            history.push("/post/girdView/commandes?page=" + v);


        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/post/girdView/commandes?page=1&search=" + searchValue);
            setRelaoad(reload + 1)
        }
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    React.useEffect(() => {
        setIsloading(true);

        if (query.get("byId")) {
            NotificationServices.showPoste(query.get("byId")).then((res) => {
                setRows(res.data);
                setNumberPages(0)

                setIsloading(false);
            })
        } else {
            commandeServices.getAllRolePoste(page, searchValue).then((res) => {
                setRows(res.data[0]);
                setNumberPages(res.data["pagination"])
                setIsloading(false);
            })
        }

    }, [page, reload, byId]);

    // etat commande vers confirmer
    const handleAffecterLivreur = (row) => {
        setOpenForm(true);
        setCommande(row)
    }

    const handleOk = () => {
        if (value === -1)
            setOpenAlert(true)
        else {
            setOpenForm(false);
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
                    CommandeServices.affecterLivreur(commande.id, value).then(() => {
                        if (query.get('search') != null) {
                            setSearchValue(query.get('search'))
                        }
                        commandeServices.getAllRolePoste(query.get("page"), query.get("search")).then((res) => {
                            setRows(res.data[0]);
                            setNumberPages(res.data["pagination"])
                            setIsloading(false);
                            toast(" la état du commande du  " + commande.client.nom + ' ' + commande.client.prenom + " est modifiée");

                        })
                    })
                }
            })
        }

    };

    // etat commande vers affecterPoste
    const handleConfirmationposte = (row) => {
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
                CommandeServices.ConfirmationPoste(row.id).then(() => {
                    if (query.get('search') != null) {
                        setSearchValue(query.get('search'))
                    }
                    commandeServices.getAllRolePoste(query.get("page"), query.get("search")).then((res) => {
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
                    commandeServices.getAllRolePoste(query.get("page"), query.get("search")).then((res) => {
                        setRows(res.data[0]);
                        setNumberPages(res.data["pagination"])
                        setIsloading(false);
                        toast(" la état du commande du  " + row.client.nom + ' ' + row.client.prenom + "est modifiée");

                    })
                })
            }
        })

    }
    const changeValue = (v) => {
        setValue(v)
    }


    const handleCloseForm = (newValue) => {
        setOpenForm(false);

        if (newValue) {
            setValue(newValue);
        }
    };


    if (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1)
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
                                <IconButton onClick={event => {
                                    window.location.href = "/post/girdView/commandes?page=1&search=" + searchValue;
                                    setRelaoad(reload + 1)

                                }
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
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
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
                                        <TableCell style={{ color: '#ffffff' }}>Nom entreprise</TableCell>
                                        <TableCell style={{ color: '#ffffff' }}>Nom client</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="center">Email client</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="center">Num tel client</TableCell>
                                        <TableCell style={{ color: '#ffffff' }} align="center">Num tel entreprise</TableCell>
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
                                        <Row key={row.id} row={row} handleConfirmationposte={handleConfirmationposte} handleAffecterLivreur={() => handleAffecterLivreur(row)} handleAnnulee={handleAnnulee} />
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                    {numberPages > 0 ? (<Stack direction="row-reverse" marginTop={"2%"}>
                        <Pagination color="primary" page={page} count={numberPages} variant="outlined" onChange={handleChange} />
                    </Stack>) : (null)}

                </TableContainer>
                {openForm ? (<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List component="div" role="group">


                        <ConfirmationDialogRaw

                            id="ringtone-menu"
                            keepMounted
                            commande={commande}
                            open={openForm}
                            onClose={handleCloseForm}
                            value={value}
                            handleOk={handleOk}
                            openAlert={openAlert}
                            setVal={changeValue}
                        />
                    </List>
                </Box>) : (null)}

                <ToastContainer />


            </MainCard>
        );
    else {
        history.push('/login');
        window.location.reload();
    }

}
