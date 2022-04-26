import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// material

import { makeStyles } from '@material-ui/core/styles';

import {

    Box,
    Radio,
    Stack,
    Button,
    Drawer,
    Divider,
    Checkbox,
    FormGroup,
    IconButton,
    Typography,
    RadioGroup,
    FormControlLabel,

} from '@mui/material';
//

import Scrollbar from '../Scrollbar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import React from 'react';
import CategorieServices from 'services/categories-services/CategorieServices';

// ----------------------------------------------------------------------
export const FILTER_PRICE_OPTIONS = [
    { value: '1', label: 'Prix : bas-élevé' },
    { value: '2', label: 'Prix: élevé-bas' },

];
ShopFilterSidebar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onResetFilter: PropTypes.func,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    formik: PropTypes.object
};
const commonStyles = {
    color: 'red',
    ml: 4,

};
const commonStyles3 = {
    color: '#5a33aa',
    ml: 8,

};
const commonStyles2 = {
    bgcolor: 'background.paper',
    marginBottom: 1,
    border: 1,
    width: '100%',
    borderRadius: '14px',
    borderStyle: 'dotted'
};
export default function ShopFilterSidebar({
    isOpenFilter,
    onResetFilter,
    onOpenFilter,
    onCloseFilter,
    formik
}) {
    const { values, getFieldProps, handleChange } = formik;
    const [open, setOpen] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(true);
    const [list, setList] = React.useState([]);
    const [price, setPrice] = React.useState(0);
    const handleClick = () => {
        setOpen(!open);
    };
    React.useEffect(() => {
        CategorieServices.getAll().then((res) => {
            setRows(res.data);
            setIsloading(false);
            res.data.filter((r) => {
                list.push(r.id); console.log(r.id);

            })

        })

    }, []);
    const handleChangeParent = (e) => {
        if (list.indexOf(e.target.value) > -1) {
            list.splice(list.indexOf(e.target.value))
            console.log(list + 'splice' + e.target.value)

        }
        else {
            list.push(e.target.value)

        }
    }
    const handleChangePrice = (e) => {
        if (price === 1) {
            setPrice(2)
        }
        else {
            setPrice(1)
        }
    }
    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={<FilterListRoundedIcon />}
                onClick={onOpenFilter}
            >
                Filtres&nbsp;
            </Button>

            <FormikProvider value={formik} >
                <Form autoComplete="off" noValidate>
                    <Drawer
                        anchor="right"
                        open={isOpenFilter}
                        onClose={onCloseFilter}
                        PaperProps={{
                            sx: { width: 280, border: 'none', overflow: 'hidden' }
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ px: 1, py: 2 }}
                        >
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                                Filtres
                            </Typography>
                            <IconButton onClick={onCloseFilter}>
                                <CloseRoundedIcon width={20} height={20} />
                            </IconButton>
                        </Stack>

                        <Divider />

                        <Scrollbar style={{ overflowY: 'scroll' }}>

                            <Stack spacing={3} sx={{ p: 3 }}>
                                <div>
                                    <Typography variant="subtitle1" gutterBottom >
                                        Categorie
                                    </Typography>
                                    <FormGroup >

                                        {rows.map((item, index) => (
                                            item.catPere == null ? (
                                                <Box key={index} sx={{ ...commonStyles2, borderColor: '#9e9e9e' }}  >
                                                    < FormControlLabel
                                                        sx={{ ml: 0.2, color: 'primary.main' }}


                                                        control={
                                                            < Checkbox
                                                                {...getFieldProps('gender')}
                                                                value={item.id}
                                                                onChange={handleChangeParent}
                                                                defaultChecked={true}
                                                            />

                                                        }
                                                        label={item.nom}
                                                    />

                                                    <div key={item.id}  >
                                                        {
                                                            item.catFils[0] != null ?
                                                                item.catFils.map((fils) =>
                                                                    <div key={fils.id}>

                                                                        < FormControlLabel sx={{ ...commonStyles }}
                                                                            control={
                                                                                < Checkbox
                                                                                    {...getFieldProps('gender')}
                                                                                    value={fils.id}
                                                                                    onChange={handleChangeParent}
                                                                                    defaultChecked={true}
                                                                                />
                                                                            }
                                                                            label={fils.nom}
                                                                        />

                                                                        {fils.catFils[0] != null ? fils.catFils.map((f) =>
                                                                            <div key={f.id}>

                                                                                < FormControlLabel sx={{ ...commonStyles3 }}
                                                                                    control={
                                                                                        < Checkbox
                                                                                            {...getFieldProps('gender')}
                                                                                            value={f.id}
                                                                                            onChange={handleChangeParent}
                                                                                            defaultChecked={true}
                                                                                        />
                                                                                    }
                                                                                    label={f.nom}
                                                                                />


                                                                            </div>) : (null)}
                                                                    </div>


                                                                ) : (null)

                                                        }

                                                    </div>

                                                </Box>


                                            ) : (null)
                                        ))}
                                    </FormGroup>
                                </div>
                                <div>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Prix
                                    </Typography>
                                    <RadioGroup {...getFieldProps('priceRange')}>
                                        {FILTER_PRICE_OPTIONS.map((item, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                                onChange={handleChangePrice}
                                            />
                                        ))}
                                    </RadioGroup>
                                </div>


                            </Stack>
                        </Scrollbar>
                        <Box sx={{ p: 3 }}>
                            <Button
                                sx={{ mb: 2 }}
                                fullWidth
                                size="large"
                                type="submit"
                                color="primary"
                                variant="outlined"

                                href={'http://localhost:3000/listView/products?page=1?filter=' + list}
                                startIcon={<FilterAltIcon />}
                            >
                                Filtrer
                            </Button>
                            <Button
                                fullWidth
                                size="large"
                                type="submit"
                                color="inherit"
                                variant="outlined"
                                onClick={onResetFilter}
                                startIcon={<ClearRoundedIcon />}
                            >
                                Tout effacer
                            </Button>
                        </Box>
                    </Drawer>
                </Form>
            </FormikProvider>
        </>
    );
}
