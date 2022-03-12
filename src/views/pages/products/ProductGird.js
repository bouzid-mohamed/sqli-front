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
import ProductFilterSidebar from 'ui-component/productsListView/ProductFilterSidebar';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ProductSort from 'ui-component/productsListView/ProductSort';
import AddIcon from '@mui/icons-material/Add';
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

function createData(image, nom, prix, categorie, promotion, description) {
    return { image, nom, prix, categorie, promotion, description };
}

const rows = [
    createData('product_1.jpg', 'product 1 ', 11, 'chaussure', '9', 'description'),
    createData('product_2.jpg', 'product 2 ', 11, 'chaussure', '9', 'description'),
    createData('product_3.jpg', 'product 3 ', 11, 'chaussure', '9', 'description'),
    createData('product_4.jpg', 'product 4 ', 11, 'chaussure', '9', 'description'),
    createData('product_5.jpg', 'product 5 ', 11, 'chaussure', '9', 'description'),
    createData('product_6.jpg', 'product 6 ', 11, 'chaussure', '9', 'description'),
    createData('product_7.jpg', 'product 7', 11, 'chaussure', '9', 'description'),
    createData('product_8.jpg', 'product 8', 11, 'chaussure', '9', 'description'),
    createData('product_9.jpg', 'product 9', 11, 'chaussure', '9', 'description'),
    createData('product_10.jpg', 'product 10 ', 11, 'chaussure', '9', 'description'),
];


export default function ProductGird() {
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const [openFilter, setOpenFilter] = useState(false);

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const { resetForm, handleSubmit } = formik;

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        handleSubmit();
        resetForm();
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //setTimeout(() => { setLoading(false); }, 2000);
        setLoading(false);
    }, []);





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
                            <Button variant="outlined" startIcon={<AddIcon />}>
                                Ajouter</Button>
                        </Stack>

                        <ProductFilterSidebar
                            formik={formik}
                            isOpenFilter={openFilter}
                            onResetFilter={handleResetFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                        />
                        <ProductSort />
                    </Stack>
                </Stack>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Image</StyledTableCell>
                                <StyledTableCell align="right">Nom</StyledTableCell>
                                <StyledTableCell align="right">Prix</StyledTableCell>
                                <StyledTableCell align="right">Categorie</StyledTableCell>
                                <StyledTableCell align="right">Promotion</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
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
                                        <StyledTableCell align="right">{row.promotion}%</StyledTableCell>
                                        <StyledTableCell align="right">{row.description}</StyledTableCell>
                                        <StyledTableCell align="right" scope="row"  >
                                            <IconButton aria-label="show" size="large" color="primary" >
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
