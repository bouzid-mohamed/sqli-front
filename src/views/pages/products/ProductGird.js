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
import { Divider, InputBase, Pagination, TextField, Typography } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/GirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import ProductServices from 'services/productServices/ProductServices';
import { useLocation } from 'react-router';
import { Box } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import ReactImageZoom from 'react-image-zoom';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";





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





export default function ProductGird() {
    const history = createBrowserHistory();

    const [open, setOpen] = React.useState(false);
    let query = useQuery();
    const [listproducts, setListProducts] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [isLoading, setLoading] = useState(true);
    const [idDelete, setIdDelete] = useState(0);
    const [filter, setFilter] = React.useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (event, value) => {
        if (query.get('filter')) {
            var myArray = query.get("filter").split(',');
            myArray.filter((e) => {
                filter.push(parseInt(e))
            })
        }
        const history = createBrowserHistory();
        if (filter[0] != null) {
            history.push("/tableView/products?page=" + value + '&filter=' + filter);
        } else if (query.get('search') != null) {
            history.push("/tableView/products?page=" + value + "&search=" + searchValue);
        }
        else {
            history.push("/tableView/products?page=" + value);
        }
        window.location.reload();
    };
    useEffect(
        () => {

            if (query.get('search') != null) {
                setSearchValue(query.get('search'))
            }
            ProductServices.getAll(query.get("page"), query.getAll("filter"), query.get('order'), query.get('search')).then((res) => {
                setListProducts(res.data[0]);
                setNumberPages(res.data["pagination"])
                setLoading(false)

            })
        }, [],
    );

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
    const deleteProduct = () => {
        setOpen(false);
        setLoading(true);
        ProductServices.deleteProduit(idDelete.id).then(() => {
            ProductServices.getAll(query.get("page")).then((res) => {

                setListProducts(res.data[0]);
                setNumberPages(res.data["pagination"])
                setLoading(false);
                toast(idDelete.nom + " est supprimer avec succès");
            });


        })
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/tableView/products?page=1&search=" + searchValue);
            window.location.reload();
        }
    }


    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (
            <>
                <MainCard title="Liste des produits" style={{ "height": "100%" }} >
                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Button href={'/products/add'} variant="outlined" startIcon={<AddIcon />}>
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

                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 2 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
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
                                <IconButton onClick={event => window.location.href = "/tableView/products?page=1&search=" + searchValue}

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
                                        <StyledTableCell align="left">Image</StyledTableCell>
                                        <StyledTableCell align="right">Nom</StyledTableCell>
                                        <StyledTableCell align="right">Prix</StyledTableCell>
                                        <StyledTableCell align="right">Categorie</StyledTableCell>
                                        <StyledTableCell align="right">Promotion</StyledTableCell>
                                        <StyledTableCell align="right">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>



                                <TableBody>



                                    <>
                                        {listproducts?.map((product, index) => (

                                            <StyledTableRow key={index} >
                                                <StyledTableCell align="left" scope="row">

                                                    <ReactImageZoom
                                                        style={{ zIndex: '50' }}
                                                        width={200}
                                                        height={150}
                                                        scale={2}
                                                        img={"http://localhost:8000/uploads/" + product.images[0].nom}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{product.nom}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Box sx={{ display: 'inline-flex' }} variant="subtitle1">
                                                        {product.promotion ? (
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    sx={{
                                                                        color: 'text.disabled',
                                                                        textDecoration: 'line-through'
                                                                    }}
                                                                >
                                                                    {product.prix} dt



                                                                </Typography>
                                                                &nbsp;
                                                                {Math.trunc(product.prix - (product.prix * product.promotion.pourcentage / 100))} dt
                                                            </>
                                                        ) : (
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.disabled',
                                                                }}
                                                            >
                                                                {product.prix} dt

                                                            </Typography>
                                                        )}
                                                    </Box></StyledTableCell>
                                                <StyledTableCell align="right">{product.categorie.nom}</StyledTableCell>
                                                {product.promotion != null ? (
                                                    <StyledTableCell align="right">{product.promotion?.pourcentage} %</StyledTableCell>

                                                ) : (<StyledTableCell align="right">Produit non soldés</StyledTableCell>
                                                )}
                                                <StyledTableCell align="right" scope="row"  >
                                                    <IconButton aria-label="show" size="large" color="primary" href={"/products/show/" + product.id} >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="edit" size="large" color="success" href={"/products/edit/" + product.id}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" size="large" color="error" onClick={() => { setOpen(true); setIdDelete(product) }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </StyledTableCell>
                                            </StyledTableRow>




                                        ))}
                                    </>
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
                                        <Button onClick={deleteProduct} autoFocus>
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
