import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { strengthColor, strengthIndicator } from 'utils/password-strength';


// material-ui
import { useEffect, useState } from 'react';
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
    MenuItem,
    InputAdornment,
    IconButton
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';


// assets
import MainCard from 'ui-component/cards/MainCard';
import BonServices from 'services/bons-services/BonServices';
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import postServices from 'services/post-services/postServices';
import LivreurServices from 'services/livreur-services/LivreurServices';
var data = require('../../../data/gouvernerat.json')


export default function AddLivreur({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [message, setMessage] = useState(null);
    const [gouv, setGouv] = useState('');
    const [dataDelegation, setDataDelgation] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [dataGouvernerat, setDataGouvernerat] = useState([]);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [redirect, setRedirect] = useState(false)





    const handleSelectGouvernerat = async (e) => {
        const d = [];
        setGouv(e.target.value)
        await (setDataDelgation([]))
        const delegs = data.map((g) => {
            if (g.gouvernerat == e.target.value)
                d.push(g.delegation)
        })
        setDataDelgation(d);
    }

    useEffect(() => {
        changePassword('123456');
        const gouvs = data.map((g) => {

            if (dataGouvernerat.indexOf(g.gouvernerat) === -1) {
                dataGouvernerat.push(g.gouvernerat)
            }
        });


    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };




    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        LivreurServices.addLivreur(values.email, values.password, values.numTel, values.nom, values.prenom, values.permis).then(
            () => {

                Swal.fire({
                    title: 'Bon travail!!',
                    text: "Votre compte a été créé avec succès!",
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
                const resMessage = "Ce compte existe déja"
                setMessage(resMessage);
                setSubmitting(false);
            }
        );
    }
    if (redirect)
        return (<Navigate push to="/post/livreur/list?page=1" />)
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1)
        return (<MainCard >

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    numTel: '',
                    nom: '',
                    prenom: '',
                    permis: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Doit être un email valide').max(255).required('Email est requis'),
                    password: Yup.string().max(255).required('Mot de passe est requis'),
                    numTel: Yup.number().min(10000000, 'Numéro de téléphone incoreect').max(99999999, 'Numéro de téléphone incoreect').required('Numéro de téléphone est requis'),
                    nom: Yup.string().max(255).min(2, 'Doit être un nom valide').required('Nom est requis'),
                    prenom: Yup.string().max(255).min(2, 'Doit être un prénom valide').required('Prénom est requis'),
                    permis: Yup.string().max(255).min(1, 'Doit être valide').required('Type permis est requis'),

                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others} >
                        <Grid >

                            <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="nom">Nom</InputLabel>

                                <OutlinedInput
                                    fullWidth
                                    in="nom"
                                    label="Nom"
                                    name="nom"
                                    type="text"
                                    value={values.nom}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.nom && errors.nom && (
                                    <FormHelperText error id="standard-weight-helper-text-nom-register">
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
                        </Grid>
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



                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
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
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
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
                                <Link to={'/post/livreur/list'} style={{ textDecoration: 'none' }}>
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