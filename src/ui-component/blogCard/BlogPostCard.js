import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
//
import SvgIconStyle from './SvgIconStyle';
import ElevatorIcon from '@mui/icons-material/Elevator';
import { deepPurple } from '@mui/material/colors';
// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
    position: 'relative',
    paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled('div')({
    height: 80,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'
});



const AvatarStyle = styled(Avatar)(({ theme }) => ({
    zIndex: 9,
    width: 32,
    height: 32,
    position: 'absolute',
    left: theme.spacing(3),
    bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
    post: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default function BlogPostCard({ post, index }) {
    const { photo, nom, id, numTel, prenom, email, typePermis } = post;
    const latestPostLarge = index === 0;
    const latestPost = index === 1 || index === 2;

    const POST_INFO = [
        { number: nom, icon: 'eva:message-circle-fill' },
        { number: 10, icon: 'eva:eye-fill' },
        { number: 11, icon: 'eva:share-fill' }
    ];

    return (
        <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
            <Card sx={{ position: 'relative' }}>
                <CardMediaStyle
                    sx={{
                        ...((latestPostLarge || latestPost) && {
                            pt: 'calc(100% * 4 / 3)',
                            '&:after': {
                                top: 0,
                                content: "''",
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                            }
                        }),
                        ...(latestPostLarge && {
                            pt: {
                                xs: 'calc(100% * 4 / 3)',
                                sm: 'calc(100% * 3 / 4.66)'
                            }
                        })
                    }}
                >
                    <SvgIconStyle
                        color="paper"
                        src="/static/icons/shape-avatar.svg"
                        sx={{
                            width: 80,
                            height: 36,
                            zIndex: 9,
                            bottom: -15,
                            position: 'absolute',
                            ...((latestPostLarge || latestPost) && { display: 'none' })
                        }}
                    />
                    <AvatarStyle

                        sx={{
                            ...((latestPostLarge || latestPost) && {
                                zIndex: 9,
                                top: 24,
                                left: 24,
                                width: 50,
                                height: 50,


                            })
                        }}
                    > {typePermis}</AvatarStyle>

                    <CoverImgStyle alt={"Ecommmerce"} src={"http://localhost:8000/uploads/" + photo} />
                </CardMediaStyle>

                <CardContent
                    sx={{
                        pt: 4,
                        ...((latestPostLarge || latestPost) && {
                            bottom: 0,
                            width: '100%',
                            position: 'absolute'
                        })
                    }}
                >

                    <TitleStyle
                        to="#"
                        color="inherit"
                        variant="subtitle2"
                        underline="none"
                        component={RouterLink}
                        sx={{
                            ...(latestPostLarge && { typography: 'h5', height: 60 }),
                            ...((latestPostLarge || latestPost) && {
                                color: 'common.white'
                            })
                        }}
                    >
                        {nom + ' ' + prenom}
                    </TitleStyle>


                    <TitleStyle
                        to="#"
                        color="inherit"
                        variant="subtitle2"
                        underline="none"
                        component={RouterLink}
                        sx={{
                            ...(latestPostLarge && { typography: 'h6', height: 60 }),
                            ...((latestPostLarge || latestPost) && {
                                color: 'common.white'
                            })
                        }}
                    >
                        {'Email' + ': ' + email}
                        <p>{'Num Tel: ' + numTel}</p>

                    </TitleStyle>

                    <InfoStyle>

                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: index === 0 ? 0 : 1.5,
                                ...((latestPostLarge || latestPost) && {
                                    color: 'grey.500'
                                })
                            }}
                        >
                            Permis type : {typePermis}
                        </Box>

                    </InfoStyle>
                </CardContent>
            </Card>
        </Grid>
    );
}