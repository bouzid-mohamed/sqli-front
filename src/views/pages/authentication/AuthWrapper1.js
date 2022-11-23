// material-ui
import { styled } from '@mui/material/styles';
import img1 from '../../../assets/img/marketing-intro.jpg'



// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    background: "linear-gradient(0deg,rgba(99,54,104,.74),rgba(57,70,92,.7)),url(http://localhost:3000/public/assets/img/marketing-intro.jpg) no-repeat",
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    minHeight: '100vh'
    //backgroundImage: `url(${process.env.PUBLIC_URL + '/images/erica-zhou-IHpUgFDn7zU-unsplash.jpg'})`,
}));

export default AuthWrapper1;
