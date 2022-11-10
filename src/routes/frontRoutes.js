import loadable from '../ui-component/Common/loader/loadable';
import Loading from '../ui-component/Common/loader';
import pMinDelay from 'p-min-delay';
import { LinearProgress } from '@mui/material';

const ShopLeftSideBar = loadable(() => pMinDelay(import('../views/pages/front/Shop/shop-left-sidebar'), 250), { fallback: <LinearProgress /> });
const Header = loadable(() => pMinDelay(import('ui-component/Common/Header'), 250), { fallback: <LinearProgress /> });
const ProductDetailsTwo = loadable(() => pMinDelay(import('../views/pages/front/Shop/product-details-two'), 250), { fallback: <LinearProgress /> });
const Cart = loadable(() => pMinDelay(import('../views/pages/cart'), 250), { fallback: <LinearProgress /> });
const CheckoutOne = loadable(() => pMinDelay(import('../views/pages/checkout'), 250), { fallback: <LinearProgress /> });
const About = loadable(() => pMinDelay(import('../views/pages/about/about'), 250), { fallback: <LinearProgress /> });
const Home = loadable(() => pMinDelay(import('../views/pages/front/Fashion'), 250), { fallback: <LinearProgress /> });
const Compares = loadable(() => pMinDelay(import('../views/pages/front/Shop/compares'), 250), { fallback: <LinearProgress /> });
const CustomerOrder = loadable(() => pMinDelay(import('../views/pages/my-account/customer-order'), 250), { fallback: <LinearProgress /> });
const AccountEdit = loadable(() => pMinDelay(import('../views/pages/my-account/account-edit'), 250), { fallback: <LinearProgress /> });
const WishLists = loadable(() => pMinDelay(import('../views/pages/front/Shop/wishList'), 250), { fallback: <LinearProgress /> });
const CustomerAccountDetails = loadable(() => pMinDelay(import('../views/pages/my-account/customer-account-details'), 250), { fallback: <LinearProgress /> });
const OrderComplete = loadable(() => pMinDelay(import('../views/pages/order/order-complete'), 250), { fallback: <LinearProgress /> });
const OrderTracking = loadable(() => pMinDelay(import('../views/pages/order/order-tracking'), 250), { fallback: <LinearProgress /> });
const Login = loadable(() => pMinDelay(import('views/pages/authentication/login'), 250), { fallback: <Loading /> });
const AuthRegister3 = loadable(() => pMinDelay(import('views/pages/authentication/authentication3/Register3'), 250), { fallback: <Loading /> });
const Forgot = loadable(() => pMinDelay(import('views/pages/authentication/Forgot'), 250), { fallback: <Loading /> });
const ChangePass = loadable(() => pMinDelay(import('views/pages/authentication/ChangePassword'), 250), { fallback: <Loading /> });

const FrontRoutes = {
    path: '/:idE',
    element: <Header />,
    children: [

        {
            path: '/shop',
            element: <ShopLeftSideBar />
        },

        {
            path: '/product-details/:id',
            element: <ProductDetailsTwo />
        },
        {
            path: '/cart',
            element: <Cart />
        },
        {
            path: '/checkout',
            element: <CheckoutOne />
        },
        {
            path: '/compare',
            element: <Compares />
        },
        {
            path: '/aboutUs',
            element: <About />
        },
        {
            path: '/wishlist',
            element: <WishLists />
        },
        {
            path: '/home',
            element: <Home />
        },
        {
            path: '/my-account/customer-order/',
            element: <CustomerOrder />
        },
        {
            path: '/my-account/customer-account-details',
            element: <CustomerAccountDetails />

        },
        {
            path: '/account-edit',
            element: <AccountEdit />
        },
        {
            path: '/order-tracking',
            element: <OrderTracking />
        },
        {
            path: '/order-complete/:idOrder',
            element: <OrderComplete />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register/client',
            element: <AuthRegister3 />
        },
        {
            path: '/forgot',
            element: <Forgot />
        },
        {
            path: '/forgot/:token',
            element: <ChangePass />
        }
    ]
};

export default FrontRoutes;