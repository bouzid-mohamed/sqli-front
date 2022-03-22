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
import { Pagination } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/GirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';






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

function createData(image, nom, prix, categorie, couleur, taille, quantite) {
    return { image, nom, prix, categorie, couleur, taille, quantite };
}

const rows = [
    createData('product_1.jpg', 'product 1 ', 11, 'cat1', '#D5DBDB', 'S', 10),
    createData('product_2.jpg', 'product 2 ', 11, 'cat2', '#D5F5E3', 'M', 11),
    createData('product_3.jpg', 'product 3 ', 11, 'cat1', '#ABEBC6', 'XXL', 12),
    createData('product_4.jpg', 'product 4 ', 11, 'cat1', '#6C3483', 'L', 17),
    createData('product_5.jpg', 'product 5 ', 11, 'cat2', '#212F3C', 'XS', 19),
    createData('product_6.jpg', 'product 6 ', 11, 'cat2', '#424949', 'S', 33),
    createData('product_7.jpg', 'product 7', 11, 'cat2', '#A04000', 'M', 5),
    createData('product_8.jpg', 'product 8', 11, 'cat3', '#6C3483', 'XXL', 30),
    createData('product_9.jpg', 'product 9', 11, 'cat4', '#D5DBDB', 'XL', 2),
    createData('product_10.jpg', 'product 10 ', 11, 'cat5', '#424949', 'L', 70),
];


export default function StockGird() {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const history = createBrowserHistory();

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //setTimeout(() => { setLoading(false); }, 2000);
        setLoading(false);
    }, []);
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (
            <>
                <MainCard title="Liste des produits">


                    <TableContainer component={Paper}>
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
                                {rows.map((row) => (<>

                                    {isLoading ? (
                                        <GirdSkeleton loading={isLoading}> </GirdSkeleton>
                                    ) : (


                                        <StyledTableRow key={row.nom} >
                                            <StyledTableCell align="right" scope="row">
                                                <Avatar sx={{ width: 150, height: 100 }} src={`${process.env.PUBLIC_URL}/static/mock-images/products/` + row.image} variant="square" />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.nom}</StyledTableCell>
                                            <StyledTableCell align="right">{row.prix}dt</StyledTableCell>
                                            <StyledTableCell align="right">{row.categorie}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant="contained" style={{ "backgroundColor": row.couleur, "color": row.couleur }} >
                                                    .
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.taille}</StyledTableCell>
                                            <StyledTableCell align="right">{row.quantite}</StyledTableCell>

                                            <StyledTableCell align="right" scope="row"  >

                                                <IconButton aria-label="edit" size="large" color="success">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="large" color="error" onClick={() => { setOpen(true) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    )}
                                </>
                                ))}
                            </TableBody>
                        </Table>
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
                                        <Button onClick={handleClose} autoFocus>
                                            Confirmer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>) : (null)}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" count={10} variant="outlined" />
                        </Stack>
                    </TableContainer>
                </MainCard>

            </>

        );
    else {
        history.push('/login');
        window.location.reload();
    }

}
