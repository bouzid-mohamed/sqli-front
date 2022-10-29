import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import ProductSkeleton from 'ui-component/cards/Skeleton/ProductSkeleton';

// ----------------------------------------------------------------------

ProductList.propTypes = {
    products: PropTypes.array
};



export default function ProductList({ products, isLoading, ...other }) {




    return (
        <Grid container spacing={3} {...other}>
            {isLoading ? (


                <>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((product) => (
                        <Grid key={product} item xs={12} sm={6} md={3}>
                            <ProductSkeleton />
                        </Grid>
                    ))}

                </>
            ) : (

                <>
                    {products?.map((product) => (
                        <Grid key={product.id} item xs={12} sm={6} md={3}>
                            <ShopProductCard product={product} />
                        </Grid>
                    ))}

                </>

            )
            }

        </Grid >
    );

}

