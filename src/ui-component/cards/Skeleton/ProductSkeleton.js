import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@material-ui/core/styles';


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
      <Grid container wrap="nowrap" >
        <Box sx={{ width: 367, marginRight: 0.5, my: 5 }}  >
          <Skeleton variant="rectangular" width={367} height={378} className={classes.skeletonRadius} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="100%" />
          </Box>

        </Box>
      </Grid>
    );
  return null;
}

Media.propTypes = {
  loading: PropTypes.bool,
};


export default function ProductSkeleton(props) {
  const { loading } = props;
  if (loading === true)
    return (
      <Box sx={{ overflow: 'hidden' }}>
        <Media loading />
      </Box>
    );
  return null;
}
