// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';
import { Box } from '@mui/system';
import { useState } from 'react';
import { createBrowserHistory } from 'history';
import AuthService from 'services/auth-services/AuthService';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = (props) => {
    let dispatch = useDispatch();
    const theme = useTheme();
    const [countR, setCountR] = useState(10)
    const [path, setPath] = useState('')
    const navigate = useNavigate()
    const showNotification = (id) => {
        props.handleToggle();
        if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) {
            dispatch({ type: "notifications/setByid", payload: id })
            navigate({ pathname: "/girdView/commandes", search: `?byId=${id}` })
        } else if (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1) {
            dispatch({ type: "notifications/setByid", payload: id })
            navigate({ pathname: "/post/girdView/commandes", search: `?byId=${id}` })
        } else if (AuthService.getCurrentUser().roles.indexOf("ROLE_LIVREUR") > -1) {
            navigate({ pathname: "/livreur/girdView/commandes", search: `?byId=${id}` })
            dispatch({ type: "notifications/setByid", payload: id })

        }

    }
    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {props.isLoading ? (<Grid item xs={12}>
                <Box sx={{ px: 2, pt: 0.25 }}>
                    <LinearProgress style={{ width: '300px' }} />
                </Box>
            </Grid>) : (<>
                {props.rows.slice(0, countR).map((row) => (
                    <div key={row.id} >
                        <ListItemWrapper onClick={() => showNotification(row.commande.id)}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar alt="John Doe" src={"http://localhost:8000/uploads/" + row.commande.client.photo} />
                                </ListItemAvatar>
                                <ListItemText primary={"Commande de " + row.commande.client.nom} />
                                <ListItemSecondaryAction>
                                    <Grid container justifyContent="flex-end">

                                    </Grid>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Grid container direction="column" className="list-container">
                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="subtitle2">{row.text}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>

                                        <Grid item>
                                            <Chip label={row.commande.status} sx={chipWarningSX} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItemWrapper>
                        <Divider />

                    </div>

                ))}

                <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    {props.rows.length > countR ? (<Button size="small" onClick={() => {
                        setCountR(countR + 10)
                    }} disableElevation>
                        Voir plus
                    </Button>) : (null)}

                </CardActions>
            </>)}

        </List>
    );
};

export default NotificationList;
