// material-ui

import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';


// material-ui
import { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
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

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import MenuItem from '@mui/material/MenuItem';


// assets
import MainCard from 'ui-component/cards/MainCard';
import CategorieServices from 'services/categories-services/CategorieServices';
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';


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


export default function AddCtegorie({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [filsName] = React.useState(0);
    const [pereName, setPereName] = React.useState(0);
    const [message, setMessage] = useState(null);
    const [categoriesNames, setCategoriesNames] = useState([]);
    const [redirect, setRedirect] = useState(false)
    const [strength] = useState(0);
    const [level] = useState();

    const handleChangeSelectPere = (event) => {
        const {
            target: { value },
        } = event;
        setPereName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (values, { setErrors, setSubmitting }) => {

        if (pereName === filsName && filsName != 0) {
            setErrors({ fils: "La catégorie et la sous-catégorie doivent être différentes ", pere: "La catégorie et la sous-catégorie doivent être différentes " });
            setSubmitting(false);

        }
        else {
            CategorieServices.addCategorie(values.nom, pereName, filsName).then(
                () => {

                    Swal.fire({
                        title: 'Bon travail!!',
                        text: "Votre categorie a été créé avec succès!",
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
    }
    useEffect(
        () => {
            // Make sure to revoke the data uris to avoid memory leaks
            CategorieServices.getAll().then((res) => {
                setCategoriesNames(res.data)
            })
        }, []
    );
    if (redirect)
        return (<Navigate push to="/girdView/categories?page=1" />)
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (<MainCard >

            <Formik
                initialValues={{
                    fils: '',
                    pere: '',
                    nom: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    fils: Yup.string().notRequired(),
                    pere: Yup.string().notRequired(),
                    nom: Yup.string().min(2, 'Le nom du categorie doit etre valide ').required('Nom catégorie est requis'),
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}

            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>


                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="nom">Nom categorie</InputLabel>
                            <OutlinedInput
                                id="nom"
                                type="text"
                                value={values.nom}
                                name="nom"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.nom && errors.nom && (
                                <FormHelperText error id="standard-weight-helper-text-nom-register">
                                    {errors.nom}
                                </FormHelperText>
                            )}
                        </FormControl>


                        <FormControl fullWidth error={Boolean(touched.pere && errors.pere)} sx={{ ...theme.typography.customInput }}>

                            <Select

                                id="demo-fils"
                                value={pereName}
                                onChange={handleChangeSelectPere}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

                                MenuProps={MenuProps}

                            >
                                {categoriesNames.map((name) => (
                                    name.catPere?.catPere == null ? (
                                        <MenuItem
                                            key={name.id}
                                            value={name.id}
                                        >
                                            {name.nom}
                                        </MenuItem>) : (null)
                                ))}
                            </Select>
                            <FormHelperText id="helperproduit">
                                Sélectionner le père de cette categorie
                            </FormHelperText>
                            {touched.fils && errors.fils && (
                                <FormHelperText error id="standard-weight-helper-text-fils-register">
                                    {errors.fils}
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

                                <Link to={"/girdView/categories?page=1"} style={{ textDecoration: 'none' }}>
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
                                        Ajouter
                                    </LoadingButton>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>






        </MainCard >);
    else {
        history.push('/login');
        window.location.reload();
    }




};

//export default listViewProducts;