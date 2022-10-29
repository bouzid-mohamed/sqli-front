import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import { Divider, InputBase, Pagination } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/NormalGirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import BonServices from 'services/bons-services/BonServices';
import { useLocation } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5a33aa",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function GirdViewBon() {
    let query = useQuery();
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [isLoading, setIsloading] = useState(true);
    const [numberPages, setNumberPages] = useState(0);
    const history = createBrowserHistory();
    const [idDelete, setIdDelete] = useState(0);
    const [searchValue, setSearchValue] = useState(query.get("search") != null ? (query.get("search")) : '');
    const [reload, setRelaoad] = useState(1);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, value) => {
        setPage(value);
        if (searchValue != '') {
            history.push("/girdView/bons?page=" + value + "&search=" + searchValue);
        } else {
            history.push("/girdView/bons?page=" + value);
        }
    };

    const deleteBon = () => {
        setOpen(false);
        setIsloading(true);
        BonServices.deleteBon(idDelete.id).then(() => {
            if (query.get('search') != null) {
                setSearchValue(query.get('search'))
            }
            BonServices.getAll(query.get("page"), query.get("search")).then((res) => {
                setRows(res.data[0]);
                setNumberPages(res.data["pagination"])
                setIsloading(false);
                toast(" Bon " + idDelete.code + " est supprimer avec succès");


            })

        })
    }

    useEffect(() => {
        setIsloading(true);
        BonServices.getAll(page, searchValue).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);

        })

    }, [page, reload]);


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/girdView/bons?page=1&search=" + searchValue);
            setRelaoad(reload + 1)
        }
    }
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (
            <>
                <MainCard title="Liste des Bons">
                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Link to={'/bon/add'} style={{ textDecoration: 'none' }}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        Ajouter</Button>
                                </Link>
                            </Stack>


                        </Stack>
                    </Stack>
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
                                    history.push("/girdView/bons?page=1&search=" + searchValue);
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


                    <TableContainer component={Paper}>
                        {isLoading ? (
                            <>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                                    <GirdSkeleton key={index} />

                                ))}
                            </>
                        ) : (
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Code</StyledTableCell>
                                        <StyledTableCell align="right">Réduction</StyledTableCell>
                                        <StyledTableCell align="right">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id} >
                                            <StyledTableCell >{row.code}</StyledTableCell>
                                            <StyledTableCell align="right">{row.reduction}dt</StyledTableCell>
                                            <StyledTableCell key={Math.floor(Math.random())} align="right" scope="row"  >
                                                <Link to={"/bon/edit/" + row.id} style={{ textDecoration: 'none' }}>
                                                    <IconButton aria-label="edit" size="large" color="success">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton aria-label="delete" size="large" color="error" onClick={() => { setOpen(true); setIdDelete(row) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>


                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {
                            open ? (<div>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Voulez-vous supprimer ce bon"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Let Google help apps determine location. This means sending anonymous
                                            location data to Google, even when no apps are running.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Annuler</Button>
                                        <Button onClick={deleteBon} autoFocus>
                                            Confirmer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>) : (null)}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" page={page} count={numberPages} variant="outlined" onChange={handleChange} />
                        </Stack>
                    </TableContainer>
                    <ToastContainer />
                </MainCard>

            </>

        );
    else {
        history.push('/login');
        window.location.reload();
    }

}
