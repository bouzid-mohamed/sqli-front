// material-ui

import * as React from 'react';
import { useDropzone } from "react-dropzone";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import PromotionServices from 'services/promotion-services/promotionServices';
import Moment from 'moment';

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
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';


// assets
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';



const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
};

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
};

const img = {
    display: "block",
    width: "auto",
    height: "100%"
};








export default function AddPromotion({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [strength] = useState(0);
    const [level] = useState();
    const [value, setValue] = React.useState([null, null]);
    const [message, setMessage] = useState(null);
    const [redirect, setRedirect] = useState(false)




    // dropzone 
    const [files, setFiles] = useState([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {

            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }, multiple: false
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt="Ecommerce" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );
    const [loading, setLoading] = React.useState(false);

    function handleClick() {
        setLoading(true);
    }

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        if (acceptedFiles[0] == null) {
            setMessage('Il faut ajouter une bannière pour votre promotion ! ')
            setSubmitting(false);
        }
        else {
            let formData = new FormData()
            const fileObjects = acceptedFiles.map(file => {
                formData.append('assets', file, file.name)
            })


            PromotionServices.addPromotion(values.nom, values.description, Moment(value[0]).format().toString(), Moment(value[1]).format().toString(), values.pourcentage, formData).then(
                () => {

                    Swal.fire({
                        title: 'Bon travail!!',
                        text: "Votre promotion a été créé avec succès!",
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
    if (redirect)
        return (<Navigate push to="/girdView/promotion?page=1" />)

    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (<MainCard >

            <Formik
                initialValues={{
                    nom: '',
                    description: '',
                    pourcentage: '',
                    dateDebut: null,
                    dateFin: null,
                    submit: null,


                }}
                validationSchema={Yup.object().shape({
                    nom: Yup.string().max(255, 'Doit être un nom valide').min(2, 'Doit être un nom valide').required('Nom est requis'),
                    description: Yup.string().max(300, 'Doit être une description valide').min(5, 'La description doit contenir au moins 5 caractères').required('Description est requis'),
                    pourcentage: Yup.number().min(0, 'la pourcentage  de promotion doit etre supérieur à 0 ').required('Pourcentage promotion est requis'),

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}

            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>


                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="nom">Nom promotion</InputLabel>
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


                        <FormControl fullWidth error={Boolean(touched.pourcentage && errors.pourcentage)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="pourcentage">Pourcentage promotion</InputLabel>
                            <OutlinedInput
                                id="pourcentage"
                                type="number"
                                value={values.pourcentage}
                                name="pourcentage"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.pourcentage && errors.pourcentage && (
                                <FormHelperText error id="standard-weight-helper-text-pourcentage-register">
                                    {errors.pourcentage}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth  >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateRangePicker
                                    dateDisplayFormat="d MMM yyyy"

                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);



                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField name="dateDebut" {...startProps} style={{ "width": "50%" }} error={Boolean(touched.dateDebut && value[0] == null)} sx={{ ...theme.typography.customInput }} />
                                            <Box sx={{ mx: 2 }}> jusqu'a </Box>
                                            <TextField name="dateFin"    {...endProps} style={{ "width": "50%" }} error={Boolean(touched.dateFin && value[1] == null)} sx={{ ...theme.typography.customInput }} />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>

                            <FormHelperText id="standard-weight-helper-text-dateDebut-register">
                                Sélectionner la date début et fin du promotion
                            </FormHelperText>
                        </FormControl>



                        <FormControl fullWidth error={Boolean(touched.description && errors.description)} sx={{ ...theme.typography.customInput }}>
                            <OutlinedInput
                                multiline
                                placeholder="Description"
                                minRows={3}
                                id="description"
                                type="text"
                                value={values.description}
                                name="description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.description && errors.description && (
                                <FormHelperText error id="standard-weight-helper-text-description-register">
                                    {errors.description}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                            <section className="container" style={{ "width": "100%", "minHeight": 120, "border": "0.5px dashed #c0c0c0", "borderRadius": "12px" }}>
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <p>Faites glisser et déposez des images ici, ou cliquez pour sélectionner des images</p>
                                </div>
                                <aside style={thumbsContainer}>{thumbs}</aside>
                            </section>
                            <FormHelperText id="helper-banière">
                                Sélectionner la banière du promotion
                            </FormHelperText>
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
                                <Link to={'/girdView/promotion?page=1'} style={{ textDecoration: 'none' }}>
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
