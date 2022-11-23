import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CompanyServices from 'services/companyServices/CompanyServices';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import MenuItem from '@mui/material/MenuItem';


// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';
import { LoadingButton } from '@mui/lab';

// ===========================|| FIREBASE - REGISTER ||=========================== //

var data = require('../../../../data/gouvernerat.json')

const FirebaseRegisterCompany = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [dataGouvernerat, setDataGouvernerat] = useState([]);
    const [gouv, setGouv] = useState('');
    const [message, setMessage] = useState(null);



    const [dataDelegation, setDataDelgation] = useState([]);


    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const googleHandler = async () => {
        console.error('Register');
    };

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

    useEffect(() => {
        changePassword('123456');
        const gouvs = data.map((g) => {

            if (dataGouvernerat.indexOf(g.gouvernerat) === -1) {
                dataGouvernerat.push(g.gouvernerat)
            }
        });


    }, []);
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

    //ajouter une entreprise 

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        CompanyServices.addCompany(values.email, values.password, gouv, values.delegation, values.numTel, values.nom).then(
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

                        const history = createBrowserHistory();
                        history.push("/login");
                        window.location.reload();
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


    return (
        <>


            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    numTel: '',
                    delegation: '',
                    nom: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Doit être un email valide').max(255).required('Email est requis'),
                    password: Yup.string().max(255).required('Mot de passe est requis'),
                    nom: Yup.string().max(255).min(2, 'Nom entreprise doit contenir au moin 2 caractères').required('Nom est requis'),
                    numTel: Yup.number().min(10000000, 'Numéro de téléphone incoreect').max(99999999, 'Numéro de téléphone incoreect').required('Numéro de téléphone est requis'),
                    delegation: Yup.string().required('Délégation est requis'),
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={Boolean(touched.gouv && errors.gouv)} sx={{ ...theme.typography.customInput }}>
                                    <TextField
                                        fullWidth
                                        select
                                        name="gouv"
                                        helperText="Sélectionner la gouvernerat"
                                        type="text"
                                        value={gouv}
                                        onBlur={handleBlur}
                                        onChange={handleSelectGouvernerat}
                                        inputProps={{}}
                                        sx={{ ...theme.typography.customInput }}>
                                        {dataGouvernerat.map((option) => (
                                            <MenuItem key={Math.random().toString(36).substr(2, 9)} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {touched.gouv && errors.gouv && (
                                        <FormHelperText error id="standard-weight-helper-text-gouvernerat-register">
                                            {errors.gouv}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={Boolean(touched.delegation && errors.delegation)} sx={{ ...theme.typography.customInput }}>
                                    <TextField
                                        fullWidth
                                        select
                                        name="delegation"
                                        helperText="Sélectionner la délégation"
                                        type="text"
                                        value={values.delegation}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                        sx={{ ...theme.typography.customInput }}>
                                        {dataDelegation.map((option) => (
                                            <MenuItem key={Math.random().toString(36).substr(2, 9)} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {touched.delegation && errors.delegation && (
                                        <FormHelperText error id="standard-weight-helper-text-delegation-register">
                                            {errors.delegation}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="nomEntreprise">Nom entreprise</InputLabel>
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
                                <FormHelperText error id="standard-weight-helper-text-nom-register">
                                    {errors.nom}
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
                                <FormHelperText error id="password">
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

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            D'accord avec &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Termes & conditions.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>

                            {message && (
                                <Alert severity="error"  >{message}</Alert>

                            )}
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <LoadingButton
                                disableElevation
                                loading={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                S'inscrire
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegisterCompany;
