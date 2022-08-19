import loadable from '../ui-component/Common/loader/loadable';
import Loading from '../ui-component/Common/loader';
import pMinDelay from 'p-min-delay';
import { LinearProgress } from '@mui/material';
const ShopLeftSideBar = loadable(() => pMinDelay(import('../views/pages/front/Shop/shop-left-sidebar'), 250), { fallback: <LinearProgress /> });
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

const FrontRoutes = {
    path: '/',
    children: [

        {
            path: '/shop/:idE',
            element: <ShopLeftSideBar />
        },

        {
            path: '/product-details/:idE/:id',
            element: <ProductDetailsTwo />
        },
        {
            path: '/cart/:idE',
            element: <Cart />
        },
        {
            path: '/checkout/:idE',
            element: <CheckoutOne />
        },
        {
            path: '/compare/:idE',
            element: <Compares />
        },
        {
            path: '/aboutUs/:idE',
            element: <About />
        },
        {
            path: '/wishlist/:idE',
            element: <WishLists />
        },
        {
            path: '/home/:idE',
            element: <Home />
        },
        {
            path: '/my-account/customer-order/:idE',
            element: <CustomerOrder />
        },
        {
            path: '/my-account/customer-account-details/:idE',
            element: <CustomerAccountDetails />

        },
        {
            path: '/account-edit/:idE',
            element: <AccountEdit />
        },
        {
            path: '/order-tracking/:idE',
            element: <OrderTracking />
        },
        {
            path: '/order-complete/:idE/:idOrder',
            element: <OrderComplete />
        },




    ]
};

export default FrontRoutes;