import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ImageCarousel from './ImageCarousel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import ShowProductSkeleton from 'ui-component/cards/Skeleton/ShowProductSkeleton';
import ProductServices from 'services/productServices/ProductServices';
import { useParams } from 'react-router';
import categorieStock from 'menu-items/categorieStock';
import { red } from '@mui/material/colors';






export default function ShowOne() {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);

    const params = useParams();

    useEffect(() => {
        ProductServices.show(params.id).then((res) => {
            setProduct(res.data[0]);
            res.data[0].images.map((img) => {
                images.push(img.nom)
            })
            setLoading(false)
            console.log(res.data[0].stoks)


        })
        // setTimeout(() => { setLoading(false); }, 2000);

    }, []);



    return (
        <>

            {isLoading ? (
                <ShowProductSkeleton loading={isLoading}></ShowProductSkeleton>
            ) : (
                <Card sx={{ display: 'flex' }}  >
                    <CardMedia style={{ "maxWidth": "50%", "minWidth": "50%" }}   >
                        <ImageCarousel images={images}></ImageCarousel>
                    </CardMedia >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} style={{ "maxWidth": "50%", "minWidth": "50%" }} sx={{ ml: 1 }}  >
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {product["categorie"].nom}
                            </Typography>
                            <Typography component="div" variant="h3">
                                {product.nom}
                            </Typography>
                            <Typography color="text.secondary" variant="h3" color="text.primary" component="div" sx={{ mt: 3 }}>

                                {product.promotion ? (
                                    <>
                                        <span style={{ 'textDecoration': 'line-through' }} >{product.prix} dt</span>
                                        <span style={{ 'marginLeft': '2%' }}  > {Math.trunc(product.prix - (product.prix * product.promotion.pourcentage / 100))} dt</span>
                                    </>
                                ) : (
                                    <span  >{product.prix} dt</span>


                                )}


                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 3 }}>
                                {product.description}
                            </Typography>
                            {product.stoks[0] != null ? (
                                <>
                                    <Typography variant="h5" component="div" sx={{ mt: 3 }}>
                                        Tailles  :
                                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>



                                            {product.stoks.map((stok) => (

                                                <Button key={stok.id} variant="outlined">
                                                    {stok.taille}
                                                </Button>



                                            ))}
                                        </Stack>


                                    </Typography>
                                    <Typography variant="h5" component="div" sx={{ mt: 3 }}>
                                        Couleurs :
                                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                            {product.stoks.map((stok) => (
                                                <Button key={stok.id} variant="contained" style={{ "backgroundColor": stok.couleur, "color": stok.couleur }} >
                                                    .
                                                </Button>

                                            ))}


                                        </Stack>
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h3" component="div" sx={{ mt: 3 }} style={{ 'color': "red" }}>
                                    Non disponible
                                </Typography>
                            )
                            }


                        </CardContent>

                    </Box>

                </Card >
            )}
        </>
    );
}
