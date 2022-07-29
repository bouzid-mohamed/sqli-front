// material-ui
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import AuthService from 'services/auth-services/AuthService';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {
    const theme = useTheme();
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            setUser(props.user)

        }, [props.user],

    );

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img     src={user != null ? "http://localhost:8000/uploads/" + user?.photo : null} alt="Berry" width="100" />
         *
         */
        <img src={user != null ? (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1 ? "http://localhost:8000/uploads/" + user?.photo : "http://localhost:8000/uploads/posteLogo.png") : "http://localhost:8000/uploads/avatar_entreprise.jpg"} alt="E-commerce" width="100" style={{ 'maxHeight': 50 }} />
    );
};

export default Logo;
