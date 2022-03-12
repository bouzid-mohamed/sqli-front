import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ImageCarousel from './ImageCarousel';
import { fCurrency } from 'views/utilities/FormatNumber';



export default function ShowOne() {
    const theme = useTheme();
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

                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Typography>
                </CardContent>

            </Box>

        </Card >
    );
}
