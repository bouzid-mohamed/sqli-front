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
const Login = loadable(() => pMinDelay(import('views/pages/authentication/login'), 250), { fallback: <Loading /> });

const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const RegisterCompany = Loadable(lazy(() => import('views/pages/authentication/authentication3/RegisterCompany')));

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
            path: '/login/:idE',
            element: <Login />
        },
        {
            path: '/:idE/register/client',
            element: <AuthRegister3 />
        },
        {
            path: '/register/company',
            element: <RegisterCompany />
        }


    ]
};

export default AuthenticationRoutes;
