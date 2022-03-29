import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material';


const useStyles = makeStyles(() => ({
    skeletonRadius: {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    }
}));
function Media() {
    const classes = useStyles();
    return (

        <Grid container wrap="nowrap" scope="row" >
            <Box sx={{ my: 2 }}   >
                <Skeleton animation="wave" variant="rectangular" sx={{ width: 150, height: 100 }} className={classes.skeletonRadius} />
            </Box>
            <Typography animation="wave" sx={{ my: 2, ml: 30 }} variant="caption" component="div" style={{ 'width': "100%" }}   >
                <Skeleton />
            </Typography >

        </Grid >

    );

}

Media.propTypes = {
    loading: PropTypes.bool,
};


export default function GirdSkeleton() {


    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media />
        </Box>
    );

}
