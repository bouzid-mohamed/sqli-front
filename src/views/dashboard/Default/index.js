import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
// ==============================|| DEFAULT DASHBOARD ||============================== //
const history = createBrowserHistory();
const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [gainTotal, setGainTotal] = useState(0);
    const [enCours, setEnCours] = useState(0);
    const [retour, setRetour] = useState(0);
    const [nbrRetour, setNbrRetour] = useState(0);
    const [annulee, setAnnulee] = useState(0);
    const [nbrAnnulee, setNbrAnnulee] = useState(0);
    const [stat, setStat] = useState([]);
    const [nbrGain, setNbrGain] = useState(0);
    const [nbrEnCours, setNbrEnCours] = useState(0);

    const pull_data = (data, enCours, totalRetour, nbrRetour, TotalAnnule, nbrAnnule, gain, nencour, s) => {
        setGainTotal(data);
        setEnCours(enCours);
        setRetour(totalRetour);
        setNbrRetour(nbrRetour);
        setAnnulee(TotalAnnule);
        setNbrAnnulee(nbrAnnule);
        setNbrGain(gain)
        setNbrEnCours(nencour)
        setStat(s)
        setLoading(false);


    }

    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (

            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard isLoading={isLoading} enCours={enCours} nbrEnCours={nbrEnCours} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard isLoading={isLoading} gainTotal={gainTotal} nbrGain={nbrGain} stat={stat} />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard isLoading={isLoading} retour={retour} nbrRetour={nbrRetour} />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard isLoading={isLoading} annulee={annulee} nbrAnnule={nbrAnnulee} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            <TotalGrowthBarChart setGainTot={pull_data} isLoading={isLoading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PopularCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    else {
        history.push('/login');
        window.location.reload();
    }






};

export default Dashboard;
