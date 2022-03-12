// material-ui
import { Typography } from '@mui/material';
import ShowOne from 'ui-component/SingleProduct/showOne'


// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const ShowProduct = () => (
    <MainCard title="Sample Card">
        <ShowOne></ShowOne>
    </MainCard>
);

export default ShowProduct;