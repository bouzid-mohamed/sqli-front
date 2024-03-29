import { useState, useRef, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';
import AuthService from "services/auth-services/AuthService";
import { createBrowserHistory } from 'history';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = (props) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const history = createBrowserHistory();
    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        AuthService.logout();
        const history = createBrowserHistory();
        history.push("/login");
        window.location.reload();
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(
        () => {
            setUser(props.user)

        }, [props.user],
        () => {
            if (prevOpen.current === true && open === false) {
                anchorRef.current.focus();
            }

            prevOpen.current = open;
        }, [open]
    );

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={user != null ? "http://localhost:8000/uploads/" + user?.photo : "http://localhost:8000/uploads/loading.png"}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography variant="h4">Bonjour,</Typography>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                    {user?.nom}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">Administrateur de projet</Typography>
                                        </Stack>

                                        <Divider />
                                    </Box>
                                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                        <Box sx={{ p: 2 }}>

                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                {
                                                    (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) ? (
                                                        <>



                                                            <Link to={'/about'} style={{ textDecoration: 'none' }}>
                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 2}
                                                                >
                                                                    <ListItemIcon>
                                                                        <InfoIcon stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={

                                                                            <Typography variant="body2">À propos {user?.nom}</Typography>

                                                                        }
                                                                    />
                                                                </ListItemButton>
                                                            </Link>
                                                            <Link to={'/girdView/commandes?page=1'} style={{ textDecoration: 'none' }}>
                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 1}
                                                                >
                                                                    <ListItemIcon>

                                                                        <LocalShippingIcon stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={

                                                                            <Typography variant="body2">Mes commandes</Typography>

                                                                        }
                                                                    />
                                                                </ListItemButton>
                                                            </Link>
                                                            <Link to={'/home/' + user?.id} target="_blank" style={{ textDecoration: 'none' }}>
                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 3}

                                                                >
                                                                    <ListItemIcon>

                                                                        <AddShoppingCartIcon stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={

                                                                            <Typography variant="body2">Ma boutique</Typography>

                                                                        }
                                                                    />
                                                                </ListItemButton>
                                                            </Link>
                                                            <Link to={'/account/edit'} style={{ textDecoration: 'none' }}>
                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 0}
                                                                >
                                                                    <ListItemIcon>
                                                                        <IconSettings stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={<Typography variant="body2">Paramètres du compte</Typography>} />
                                                                </ListItemButton>
                                                            </Link>

                                                        </>
                                                    )


                                                        : (null)
                                                }
                                                {
                                                    (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1) ? (

                                                        <>
                                                            <Link to={'/post/girdView/commandes?page=1'} style={{ textDecoration: 'none' }}>
                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 0}
                                                                >
                                                                    <ListItemIcon>

                                                                        <LocalShippingIcon stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={

                                                                            <Typography variant="body2">Mes commandes</Typography>

                                                                        }
                                                                    />
                                                                </ListItemButton>
                                                            </Link>
                                                            <Link to={'/account/post/edit'} style={{ textDecoration: 'none' }}>
                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 1}
                                                                    onClick={(event) => handleListItemClick(event, 1, '/account/post/edit')}
                                                                >
                                                                    <ListItemIcon>
                                                                        <IconSettings stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={<Typography variant="body2">Paramètres du compte</Typography>} />
                                                                </ListItemButton>
                                                            </Link>
                                                        </>

                                                    ) : (null)
                                                }
                                                {
                                                    (AuthService.getCurrentUser().roles.indexOf("ROLE_LIVREUR") > -1) ? (
                                                        <>
                                                            <Link to={'/livreur/girdView/commandes?page=1'} style={{ textDecoration: 'none' }}>

                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 0}

                                                                >
                                                                    <ListItemIcon>

                                                                        <LocalShippingIcon stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={

                                                                            <Typography variant="body2">Mes commandes</Typography>

                                                                        }
                                                                    />
                                                                </ListItemButton>
                                                            </Link>
                                                            <Link to={'/account/livreur/edit'} style={{ textDecoration: 'none' }}>

                                                                <ListItemButton
                                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                                    selected={selectedIndex === 1}

                                                                >
                                                                    <ListItemIcon>
                                                                        <IconSettings stroke={1.5} size="1.3rem" />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={<Typography variant="body2">Paramètres du compte</Typography>} />
                                                                </ListItemButton>
                                                            </Link>
                                                        </>
                                                    ) : (null)
                                                }


                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Déconnexion</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
