import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    skeletonRadius: {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    }
}));



function Media(props) {
    const { loading = false } = props;
    const classes = useStyles();


    if (loading === true)

        return (
            <Grid container wrap="nowrap" scope="row" >
                <Box sx={{ my: 2 }}   >
                    <Skeleton variant="rectangular" sx={{ width: 150, height: 100 }} className={classes.skeletonRadius} />

                </Box>

            </Grid>
        );
    return null;
}

Media.propTypes = {
    loading: PropTypes.bool,
};


export default function GirdSkeleton(props) {
    const { loading } = props;
    if (loading === true)
        return (
            <Box sx={{ overflow: 'hidden' }}>
                <Media loading />
            </Box>
        );
    return null;
}
