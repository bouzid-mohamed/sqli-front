// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://www.sqli-services.com/" target="_blank" underline="hover">
            sqli-services
        </Typography>

    </Stack>
);

export default AuthFooter;
