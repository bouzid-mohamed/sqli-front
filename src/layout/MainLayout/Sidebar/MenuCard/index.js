import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AuthService from 'services/auth-services/AuthService';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    linearProgressClasses
} from '@mui/material';

// assets
// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#fff'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main
    }
}));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '157px',
        height: '157px',
        background: theme.palette.primary[200],
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
            <Grid item>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
                            Progrès
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <BorderLinearProgress variant="determinate" value={value} {...others} />
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

const MenuCard = () => {
    const theme = useTheme();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(
        () => {
            AuthService.show().then((res) => {
                setUser(res.data);
                setLoading(false)

            })

        }, [],

    );
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) {
        return (

            <CardStyle style={{ display: loading ? 'none' : '' }}>
                {loading ? ('...') : (<CardContent sx={{ p: 2 }}>
                    <List sx={{ p: 0, m: 0 }}>
                        <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                            <ListItemAvatar sx={{ mt: 0 }}>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        color: theme.palette.primary.main,
                                        border: 'none',
                                        borderColor: theme.palette.primary.main,
                                        background: '#fff',
                                        marginRight: '12px',
                                    }}

                                    src={user != null ? "http://localhost:8000/uploads/" + user?.photo : null}
                                >

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ mt: 0 }}
                                primary={
                                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                                        {AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1 ? (<>La poste</>) : AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1 ? (
                                            user?.nom
                                        ) : (user?.nom + ' ' + user?.prenom)}

                                    </Typography>
                                }
                                secondary={<Typography variant="caption">{(user.note / user.type).toFixed(1) + '/5'}  </Typography>}
                            />
                        </ListItem>
                    </List>
                    <LinearProgressWithLabel value={(user.note / user.type) * 20} />
                </CardContent>)}

            </CardStyle>
        );
    }
    else return (null)
};

export default MenuCard;
