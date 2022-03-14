// material-ui

import Chip from '@mui/material/Chip';
import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';


// material-ui
import { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
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
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MenuItem from '@mui/material/MenuItem';


// assets
import MainCard from 'ui-component/cards/MainCard';


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

const categoriesNames = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



export default function AddStock({ ...others }) {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [categorieName] = React.useState([]);
    const [produitName, setProduitName] = React.useState([]);

    const [strength] = useState(0);
    const [level] = useState();
    const handleChangeSelect = (event) => {
        const {
            target: { value },
        } = event;
        setProduitName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // dropzone 
    const [files] = useState([]);



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


    return (<MainCard >

        <Formik
            initialValues={{
                produit: '',
                couleur: '',
                taille: '',
                quantite: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                couleur: Yup.string().required('Couleur est requis'),
                produit: Yup.string().required('Produit est requis'),
                quantite: Yup.number().min(0, 'La quantitée doit etre supérieur à 0 ').required('Quantitéest requis'),
                taille: Yup.string().min(1, 'Taille est requis').required('Taille est requis'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <Grid container spacing={matchDownSM ? 0 : 2}>


                    </Grid>
                    <FormControl fullWidth error={Boolean(touched.produit && errors.produit)} sx={{ ...theme.typography.customInput }}>

                        <Select

                            id="demo-produit"
                            helperText="Sélectionner le produit"

                            value={produitName}
                            onChange={handleChangeSelect}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}

                        >
                            {categoriesNames.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, categorieName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText id="helperproduit">
                            Sélectionner le produit
                        </FormHelperText>
                        {touched.produit && errors.produit && (
                            <FormHelperText error id="standard-weight-helper-text-produit-register">
                                {errors.produit}
                            </FormHelperText>
                        )}
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

                        <Grid item xs={12} sm={2} >


                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="secondary"
                                    onClick={handleClick}
                                    loading={loading}
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
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    onClick={handleClick}
                                    loading={loading}
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




};

//export default listViewProducts;