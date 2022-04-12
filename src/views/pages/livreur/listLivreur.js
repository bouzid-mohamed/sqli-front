// material-ui
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import LivreurServices from 'services/livreur-services/LivreurServices';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
// ==============================|| SAMPLE PAGE ||============================== //

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);
    const [livreurs, setLivreurs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(
        () => {

            LivreurServices.getAll().then((res) => {
                setLivreurs(res.data)
                setLoading(false);
            });


        }, []);

    return (
        <MainCard title="Sample Card"   >

            <Grid container spacing={matchDownSM ? (0) : 2} direction="row-reverse" >

                {livreurs.map((l) => (


                    <Grid item xs={12} sm={3} key={l.id}>
                        <Card sx={{ maxWidth: 300, ml: 5 }}   >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    h
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>

                                    <Typography>
                                        h
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>

                ))}
            </Grid>

        </MainCard>
    );
}

