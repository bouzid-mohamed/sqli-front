import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
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
    Typography,
    TextField,
    useMediaQuery,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    IconButton,
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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LivreurServices from 'services/livreur-services/LivreurServices';

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



export default function EditLivreur({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [showPasswordEdit, setShowPasswordEdit] = useState(false);
    const [user, setUser] = useState(null);
    const [loadcirular, setLoadcirular] = useState(true);
    const formikRef = React.useRef();

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
            console.log(res.data)
            setLoadcirular(false);
            console.log(res.data)
            setFiles([{ preview: "http://localhost:8000/uploads/" + res.data.photo, name: null }])

            if (formikRef.current) {

                formikRef.current.setFieldValue(
                    "email",
                    res.data.email
                );
                formikRef.current.setFieldValue(
                    "numTel",
                    res.data.numTel
                );
                formikRef.current.setFieldValue(
                    "nom",
                    res.data.nom
                );
                formikRef.current.setFieldValue(
                    "permis",
                    res.data.typePermis

                );

                formikRef.current.setFieldValue(
                    "prenom",
                    res.data.prenom

                );

            }


        })


    }, [],
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const changeNewPassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    const handleShowPassword = (event) => {
        setShowPasswordEdit(event.target.checked);
        if (event.target.checked === false) {

            formikRef.current.setFieldValue(
                "password",
                ''
            );
            formikRef.current.setFieldValue(
                "newPassword",
                ''
            );

            formikRef.current.setFieldValue(
                "confirmNewPassword",
                ''
            );

        }
    }


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
            LivreurServices.updateLivreur(values.nom, values.prenom, values.email, values.numTel, values.permis, values.newPassword, values.password, formData, user.id).then(
                () => {

                    Swal.fire({
                        title: 'Bon travail!!',
                        text: "Votre compte a été modifié avec succès!",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            const history = createBrowserHistory();
                            history.push("/livreur");
                            window.location.reload();
                        }
                    })
                    setMessage('');

                    setSubmitting(false);
                },
                error => {
                    const resMessage = 'Mot de passe incorrect'
                    setMessage(resMessage);
                    setSubmitting(false);
                }
            );
        }
    }
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_LIVREUR") > -1)
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
                            email: '',
                            password: '',
                            newPassword: '',
                            confirmNewPassword: '',
                            numTel: '',
                            nom: '',
                            prenom: '',
                            permis: '',

                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Doit être un email valide').max(255).required('Email est requis'),
                            password: showPasswordEdit ? Yup.string().max(255).min(5, 'Mot de passe doit contenir au moin 5 charachtère').required('Mot de passe  est requis') : Yup.string(),
                            newPassword: showPasswordEdit ? Yup.string().max(255).min(5, 'Mot de passe doit contenir au moin 5 charachtère').required('Mot de passe  est requis') : Yup.string(),
                            confirmNewPassword: showPasswordEdit ? Yup.string().max(255).min(5, 'Mot de passe doit contenir au moin 5 charachtère').required('Répetez votre mot de passe') : Yup.string(),
                            nom: Yup.string().max(255).min(2, 'Nom entreprise doit contenir au moin 2 caractères').required('Nom est requis'),
                            numTel: Yup.number().min(10000000, 'Numéro de téléphone incoreect').max(99999999, 'Numéro de téléphone incoreect').required('Numéro de téléphone est requis'),
                            permis: Yup.string().max(255).min(1, 'Doit être valide').required('Type permis est requis'),

                        })}
                        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>

                                <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="nomEntreprise">Nom Entreprise</InputLabel>
                                    <OutlinedInput
                                        id="nomEntreprise"
                                        type="text"
                                        value={values.nom}
                                        name="nom"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.nom && errors.nom && (
                                        <FormHelperText error id="standard-weight-helper-text-email-register">
                                            {errors.nom}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.prenom && errors.prenom)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="prenom">Prénom</InputLabel>

                                    <OutlinedInput
                                        id="prenom"
                                        fullWidth
                                        label="Prénom"
                                        name="prenom"
                                        type="text"
                                        value={values.prenom}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}

                                        sx={{ ...theme.typography.customInput }}
                                    />
                                    {touched.prenom && errors.prenom && (
                                        <FormHelperText error id="standard-weight-helper-text-prenom-register">
                                            {errors.prenom}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.numTel && errors.numTel)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="numTel">Numéro de Tél</InputLabel>
                                    <OutlinedInput
                                        id="numTel"
                                        type="number"
                                        value={values.numTel}
                                        name="numTel"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.numTel && errors.numTel && (
                                        <FormHelperText error id="standard-weight-helper-text-numTel-register">
                                            {errors.numTel}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="email">Addresse email</InputLabel>
                                    <OutlinedInput
                                        id="email"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.permis && errors.permis)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="permis">Type permis</InputLabel>

                                    <OutlinedInput
                                        id="permis"
                                        fullWidth
                                        label="Permis"
                                        name="permis"
                                        type="text"
                                        value={values.permis}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}

                                        sx={{ ...theme.typography.customInput }}
                                    />
                                    {touched.permis && errors.permis && (
                                        <FormHelperText error id="standard-weight-helper-text-prenom-register">
                                            {errors.permis}
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
                                        Sélectionner votre photo
                                    </FormHelperText>
                                </FormControl>

                                <FormControlLabel control={<Checkbox checked={showPasswordEdit} onChange={handleShowPassword} />} label="Modifier votre mot de passe" />
                                {showPasswordEdit ? (
                                    <>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="password">Mot de passe actuel</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                name="password"
                                                label="Password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}

                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{}}
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="password">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.newPassword && errors.newPassword)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="newPassword">Nouveau mot de passe</InputLabel>
                                            <OutlinedInput
                                                id="newPassword"
                                                type={showNewPassword ? 'text' : 'password'}
                                                value={values.newPassword}
                                                name="newPassword"
                                                label="nouveau mot de passe "
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    changeNewPassword(e.target.value);
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowNewPassword}
                                                            onMouseDown={handleMouseDownNewPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{}}
                                            />
                                            {touched.newPassword && errors.newPassword && (
                                                <FormHelperText error id="newPassword">
                                                    {errors.newPassword}
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
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="confirmNewPassword">Confirmer votre nouveau mot de passe</InputLabel>
                                            <OutlinedInput
                                                id="confirmNewPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={values.confirmNewPassword}
                                                name="confirmNewPassword"
                                                label="confirmNewPassword"
                                                onBlur={handleBlur}
                                                onChange={handleChange}

                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{}}
                                            />
                                            {touched.confirmNewPassword && errors.confirmNewPassword && (
                                                <FormHelperText error id="password">
                                                    {errors.confirmNewPassword}
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                    </>) : null}




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


                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"

                                                color="secondary"
                                                onClick={() => {
                                                    const history = createBrowserHistory();
                                                    history.push("/livreur");
                                                    window.location.reload();
                                                }}
                                                variant="outlined"
                                            >
                                                Annuler
                                            </Button>
                                        </AnimateButton>
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