import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Stack } from '@mui/material';


const useStyles = makeStyles(() => ({
    skeletonRadius: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    }
}));



function Media(props) {
    const { loading = false } = props;
    const classes = useStyles();


    if (loading === true)

        return (
            <Grid container spacing={2} >
                <Box sx={{ width: "50%", marginRight: 0.5, my: 5 }}  >
                    <Skeleton variant="rectangular" width={"100%"} height={400} className={classes.skeletonRadius} />
                    <Stack direction="row" spacing={2} sx={{ mt: 3, mr: -10 }}  >
                        <Skeleton width={"20%"} height={200} />
                        <Skeleton width={"20%"} height={200} />
                        <Skeleton width={"20%"} height={200} />
                        <Skeleton width={"20%"} height={200} />

                    </Stack>


                </Box>
                <Box sx={{ width: "40%", marginLeft: 2, my: 5, mt: 6 }}  >
                    <Skeleton width="40%" />
                    <Skeleton width="40%" sx={{ mt: 2 }} />
                    <Skeleton width="100%" sx={{ mt: 3 }} />
                    <Skeleton width="100%" sx={{ mt: 3 }} />
                    <Skeleton width="100%" sx={{ mt: 3 }} />
                    <Skeleton width="40%" sx={{ mt: 2 }} />
                    <Skeleton variant="rectangular" width={"100%"} height={50} sx={{ mt: 2 }} />
                    <Skeleton width="40%" sx={{ mt: 2 }} />
                    <Skeleton variant="rectangular" width={"100%"} height={50} sx={{ mt: 2 }} />


                </Box>

            </Grid>
        );
    return null;
}

Media.propTypes = {
    loading: PropTypes.bool,
};


export default function ShowProductSkeleton(props) {
    const { loading } = props;
    if (loading === true)
        return (
            <Box sx={{ overflow: 'hidden' }}>
                <Media loading />
            </Box>
        );
    return null;
}
