// material-ui

import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
// material
import { Button, Divider, IconButton, InputBase, Pagination, Paper, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import ProductSort from 'ui-component/productsListView/ProductSort';
import ProductList from 'ui-component/productsListView/ProductList';
import ProductCartWidget from 'ui-component/productsListView/ProductList';
import ProductFilterSidebar from 'ui-component/productsListView/ProductFilterSidebar';
import AddIcon from '@mui/icons-material/Add';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import ProductServices from 'services/productServices/ProductServices';
import { Link, useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
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
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [filter, setFilter] = React.useState(query.get("filter") != null ? (query.get("filter")) : []);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState(query.get("search") != null ? (query.get("search")) : '');
    const [reload, setRelaoad] = useState(1);
    const [order, setOrder] = React.useState(query.get("order") != null ? (query.get("order")) : 0);



    const handleOrder = (value) => {
        let link = value === 'recent' ? 'products?page=1' : 'products?page=1&order=' + value
        const history = createBrowserHistory();
        history.push(link);
        setRelaoad(reload + 1)

    }
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        if (filter.length > 0) {
            history.push("/listView/products?page=" + value + '&filter=' + filter);
        } else if (searchValue != '') {
            history.push("/listView/products?page=" + value + "&search=" + searchValue);
        }
        else {
            history.push("/listView/products?page=" + value);
        }
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
            setLoading(true);
            ProductServices.getAll(page, filter, order, searchValue).then((res) => {
                setListProducts(res.data[0]);
                setNumberPages(res.data["pagination"])
                setLoading(false)

            })
        }, [page, reload],
    );

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/listView/products?page=1&search=" + searchValue);
            setRelaoad(reload + 1)
        }
    }
    const handleSubmitFilter = (list, price) => {
        setFilter(list)
        setOrder(price)
        let link = price === 0 ? 'products?page=1&filter=' + list : 'products?page=1&filter=' + list + '&order=' + price
        const history = createBrowserHistory();
        history.push(link);
        setPage(1)
        setRelaoad(reload + 1)
    }

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

                        <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                            <Link to={'/products/add'} style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" startIcon={<AddIcon />}>
                                    Ajouter
                                </Button>
                            </Link>
                        </Stack>
                        <ProductFilterSidebar
                            formik={formik}
                            isOpenFilter={openFilter}
                            onResetFilter={handleResetFilter}
                            onOpenFilter={handleOpenFilter}
                            onCloseFilter={handleCloseFilter}
                            handleSubmit={handleSubmitFilter}
                        />
                        <ProductSort handleOrder={handleOrder} />

                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    flexWrap="wrap-reverse"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ mb: 4 }}
                >

                    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                        <Paper style={{ 'border': "1px solid #5e35b1" }}
                            component="form"
                            sx={{ display: 'flex', alignItems: 'center', width: 400 }}
                        >

                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Rechercher"
                                inputProps={{
                                    'aria-label': 'Rechercher'
                                }}
                                value={searchValue}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}


                            />
                            <IconButton onClick={event => {
                                history.push("/listView/products?page=1&search=" + searchValue);
                                setRelaoad(reload + 1)
                            }}

                                aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                        </Paper>
                    </Stack>

                </Stack>

                <ProductList products={listproducts} isLoading={isLoading} />
                <ProductCartWidget />
                <Stack direction="row-reverse" marginTop={"2%"}>
                    <Pagination color="primary" page={page} count={numberPages} variant="outlined" onChange={handleChange} />
                </Stack>

            </MainCard>);
    else {
        history.push('/login');
        window.location.reload();
    }




};

//export default listViewProducts;