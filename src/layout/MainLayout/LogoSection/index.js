import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { useEffect, useState } from 'react';
import AuthService from 'services/auth-services/AuthService';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = (props) => {
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            setUser(props.user)

        }, [props.user],

    );

    return (

        <ButtonBase disableRipple component={Link} to={AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1 ? '/dashboard/default' : AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1 ? 'post' : AuthService.getCurrentUser().roles.indexOf("ROLE_LIVREUR") > -1 ? 'livreur' : '/login'}>
            <Logo user={user} />
        </ButtonBase>
    );

}
export default LogoSection;
