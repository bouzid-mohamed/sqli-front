import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
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
    FormControlLabel
} from '@mui/material';
//

import Scrollbar from '../Scrollbar';
import ColorManyPicker from '../ColorPreview/ColorPreview';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_GENDER_OPTIONS = ['Hommes', 'Femmes', 'Enfants'];
export const FILTER_CATEGORY_OPTIONS = ['Tous', 'Chaussures', 'Sport', 'Vêtements'];
export const FILTER_PRICE_OPTIONS = [
    { value: 'below', label: 'En dessous de 25 dt' },
    { value: 'between', label: 'Entre 25 dt et 75 dt' },
    { value: 'above', label: 'Au-dessus de 75 dt' }
];
export const FILTER_COLOR_OPTIONS = [
    '#00AB55',
    '#000000',
    '#FFFFFF',
    '#FFC0CB',
    '#FF4842',
    '#1890FF',
    '#94D82D',
    '#FFC107'
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
    isOpenFilter: PropTypes.bool,
    onResetFilter: PropTypes.func,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    formik: PropTypes.object
};

export default function ShopFilterSidebar({
    isOpenFilter,
    onResetFilter,
    onOpenFilter,
    onCloseFilter,
    formik
}) {
    const { values, getFieldProps, handleChange } = formik;

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

            <FormikProvider value={formik}>
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

                        <Scrollbar>
                            <Stack spacing={3} sx={{ p: 3 }}>
                                <div>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Sexe
                                    </Typography>
                                    <FormGroup>
                                        {FILTER_GENDER_OPTIONS.map((item, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        {...getFieldProps('gender')}
                                                        value={item}
                                                        checked={values.gender.includes(item)}
                                                    />
                                                }
                                                label={item}
                                            />
                                        ))}
                                    </FormGroup>
                                </div>

                                <div>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Categorie
                                    </Typography>
                                    <RadioGroup {...getFieldProps('category')}>
                                        {FILTER_CATEGORY_OPTIONS.map((item, index) => (
                                            <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Colors
                                    </Typography>
                                    <ColorManyPicker
                                        name="colors"
                                        colors={FILTER_COLOR_OPTIONS}
                                        onChange={handleChange}
                                        onChecked={(color) => values.colors.includes(color)}
                                        sx={{ maxWidth: 38 * 4 }}
                                    />
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
                                            />
                                        ))}
                                    </RadioGroup>
                                </div>


                            </Stack>
                        </Scrollbar>

                        <Box sx={{ p: 3 }}>
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
