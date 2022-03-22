import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../views/utilities/FormatNumber';
//
import Label from '../label/Label';
import ColorPreview from '../ColorPreview/ColorPreview';
import { useEffect, useState } from 'react';
import ProductSkeleton from 'ui-component/cards/Skeleton/ProductSkeleton';


// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
    product: PropTypes.object
};

export default function ShopProductCard({ product }) {
    const { name, cover, price, colors, status, priceSale } = product;
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //setTimeout(() => { setLoading(false); }, 2000);
        setLoading(false);
    }, []);

    return (
        <>
            {isLoading ? (
                <ProductSkeleton loading={isLoading}></ProductSkeleton>
            ) : (
                <Card>
                    <Box sx={{ pt: '100%', position: 'relative' }}>
                        {(new Date(product.createdAt.timestamp)).getMonth() == (new Date()).getMonth && (
                            <Label
                                variant="filled"
                                color={('sale' === 'sale' && 'error') || 'info'}
                                sx={{
                                    zIndex: 9,
                                    top: 16,
                                    right: 16,
                                    position: 'absolute',
                                    textTransform: 'uppercase'
                                }}
                            >
                                new
                            </Label>
                        )}
                        <ProductImgStyle alt={product.nom} src={"http://localhost:8000/uploads/" + product.images[0].nom} />
                    </Box>

                    <Stack spacing={2} sx={{ p: 3 }}>
                        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                            <Typography variant="subtitle2" noWrap>

                            </Typography>
                        </Link>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <ColorPreview colors={["red", "green", "blue"]} />
                            <Box sx={{ display: 'inline-flex' }} variant="subtitle1">
                                {product.promotion ? (
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            sx={{
                                                color: 'text.disabled',
                                                textDecoration: 'line-through'
                                            }}
                                        >
                                            {product.prix} dt



                                        </Typography>
                                        &nbsp;
                                        {Math.trunc(product.prix - (product.prix * product.promotion.pourcentage / 100))} dt
                                    </>
                                ) : (
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        sx={{
                                            color: 'text.disabled',
                                        }}
                                    >
                                        {product.prix} dt

                                    </Typography>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </Card>
            )}
        </>
    );
}
