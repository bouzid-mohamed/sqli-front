// material-ui

import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import ProductSort from './ProductSort';
import ProductList from './ProductList';
import ProductCartWidget from './ProductList';
import ProductFilterSidebar from './ProductFilterSidebar';
import PRODUCTS from '../../utilities/products';

// project imports



// ==============================|| SAMPLE PAGE ||============================== //

export default function ListViewProducts() {

    const [openFilter, setOpenFilter] = useState(false);

    const formik = useFormik({
        initialValues: {
            gender: '',
            category: '',
            colors: '',
            priceRange: '',
            rating: ''
        },
        onSubmit: () => {
            setOpenFilter(false);
        }
    });

    const { resetForm, handleSubmit } = formik;

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleResetFilter = () => {
        handleSubmit();
        resetForm();
    };
    return (<MainCard title="Sample Card">


        <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
        >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProductFilterSidebar
                    formik={formik}
                    isOpenFilter={openFilter}
                    onResetFilter={handleResetFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                />
                <ProductSort />
            </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />

    </MainCard>);




};

//export default listViewProducts;