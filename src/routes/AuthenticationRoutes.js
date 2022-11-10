import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import loadable from 'ui-component/Common/loader/loadable';
import pMinDelay from 'p-min-delay';
import Loading from '../ui-component/Common/loader';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthLogin2 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login2')));

const RegisterCompany = Loadable(lazy(() => import('views/pages/authentication/authentication3/RegisterCompany')));
const ForgotPassword = Loadable(lazy(() => import('views/pages/authentication/Forgot-password/Forgot-password')));
const ChangePassword = Loadable(lazy(() => import('views/pages/authentication/Forgot-password/Change-password')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },

        {
            path: '/register/company',
            element: <RegisterCompany />
        },
        {
            path: '/forgot_password',
            element: <ForgotPassword />
        },
        {
            path: '/forgot_password/:token',
            element: <ChangePassword />
        },



    ]
};

export default AuthenticationRoutes;
