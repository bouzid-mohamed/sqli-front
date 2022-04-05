import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';



// dashboard routing
const AddPromotion = Loadable(lazy(() => import('views/pages/promotion/addPromotion')));
const EditPromotion = Loadable(lazy(() => import('views/pages/promotion/editPromotion')));

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ListViewProducts = Loadable(lazy(() => import('views/pages/products/listViewProducts')));
const ProductGird = Loadable(lazy(() => import('views/pages/products/ProductGird')));
const AddProduct = Loadable(lazy(() => import('views/pages/products/addProduct')));
const ShowProduct = Loadable(lazy(() => import('views/pages/products/showProduct')));
const EditProduct = Loadable(lazy(() => import('views/pages/products/editProduct')));

const GirdViewBon = Loadable(lazy(() => import('views/pages/bon/girdViewBon')));
const AddBon = Loadable(lazy(() => import('views/pages/bon/addBon')));
const EditBon = Loadable(lazy(() => import('views/pages/bon/editBon')));

const GirdViewPromotion = Loadable(lazy(() => import('views/pages/promotion/girdViewPromotion')));
const GirdViewStock = Loadable(lazy(() => import('views/pages/stock/girdViewStock')));
const AddStock = Loadable(lazy(() => import('views/pages/stock/addStock')));
const EditStock = Loadable(lazy(() => import('views/pages/stock/editStock')));
const GirdViewCategorie = Loadable(lazy(() => import('views/pages/categorie/girdViewCategorie')));
const AddCtegorie = Loadable(lazy(() => import('views/pages/categorie/addCategories')));
const GirdViewCommandes = Loadable(lazy(() => import('views/pages/commandes/girdViewCommande')));




// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/tableView/products',
            element: <ProductGird />
        },
        {
            path: '/listView/products',
            element: <ListViewProducts />
        },
        {
            path: '/products/add',
            element: <AddProduct />
        },
        {
            path: '/products/show/:id',
            element: <ShowProduct />
        },
        {
            path: '/products/edit/:id',
            element: <EditProduct />
        },
        {
            path: '/girdView/bons',
            element: <GirdViewBon />
        },
        {
            path: '/bon/add',
            element: <AddBon />
        },
        {
            path: '/bon/edit/:id',
            element: <EditBon />
        },
        {
            path: '/girdView/promotion',
            element: <GirdViewPromotion />
        },
        {
            path: '/promotion/add',
            element: <AddPromotion />
        },
        {
            path: '/promotion/edit/:id',
            element: <EditPromotion />
        },
        {
            path: '/girdView/stock',
            element: <GirdViewStock />
        },
        {
            path: '/stock/add',
            element: <AddStock />
        },
        {
            path: '/stock/edit/:id',
            element: <EditStock />
        },
        {
            path: '/girdView/commandes',
            element: <GirdViewCommandes />
        },
        {
            path: '/girdView/categories',
            element: <GirdViewCategorie />
        },

        {
            path: '/categorie/add',
            element: <AddCtegorie />
        },


        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;


