import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import ProductServices from 'services/productServices/ProductServices';
import { Navigate, useParams } from 'react-router';

// material-ui
import { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Select,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports import AnimateButton from 'ui-component/extended/AnimateButton';
import MenuItem from '@mui/material/MenuItem';
import StockServices from 'services/stock-services/stockServices';



// assets
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Link } from 'react-router-dom';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function EditStock({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [produitName, setProduitName] = React.useState(0);
    const [message, setMessage] = useState(null);

    const [productsNames, setProductsNames] = useState([]);
    const [strength] = useState(0);
    const [level] = useState();
    const params = useParams();
    const [loadcirular, setLoadcirular] = useState(true);
    const formikRef = React.useRef();
    const [redirect, setRedirect] = useState(false)


    const handleChangeSelect = (event) => {
        const {
            target: { value },
        } = event;
        setProduitName(
            typeof value === 'string' ? value.split(',') : value,
        );


    };
    //ajouter une entreprise 

    const handleSubmit = (values, { setSubmitting }) => {
        StockServices.updateStock(produitName, values.couleur, values.taille, values.quantite, params.id).then(
            () => {

                Swal.fire({
                    title: 'Bon travail!!',
                    text: "Votre stock a été modifié avec succès!",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setRedirect(true)

                    }
                })
                setMessage('');

                setSubmitting(false);
            },
            error => {
                const resMessage = error.message
                setMessage(resMessage);
                setSubmitting(false);
            }
        );
    }

    useEffect(
        () => {
            // Make sure to revoke the data uris to avoid memory leaks
            ProductServices.getAllNoPagination().then((res) => {
                setProductsNames(res.data)
            });
            StockServices.show(params.id).then((res) => {
                setLoadcirular(false);
                if (formikRef.current) {
                    setProduitName(res.data[0].produit.id)
                    formikRef.current.setFieldValue(
                        "couleur",
                        res.data[0].couleur
                    );
                    formikRef.current.setFieldValue(
                        "taille",
                        res.data[0].taille
                    );
                    formikRef.current.setFieldValue(
                        "quantite",
                        res.data[0].quantite
                    );

                }
            })
        }, []
    );
    if (redirect)

        return (<Navigate push to="/girdView/stock" />)

    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (
            loadcirular === true ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <MainCard >

                    <Formik
                        innerRef={formikRef}
                        initialValues={{
                            produit: { produitName },
                            couleur: '',
                            taille: '',
                            quantite: '',
                            submit: null

                        }}
                        validationSchema={Yup.object().shape({
                            couleur: Yup.string().required('Couleur est requis'),
                            quantite: Yup.number().min(0, 'La quantitée doit etre supérieur à 0 ').required('Quantitéest requis'),
                            taille: Yup.string().min(1, 'Taille est requis').required('Taille est requis'),
                        })}
                        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}

                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <Grid container spacing={matchDownSM ? 0 : 2}>


                                </Grid>
                                <FormControl fullWidth error={Boolean(touched.produit && produitName === 0)} sx={{ ...theme.typography.customInput }}>

                                    <Select
                                        id="produitName"
                                        name="produitName"
                                        value={produitName}
                                        onChange={handleChangeSelect}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

                                        MenuProps={MenuProps}

                                    >
                                        {productsNames.map((name) => (
                                            <MenuItem
                                                key={name.id}
                                                value={name.id}
                                            >
                                                {name.nom}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="helpercat">
                                        Sélectionner le produit
                                    </FormHelperText>

                                </FormControl>


                                <FormControl fullWidth error={Boolean(touched.couleur && errors.couleur)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="nom">Couleur</InputLabel>
                                    <OutlinedInput
                                        id="couleur"
                                        type="color"
                                        value={values.couleur}
                                        name="couleur"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.couleur && errors.couleur && (
                                        <FormHelperText error id="standard-weight-helper-text-couleur -register">
                                            {errors.couleur}
                                        </FormHelperText>
                                    )}
                                </FormControl>



                                <FormControl fullWidth error={Boolean(touched.taille && errors.taille)} sx={{ ...theme.typography.customInput }}>
                                    <OutlinedInput

                                        placeholder="taille"

                                        id="taille"
                                        type="text"
                                        value={values.taille}
                                        name="taille"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.taille && errors.taille && (
                                        <FormHelperText error id="standard-weight-helper-text-taille-register">
                                            {errors.taille}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={Boolean(touched.quantite && errors.quantite)} sx={{ ...theme.typography.customInput }}>
                                    <OutlinedInput

                                        placeholder="quantite"

                                        id="quantite"
                                        type="number"
                                        value={values.quantite}
                                        name="quantite"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.quantite && errors.quantite && (
                                        <FormHelperText error id="standard-weight-helper-text-quantite-register">
                                            {errors.quantite}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}
                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Grid container spacing={matchDownSM ? (0) : 2} direction="row-reverse" style={{ "marginTop": 30 }}>

                                    <Grid item xs={12} sm={12} >


                                        <Box sx={{ mt: 2 }}>

                                            {message && (
                                                <Alert severity="error"  >{message}</Alert>

                                            )}
                                        </Box>

                                    </Grid>

                                    <Grid item xs={12} sm={2} >

                                        <Link to={"/girdView/stock?page=1"} style={{ textDecoration: 'none' }}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    color="secondary"
                                                    variant="outlined"
                                                >
                                                    Annuler
                                                </Button>
                                            </AnimateButton>
                                        </Link>



                                    </Grid>
                                    <Grid item xs={12} sm={2} >
                                        <AnimateButton>
                                            <LoadingButton
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                color="primary"
                                                loading={isSubmitting}
                                                variant="contained"
                                            >
                                                Modifier
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </MainCard >));
    else {
        history.push('/login');
        window.location.reload();
    }




};

//export default listViewProducts;