import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Modal, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import chartData from './chart-data/bajaj-area-chart';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import CommandeServices from 'services/commande-services/CommandeServices';
import Box from '@mui/material/Box';

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
    const [nbClient, setNbClient] = useState(0);
    const [clients, setClients] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {

        setSerie([])

        CommandeServices.getClientsLIvreurStat().then((res) => {
            let ser = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let nbrClient = 0;
            let tabAnnee = [];
            res.data.ClientsEvoData.filter((n) => {
                if (tabAnnee.indexOf(parseFloat(n.year)) <= -1)
                    tabAnnee.push(parseFloat(n.year))
                nbrClient += n.nbrClient;
                if (parseFloat(n.year) === new Date().getFullYear()) {
                    ser[parseInt(n.month) - 1] = n.nbrClient
                }

            })

            serie.push({
                name: 'nbr clients : ',
                data: ser
            })

            setNbClient(nbrClient)
            chartData.series = serie
            setClients(res.data.ClientsData)

        })



    }, [])

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Clients</Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard nbClient={nbClient} />
                            </Grid>
                            <Grid item xs={12}>
                                {clients.map((c, index) => (

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
                                                    {'Dt ' + c.prix}
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
                        <Button size="small" disableElevation onClick={handleOpen}>
                            Voir tout
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                    <Modal
                        open={open}
                        onClose={handleClose}
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
                                        {clients.map((c, index) => (

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
                                                            {'Dt ' + c.prix}
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
            )
            }
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
