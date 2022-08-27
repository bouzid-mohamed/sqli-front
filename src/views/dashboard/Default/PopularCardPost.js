import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Modal, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCardPost';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import CommandeServices from 'services/commande-services/CommandeServices';
import LivreurServices from 'services/livreur-services/LivreurServices';
import chartData from './chart-data/bajaj-area-chart';
import { Box } from '@mui/system';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',

};
const PopularCard = ({ isLoading }) => {
    const theme = useTheme();
    const [serie, setSerie] = useState([]);
    const [nbLivreur, setNbLivreur] = useState(0);
    const [livreurs, setLivreurs] = useState([]);
    const [loa, setLoa] = useState(true);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [openmodal, setOpenmodal] = useState(false);

    const handleCheck = (val, array) => {
        return array.some(item => val === item.id);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);

    useEffect(() => {

        setSerie([])

        CommandeServices.getLivreurPostStat().then((res) => {
            let ser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let nbrLivreur = 0;
            let tabAnnee = [];
            res.data.commandesData.filter((n) => {
                if (tabAnnee.indexOf(parseFloat(n.year)) <= -1)
                    tabAnnee.push(parseFloat(n.year))
                nbrLivreur += n.nbrLivreur;
                if (parseFloat(n.year) === new Date().getFullYear()) {
                    ser[parseInt(n.month) - 1] = n.nbrLivreur
                }

            })

            serie.push({
                name: 'nbr livreurs : ',
                data: ser
            })

            setNbLivreur(nbrLivreur)
            chartData.series = serie
            LivreurServices.getList().then((resL) => {
                let livreur2 = [];
                res.data.livreurData.map((l) => {
                    livreur2.push({ 'nbrCmd': l.nbrCmd, id: l.id, email: l.email, nom: l.nom, prenom: l.prenom, numTel: l.numTel })

                })
                resL.data.filter((liv) => {
                    if (!handleCheck(liv.id, livreur2)) {
                        livreur2.push({ 'nbrCmd': 0, id: liv.id, email: liv.email, nom: liv.nom, prenom: liv.prenom, numTel: liv.numTel })
                        console.log(liv.id)

                    }

                })

                setLivreurs(livreur2)
                setLoa(false)

            })


        })



    }, [])

    return (
        <>
            {isLoading || loa ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Livreurs</Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard nbLivreurs={nbLivreur} />
                            </Grid>
                            <Grid item xs={12}>
                                {livreurs.map((c, index) => (

                                    < div key={index}>
                                        {index <= 4 ? (<>     <Grid container direction="column">
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {c.nom + ' ' + c.prenom}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>

                                                                <Typography variant="subtitle1" color="inherit">
                                                                    {c.nbrCmd + ' commande(s)'}
                                                                </Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                    {'Tél: ' + c.numTel}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                            {index < 4 ? (<Divider sx={{ my: 1.5 }} />) : (null)}
                                        </>) : (null)}
                                    </div >
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation onClick={handleOpenmodal}>
                            Voir tout
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                    <Modal
                        open={openmodal}
                        onClose={handleClosemodal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Liste des clients
                            </Typography>

                            <CardContent id="modal-modal-description">
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>

                                    </Grid>

                                    <Grid item xs={12}>
                                        {livreurs.map((c, index) => (

                                            < div key={index}>
                                                {<>     <Grid container direction="column">
                                                    <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="subtitle1" color="inherit">
                                                                    {c.nom + ' ' + c.prenom}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container alignItems="center" justifyContent="space-between">
                                                                    <Grid item>

                                                                        <Typography variant="subtitle1" color="inherit">
                                                                            {c.nbrCmd + ' commande(s)'}
                                                                        </Typography>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                            {'Tél: ' + c.numTel}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                    <Divider sx={{ my: 1.5 }} />
                                                </>}
                                            </div >
                                        ))}





                                    </Grid>
                                </Grid>
                            </CardContent>

                        </Box>
                    </Modal>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;