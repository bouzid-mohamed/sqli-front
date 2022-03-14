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
import VisibilityIcon from '@mui/icons-material/Visibility';
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

function createData(baniere, nom, purcentage, dateDebut, dateFin, description) {
    return { baniere, nom, purcentage, dateDebut, dateFin, description };
}

const rows = [
    createData('product_1.jpg', 'promo 1 ', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_2.jpg', 'promo 2 ', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_3.jpg', 'promo 3 ', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_4.jpg', 'promo 4 ', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_5.jpg', 'promo 5 ', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_6.jpg', 'promo 6 ', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_7.jpg', 'promo 7', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_8.jpg', 'promo 8', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_9.jpg', 'promo 9', 11, '13/03/2022', '9', '13/04/2022'),
    createData('product_10.jpg', 'promo 10 ', 11, '13/03/2022', '9', '13/04/2022'),
];


export default function GirdViewPromotion() {
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };


    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //setTimeout(() => { setLoading(false); }, 2000);
        setLoading(false);
    }, []);





    return (
        <>
            <MainCard title="Liste des promotions">


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Banière</StyledTableCell>
                                <StyledTableCell align="right">Nom</StyledTableCell>
                                <StyledTableCell align="right">Pourcentage</StyledTableCell>
                                <StyledTableCell align="right">Date Début</StyledTableCell>
                                <StyledTableCell align="right">Date Fin</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (<>

                                {isLoading ? (
                                    <GirdSkeleton loading={isLoading}> </GirdSkeleton>
                                ) : (


                                    <StyledTableRow key={row.baniere} >
                                        <StyledTableCell align="right" scope="row">
                                            <Avatar sx={{ width: 150, height: 100 }} src={`${process.env.PUBLIC_URL}/static/mock-images/products/` + row.baniere} variant="square" />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.nom}</StyledTableCell>
                                        <StyledTableCell align="right">{row.pourcentage}dt</StyledTableCell>
                                        <StyledTableCell align="right">{row.dateDebut}</StyledTableCell>
                                        <StyledTableCell align="right">{row.dateFin}%</StyledTableCell>
                                        <StyledTableCell align="right">{row.description}</StyledTableCell>
                                        <StyledTableCell align="right" scope="row"  >
                                            <IconButton aria-label="show" size="large" color="primary" href="/products/show" >
                                                <VisibilityIcon />
                                            </IconButton>
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
}
