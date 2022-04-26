// material-ui

import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
// material
import { Button, Pagination, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import ProductSort from 'ui-component/productsListView/ProductSort';
import ProductList from 'ui-component/productsListView/ProductList';
import ProductCartWidget from 'ui-component/productsListView/ProductList';
import ProductFilterSidebar from 'ui-component/productsListView/ProductFilterSidebar';
import AddIcon from '@mui/icons-material/Add';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import ProductServices from 'services/productServices/ProductServices';
import { useLocation } from "react-router-dom";
import ProductSkeleton from 'ui-component/cards/Skeleton/ProductSkeleton';



// project imports



// ==============================|| SAMPLE PAGE ||============================== //
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function ListViewProducts() {
    const history = createBrowserHistory();
    const [openFilter, setOpenFilter] = useState(false);
    const [listproducts, setListProducts] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    let query = useQuery();
    const [page, setPage] = React.useState(parseInt(query.get("page")));
    const [isLoading, setLoading] = useState(true);




    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        history.push("/listView/products?page=" + value);
        window.location.reload();
    };
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
        resetForm();
    };

    useEffect(
        () => {
            ProductServices.getAll(query.get("page"), query.getAll("filter"), query.get('order')).then((res) => {
                setListProducts(res.data[0]);
                setNumberPages(res.data["pagination"])
                setLoading(false)

            })
        }, [],
    );

    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (
            <MainCard title="Liste des produits" style={{ "height": "100%" }} >
                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 5 }}
                >

                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                        <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}> <Button onClick={() => {
                            history.push('/products/add');
                            window.location.reload();
                        }} variant="outlined" startIcon={<AddIcon />}>
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
                <ProductList products={listproducts} isLoading={isLoading} />
                <ProductCartWidget />
                <Stack direction="row-reverse" marginTop={"3%"}>
                    <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
                </Stack>

            </MainCard>);
    else {
        history.push('/login');
        window.location.reload();
    }




};

//export default listViewProducts;