import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { useDropzone } from "react-dropzone";


// material-ui
import React, { useEffect, useState } from 'react';
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
    useMediaQuery,
    CircularProgress
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';


// assets
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';

import CompanyServices from 'services/companyServices/CompanyServices';
import { Link, Navigate } from 'react-router-dom';

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



export default function About({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [message, setMessage] = useState(null);

    const [user, setUser] = useState(null);
    const [loadcirular, setLoadcirular] = useState(true);
    const formikRef = React.useRef();
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




    useEffect(() => {

        AuthService.show().then((res) => {
            setUser(res.data);
            setLoadcirular(false);

            if (res.data.photoAbout != null) {
                setFiles([{ preview: "http://localhost:8000/uploads/" + res.data.photoAbout, name: null }])

            } else {
                setFiles([{ preview: "http://localhost:8000/uploads/" + res.data.photo, name: null }])

            }

            if (formikRef.current) {
                if (res.data.textAbout != null) {
                    formikRef.current.setFieldValue(
                        "textAbout",
                        res.data.textAbout
                    );
                }

            }


        })
    }, [],
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );
    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        let formData = new FormData()

        if (acceptedFiles[0] != null) {
            //   let formData = new FormData()
            const fileObjects = acceptedFiles.map(file => {
                formData.append('assets[]', file, file.name)
            })
        }
        if (values.newPassword != values.confirmNewPassword) {
            setMessage('Confirmer votre nouveau mot de passe ')
        } else {
            CompanyServices.updateAbout(values.textAbout, formData, user.id).then(
                () => {

                    Swal.fire({
                        title: 'Bon travail!!',
                        text: "Votre page à propos a été modifié avec succès!",
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
                    const resMessage = 'erreur'
                    setMessage(resMessage);
                    setSubmitting(false);
                }
            );
        }
    }

    if (redirect)
        return (<Navigate push to="/dashboard/default" />)
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
                            textAbout: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            textAbout: Yup.string().max(7000).min(10, 'Text entreprise doit contenir au moin 10 caractères').required('Text est requis'),
                        })}
                        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>

                                <FormControl fullWidth error={Boolean(touched.textAbout && errors.textAbout)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="nomEntreprise">Text </InputLabel>
                                    <OutlinedInput
                                        id="textAbout"
                                        type="text"
                                        value={values.textAbout}
                                        name="textAbout"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.textAbout && errors.textAbout && (
                                        <FormHelperText error id="standard-weight-helper-text-textAbout-register">
                                            {errors.textAbout}
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
                                        Sélectionner la photo de votre page à propos
                                    </FormHelperText>
                                </FormControl>






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

                                        <Link to={'/dashboard/default'} style={{ textDecoration: 'none' }}>
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