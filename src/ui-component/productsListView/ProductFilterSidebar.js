import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// material


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
    CircularProgress,

} from '@mui/material';
//

import Scrollbar from '../Scrollbar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import React from 'react';
import CategorieServices from 'services/categories-services/CategorieServices';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
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
    color: 'green',
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
    onOpenFilter,
    onCloseFilter,
    formik
}) {
    const { getFieldProps } = formik;
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(true);
    const [list] = React.useState([]);
    const [setPChecked] = React.useState(0);
    const [ch, setch] = React.useState([]);
    let query = useQuery();
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        if (query.get("filter")) {
            var myArray = query.get("filter").split(',');
            myArray.filter((e) => {
                list.push(parseInt(e))
            })
        }
        if (query.get("order")) {
            setPChecked(query.get("order"))
        }
        var i = 0;
        CategorieServices.getAll().then((res) => {
            var a = [];
            res.data.filter((c) => {

                if (c.catPere == null) {
                    c.num = i;
                    if (list.indexOf(parseInt(c.id)) > -1) {
                        ch.push(true)
                    }
                    else {
                        ch.push(false)
                    }
                    i = i + 1;
                    var a1 = [];
                    if (c.catFils[0] != null) {
                        c.catFils.filter((fils1) => {
                            fils1.num = i;
                            if (list.indexOf(parseInt(fils1.id)) > -1) {
                                ch.push(true)
                            }
                            else {
                                ch.push(false)
                            }

                            i = i + 1;
                            var a2 = [];
                            if (fils1.catFils[0] != null) {
                                fils1.catFils.filter((fils2) => {
                                    fils2.num = i;
                                    if (list.indexOf(parseInt(fils2.id)) > -1) {
                                        ch.push(true)
                                    }
                                    else {
                                        ch.push(false)
                                    }

                                    i = i + 1;
                                    a2.push(fils2)
                                })
                                fils1.catFils = a2

                            }
                            a1.push(fils1)
                        })
                        c.catFils = a1

                    }
                    c.catFils = a1
                    a.push(c)
                }

            })
            setRows(a);
            setIsloading(false);

        })
    }, []);
    const handleChangeParent = (e, item) => {

        if (ch[item.num] === false) {
            const updatedArray = [...ch];
            updatedArray[item.num] = true;
            //  setch(updatedArray);
            list.push(e.target.value)
            if (item.catFils[0] != null) {
                item.catFils.map((enfant) => {
                    updatedArray[enfant.num] = true;
                    if (enfant.catFils[0] != null) {
                        enfant.catFils.map((enfant2) => {
                            updatedArray[enfant2.num] = true;
                        })
                    }
                })
            }
            setch(updatedArray);

        }
        else {
            const updatedArray = [...ch];
            updatedArray[item.num] = false;
            setch(updatedArray);
            list.splice(list.indexOf(e.target.value))
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
                        {isLoading ? (<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}>
                            <CircularProgress />
                        </Box>) : (<><Scrollbar style={{ overflowY: 'scroll' }}>
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
                                                                onChange={(e, i) => handleChangeParent(e, item)}
                                                                // defaultChecked={list.indexOf(item.id) > -1}
                                                                checked={ch[item.num]}


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
                                                                                    onChange={(e, item) => handleChangeParent(e, fils)}
                                                                                    //  defaultChecked={list.indexOf(fils.id) > -1}

                                                                                    checked={ch[fils.num]}

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
                                                                                            onChange={(e, item) => handleChangeParent(e, f)}
                                                                                            //  defaultChecked={list.indexOf(f.id) > -1}

                                                                                            checked={ch[f.num]}


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
                                        {FILTER_PRICE_OPTIONS.map((o) => (
                                            < FormControlLabel
                                                key={o.value}
                                                value={o.value}
                                                control={<Radio />}
                                                label={o.label}
                                                onChange={handleChangePrice}


                                            />
                                        ))}


                                    </RadioGroup>
                                </div>
                            </Stack>
                        </Scrollbar>   <Box sx={{ p: 3 }}>
                                <Button
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    variant="outlined"
                                    href={price === 0 ? 'products?page=1&filter=' + list : 'products?page=1&filter=' + list + '&order=' + price}
                                    startIcon={<FilterAltIcon />}
                                >
                                    Filtrer
                                </Button>

                            </Box></>)}


                    </Drawer>
                </Form>
            </FormikProvider>
        </>
    );
}
