import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ImageCarousel from './ImageCarousel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';




export default function ShowOne() {
    const images = [

        'product_19.jpg',
        'product_3.jpg',
        'product_4.jpg',
    ]

    return (
        <Card sx={{ display: 'flex' }}  >
            <CardMedia style={{ "maxWidth": "50%", "minWidth": "50%" }}   >
                <ImageCarousel images={images}></ImageCarousel>
            </CardMedia >
            <Box sx={{ display: 'flex', flexDirection: 'column' }} style={{ "maxWidth": "50%", "minWidth": "50%" }} sx={{ ml: 1 }}  >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Chaussure
                    </Typography>
                    <Typography component="div" variant="h3">
                        Nike Air Force 1 NDESTRUKT
                    </Typography>
                    <Typography color="text.secondary" variant="h3" color="text.primary" component="div" sx={{ mt: 3 }}>
                        <span style={{ 'textDecoration': 'line-through' }} >250.00 Dt</span>
                        <span style={{ 'marginLeft': '2%' }}  >150.00 Dt</span>

                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 3 }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mt: 3 }}>
                        Sélectionnez la taille  :
                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                            <Button variant="outlined" href="#outlined-buttons">
                                L
                            </Button>
                            <Button variant="outlined" href="#outlined-buttons">
                                M
                            </Button>
                            <Button variant="outlined" href="#outlined-buttons">
                                S
                            </Button>
                            <Button variant="outlined" href="#outlined-buttons">
                                XL
                            </Button>
                        </Stack>
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mt: 3 }}>
                        Sélectionnez  le couleur :
                        <Stack direction="row" spacing={2} sx={{ mt: 3 }} flexItem>
                            <Button variant="contained" style={{ "backgroundColor": "blue", "color": "blue" }} >
                                .
                            </Button>
                            <Button variant="contained" style={{ "backgroundColor": "black", "color": "black" }} >
                                .
                            </Button>
                            <Button variant="contained" style={{ "backgroundColor": "green", "color": "green" }} >
                                .
                            </Button>

                        </Stack>
                    </Typography>


                </CardContent>

            </Box>

        </Card >
    );
}
