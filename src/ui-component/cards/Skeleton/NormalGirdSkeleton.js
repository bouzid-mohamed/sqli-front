import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';

function Media() {
    return (

        <Grid container wrap="nowrap" scope="row" >

            <Typography animation="wave" sx={{ my: 1, ml: 0 }} variant="caption" component="div" style={{ 'width': "100%" }}   >
                <Skeleton height={50} />
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
