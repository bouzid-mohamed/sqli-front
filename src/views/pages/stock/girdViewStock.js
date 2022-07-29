import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
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
import { Divider, InputBase, Pagination, Typography } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/GirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import StockServices from 'services/stock-services/stockServices';
import { useLocation } from 'react-router';
import { Box } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';








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

export default function StockGird() {
    let query = useQuery();
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [isLoading, setIsloading] = useState(true);
    const [numberPages, setNumberPages] = useState(0);
    const [idDelete, setIdDelete] = useState(0);
    const [searchValue, setSearchValue] = useState('');



    const handleClose = () => {
        setOpen(false);
    };

    const history = createBrowserHistory();
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        if (query.get('search') != null) {
            history.push("/girdView/stock?page=" + value + "&search=" + searchValue);
        } else {
            history.push("/girdView/stock?page=" + value);

        }
        window.location.reload();
    };

    const deleteStock = () => {
        setOpen(false);
        setIsloading(true);
        StockServices.deleteStock(idDelete.id).then(() => {
            if (query.get('search') != null) {
                setSearchValue(query.get('search'))
            }

            StockServices.getAll(query.get("page"), query.get("search")).then((res) => {
                setRows(res.data[0]);
                setNumberPages(res.data["pagination"])
                setIsloading(false);
                toast(" stock " + idDelete.taille + " " + idDelete.quantite + " est supprimer avec succès");

            })


        })
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/girdView/stock?page=1&search=" + searchValue);
            window.location.reload();
        }
    }

    useEffect(() => {
        if (query.get('search') != null) {
            setSearchValue(query.get('search'))
        }

        StockServices.getAll(query.get("page"), query.get("search")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);

        })

    }, []);
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (
            <>
                <MainCard title="Liste des produits">

                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Button href={'/stock/add'} variant="outlined" startIcon={<AddIcon />}>
                                    Ajouter</Button>
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
                                <IconButton onClick={event => window.location.href = "/girdView/stock?page=1" + searchValue
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
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
                                    <GirdSkeleton key={index} />

                                ))}

                            </>
                        ) : (
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Image</StyledTableCell>
                                        <StyledTableCell align="right">Nom</StyledTableCell>
                                        <StyledTableCell align="right">Prix</StyledTableCell>
                                        <StyledTableCell align="right">Categorie</StyledTableCell>
                                        <StyledTableCell align="right">Couleur</StyledTableCell>
                                        <StyledTableCell align="right">Taille</StyledTableCell>
                                        <StyledTableCell align="right">Quantité</StyledTableCell>
                                        <StyledTableCell align="right">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id} >
                                            <StyledTableCell align="right" scope="row">
                                                <Avatar sx={{ width: 200, height: 150 }} src={"http://localhost:8000/uploads/" + row.produit?.images[0]?.nom} variant="square" />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.produit?.nom}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Box sx={{ display: 'inline-flex' }} variant="subtitle1">
                                                    {row.produit?.promotion ? (
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.disabled',
                                                                    textDecoration: 'line-through'
                                                                }}
                                                            >
                                                                {row.produit?.prix} dt
                                                            </Typography>
                                                            &nbsp;
                                                            {Math.trunc(row.produit?.prix - (row.produit?.prix * row.produit?.promotion?.pourcentage / 100))} dt
                                                        </>
                                                    ) : (
                                                        <Typography
                                                            component="span"
                                                            variant="body1"
                                                            sx={{
                                                                color: 'text.disabled',
                                                            }}
                                                        >
                                                            {row.produit?.prix} dt

                                                        </Typography>
                                                    )}
                                                </Box>

                                            </StyledTableCell>
                                            <StyledTableCell align="right">    {row.produit?.categorie.nom}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="contained" style={{ "backgroundColor": row.couleur, "color": row.couleur }} >
                                                    .
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.taille}</StyledTableCell>
                                            <StyledTableCell align="right">{row.quantite}</StyledTableCell>

                                            <StyledTableCell align="right" scope="row"  >

                                                <IconButton aria-label="edit" size="large" color="success" href={"/stock/edit/" + row.id}>
                                                    <EditIcon />
                                                </IconButton>
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
                                        {"Voulez-vous supprimer le produit"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Let Google help apps determine location. This means sending anonymous
                                            location data to Google, even when no apps are running.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Annuler</Button>
                                        <Button onClick={deleteStock} autoFocus>
                                            Confirmer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>) : (null)}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
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
