import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { useEffect, useState } from 'react';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = (props) => {
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            setUser(props.user)

        }, [props.user],

    );

    return (

        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <Logo user={user} />
        </ButtonBase>
    );

}
export default LogoSection;
