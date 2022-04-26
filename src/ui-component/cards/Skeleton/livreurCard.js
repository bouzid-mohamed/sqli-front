import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    skeletonRadius: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20

    }
}));



function Media(props) {
    const classes = useStyles();



    return (
        <Grid container wrap="nowrap" >
            <Box sx={{ width: 367, marginRight: 0.5, my: 5 }}  >
                <Skeleton animation="wave" variant="rectangular" width={367} height={486} className={classes.skeletonRadius} />
            </Box>
        </Grid>
    );

}




export default function ProductSkeleton() {

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media loading />
        </Box>
    );

}
