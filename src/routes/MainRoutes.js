import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';



// dashboard routing
const AddPromotion = Loadable(lazy(() => import('views/pages/promotion/addPromotion')));
const EditPromotion = Loadable(lazy(() => import('views/pages/promotion/editPromotion')));

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardPost = Loadable(lazy(() => import('views/dashboard/Default/DashboardPost')));
const DashboardLivreur = Loadable(lazy(() => import('views/dashboard/Default/DashboardLivreur')));
const AddPost = Loadable(lazy(() => import('views/pages/postes/addPost')));
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
const EditEntreprise = Loadable(lazy(() => import('views/pages/comptes/editEntreprise')));
const EditPoste = Loadable(lazy(() => import('views/pages/comptes/editPoste')));
const EditLivreur = Loadable(lazy(() => import('views/pages/comptes/editLivreur')));




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
const PostGirdViewCommandes = Loadable(lazy(() => import('views/pages/commandes/postGirdViewCommande')));
const LivreurGirdViewCommandes = Loadable(lazy(() => import('views/pages/commandes/livreurGirdViewCommande')));
const AddLivreur = Loadable(lazy(() => import('views/pages/livreur/addLivreur')));
const ListLivreur = Loadable(lazy(() => import('views/pages/livreur/listLivreur')));
const GirdViewPost = Loadable(lazy(() => import('views/pages/postes/GirdViewPost')));

const AboutBack = Loadable(lazy(() => import('views/pages/contenu/abouts')));

const Media = Loadable(lazy(() => import('views/pages/media/mediaGird')));
const EditMedia = Loadable(lazy(() => import('views/pages/media/editMedia')));







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
            path: 'post/girdView/commandes',
            element: <PostGirdViewCommandes />
        },
        {
            path: 'livreur/girdView/commandes',
            element: <LivreurGirdViewCommandes />
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
            path: '/post',
            element: <DashboardPost />
        },
        {
            path: '/livreur',
            element: <DashboardLivreur />
        },
        {
            path: '/post/add',
            element: <AddPost />
        },
        {
            path: '/post/livreur/add',
            element: <AddLivreur />
        },
        {
            path: '/account/edit',
            element: <EditEntreprise />
        },
        {
            path: '/account/post/edit',
            element: <EditPoste />
        },
        {
            path: '/account/livreur/edit',
            element: <EditLivreur />
        },
        {
            path: '/post/livreur/list',
            element: <ListLivreur />
        },
        {
            path: '/post/list',
            element: <GirdViewPost />
        },
        {
            path: '/about',
            element: <AboutBack />
        },
        {
            path: '/media',
            element: <Media />
        },
        {
            path: '/media/edit/:id',
            element: <EditMedia />
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
        },

    ]
};

export default MainRoutes;


