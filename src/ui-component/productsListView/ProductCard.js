import PropTypes from 'prop-types';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
//
import Label from '../label/Label';
import ColorPreview from '../ColorPreview/ColorPreview';
import { useState } from 'react';



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

export default function ShopProductCard(props) {
    const product = props.product;
    const [redirect, setRedirect] = useState(false)
    const [idRedirect, setIdRedirect] = useState(false)


    if (redirect)
        return (<Navigate push to={"/products/show/" + idRedirect} />)
    return (
        <>

            <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    {(1 == 1) && (
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
                            {product.nom}
                        </Label>
                    )}

                    <ProductImgStyle style={{ cursor: 'pointer' }} onClick={() => {
                        const history = createBrowserHistory();
                        setIdRedirect(product.id)
                        history.push("/products/show/" + product.id);
                        setRedirect(true)
                    }} alt={product.nom} src={"http://localhost:8000/uploads/" + product.images[0].nom} />
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                        <Typography variant="subtitle2" noWrap>

                        </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        {product?.stoks.length > 0 ? (<>                        <ColorPreview product={product} />
                        </>) : (null)}

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

        </>
    );
}
