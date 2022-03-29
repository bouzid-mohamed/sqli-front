// material-ui

import * as React from 'react';
import { useDropzone } from "react-dropzone";
import LoadingButton from '@mui/lab/LoadingButton';
import CategorieServices from "services/categories-services/CategorieServices"
import PromotionServices from 'services/promotion-services/promotionServices';
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
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MenuItem from '@mui/material/MenuItem';
// assets
import MainCard from 'ui-component/cards/MainCard';
import ProductServices from 'services/productServices/ProductServices';
import Swal from 'sweetalert2';

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


export default function AddProduct({ ...others }) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [categorieName, setCategorieName] = React.useState(0);
    const [promotionName, setPromotionName] = React.useState(0);
    const [categoriesNames, setCategoriesNames] = React.useState([]);
    const [strength] = useState(0);
    const [level] = useState();
    const [promotionNames, setPromotionNames] = useState([]);
    const [message, setMessage] = useState(null);


    const handleChangeSelect = (event) => {
        const {
            target: { value },
        } = event;
        setCategorieName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );


    };
    const handleChangeSelectPromotion = (event) => {
        const {
            target: { value },
        } = event;
        setPromotionName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    // dropzone 
    const [files, setFiles] = useState([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),

                    })
                )
            );
        }
    });


    //console.log(formData.getAll('assets'))

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt="Ecommerce" />
            </div>
        </div>
    ));

    useEffect(
        () => {

            CategorieServices.getAll().then((res) => {
                setCategoriesNames(res.data)
            });
            PromotionServices.getAll().then((res) => {
                setPromotionNames(res.data)
            })

        }, [], () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]

    );
    const [loading, setLoading] = React.useState(false);

    function handleClick() {
        setLoading(true);

    }

    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        if (acceptedFiles[0] == null) {
            setMessage('Il faut ajouter au moin une image pour votre produit ! ')
            setSubmitting(false);
        }
        else {
            let formData = new FormData()
            const fileObjects = acceptedFiles.map(file => {
                console.log(file)
                formData.append('assets[]', file, file.name)
            })
            ProductServices.addProduct(values.nom, values.prix, categorieName, values.description, promotionName, formData).then(
                () => {

                    Swal.fire({
                        title: 'Bon travail!!',
                        text: "Votre produit a été créé avec succès!",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            const history = createBrowserHistory();
                            history.push("/listView/products?page=1");
                            window.location.reload();
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


    return (<MainCard >

        <Formik
            initialValues={{
                nom: '',
                description: '',
                prix: '',
                promotion: '',
                categorie: { categorieName },
                file: { files },
                submit: null
            }}
            validationSchema={Yup.object().shape({
                nom: Yup.string().max(255, 'Doit être un nom valide').min(2, 'Doit être un nom valide').required('Nom est requis'),
                description: Yup.string().max(300, 'Doit être une description valide').min(5, 'La description doit contenir au moins 5 caractères').required('Description est requis'),
                prix: Yup.number().min(0, 'le prix doit etre supérieur à 0 ').required('Prix est requis'),
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <Grid container spacing={matchDownSM ? 0 : 2}>
                    </Grid>
                    <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="nom">Nom produit</InputLabel>
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


                    <FormControl fullWidth error={Boolean(touched.prix && errors.prix)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="nom">Prix produit</InputLabel>
                        <OutlinedInput
                            id="prix"
                            type="number"
                            value={values.prix}
                            name="prix"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.prix && errors.prix && (
                            <FormHelperText error id="standard-weight-helper-text-prix-register">
                                {errors.prix}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl error={Boolean(touched.categorie && categorieName == 0)} fullWidth sx={{ ...theme.typography.customInput }}>
                        <Select
                            id="categorieName"
                            name="categorieName"
                            value={categorieName}
                            onChange={handleChangeSelect}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

                            MenuProps={MenuProps}

                        >
                            {categoriesNames?.map((name) => (
                                name.catFils[0] == null ? (
                                    <MenuItem
                                        key={name.id}
                                        value={name.id}
                                    >
                                        {name.nom}
                                    </MenuItem>) : (null)
                            ))}
                        </Select>
                        <FormHelperText id="helpercat">
                            Sélectionner la catégorie
                        </FormHelperText>

                    </FormControl>

                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>

                        <Select

                            id="promotionName"

                            value={promotionName}
                            onChange={handleChangeSelectPromotion}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

                            MenuProps={MenuProps}

                        >
                            {promotionNames?.map((name) => (
                                <MenuItem
                                    key={name.id}
                                    value={name.id}
                                >
                                    {name.nom} {name.pourcentage} %
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText id="helpercat">
                            Sélectionner la promotion
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
                            <FormHelperText error id="standard-weight-helper-text-email-register">
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


                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"

                                    color="secondary"
                                    onClick={() => {
                                        const history = createBrowserHistory();
                                        history.push("/listView/products?page=1");
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
