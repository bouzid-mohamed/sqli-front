// material-ui

import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Button, Pagination, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import ProductSort from 'ui-component/productsListView/ProductSort';
import ProductList from 'ui-component/productsListView/ProductList';
import ProductCartWidget from 'ui-component/productsListView/ProductList';
import ProductFilterSidebar from 'ui-component/productsListView/ProductFilterSidebar';
import PRODUCTS from '../../utilities/products';
import AddIcon from '@mui/icons-material/Add';

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
    return (<MainCard title="Liste des produits">




        <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
        >

            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}> <Button variant="outlined" startIcon={<AddIcon />}>
                    Ajouter
                </Button></Stack>

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
        <Stack direction="row-reverse" marginTop={"3%"}>
            <Pagination color="primary" count={10} variant="outlined" />
        </Stack>

    </MainCard>);




};

//export default listViewProducts;