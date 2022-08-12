import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import CommandeServices from 'services/commande-services/CommandeServices';
import ChartDataMonth from './chart-data/total-order-month-line-chart';




// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = (props) => {
    const [load, setLoad] = useState(true);

    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const successmain = theme.palette.success.main
    const [year, setYear] = useState(new Date().getFullYear());
    const [serie, setSerie] = useState([]);
    const [annee, setAnnee] = useState([]);

    const handleChangeYear = (e) => {
        setYear(e.target.value);
    }

    useEffect(() => {
        setLoad(true)
        setSerie([])
        CommandeServices.getLivreurStatics().then((res) => {
            let ser5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let ser7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let ser8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let tabAnnee = [];
            let gt = 0;
            let enCours = 0;
            let totalRetour = 0;
            let nbrRetour = 0;
            let TotalAnnule = 0;
            let nbrAnnule = 0;
            let nbrGain = 0;
            let nbrEnCour = 0;
            let stat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]



            res.data.filter((n) => {
                if (n.status === 'finie') {
                    gt += ((n.prix) * n.nbrCmd)
                    nbrGain += n.nbrCmd;
                    if (parseInt(n.year) === new Date().getFullYear()) {
                        stat[parseFloat(n.month) - 1] = ((n.prix) * n.nbrCmd)
                    }

                }
                else if (n.status === 'retour') {
                    totalRetour += ((n.prix) * n.nbrCmd)
                    nbrRetour += n.nbrCmd;

                }
                else if (n.status === 'affecterLivreur') {
                    enCours += ((n.prix) * n.nbrCmd)
                    nbrEnCour += n.nbrCmd;
                }
            })
            ChartDataMonth.series = [
                {
                    name: 'gain : Dt',
                    data: stat
                }
            ]
            res.data.filter((n) => {

                if (tabAnnee.indexOf(parseInt(n.year)) <= -1)
                    tabAnnee.push(parseInt(n.year))
                if (parseInt(n.year) === parseInt(year)) {
                    if (n.status === 'finie') {
                        ser5[parseInt(n.month) - 1] = n.nbrCmd
                    }
                    else if (n.status === 'retour') {
                        ser7[parseInt(n.month) - 1] = n.nbrCmd
                    }
                    else if (n.status === 'affecterLivreur') {
                        ser8[parseInt(n.month) - 1] = n.nbrCmd
                    }

                }
            })

            serie.push({
                name: 'Affecter à un livreur',
                data: ser8
            })
            serie.push({
                name: 'Finie',
                data: ser5
            })
            serie.push({
                name: 'Retour',
                data: ser7
            })

            chartData.series = serie

            setAnnee(tabAnnee)
            props.setGainTot(gt, enCours, totalRetour, nbrRetour, TotalAnnule, nbrAnnule, nbrGain, nbrEnCour, ChartDataMonth);

            setLoad(false)
        })
    }, [year]);

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, successmain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!load) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, successmain, load, year])


    return (
        <>
            {load ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Croissance totale</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3"> Année: {year}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={year}
                                        onChange={(e) => handleChangeYear(e)}
                                    >
                                        {annee.map((option) => (
                                            <MenuItem key={option} value={option} >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {!load ? (<>                            <Chart {...chartData} />
                            </>) : (null)}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};



export default TotalGrowthBarChart;
