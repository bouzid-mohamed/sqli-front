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
            path: '/cart',
            element: <Cart />
        },
        {
            path: '/checkout',
            element: <CheckoutOne />
        },
        {
            path: '/aboutUs/:idE',
            element: <About />
        },
        {
            path: '/home/:idE',
            element: <Home />
        }

    ]
};

export default FrontRoutes;