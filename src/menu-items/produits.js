// assets
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import TocIcon from '@mui/icons-material/Toc';
import GridViewIcon from '@mui/icons-material/GridView';
import BorderColorIcon from '@mui/icons-material/BorderColor';



// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const produits = {
    id: 'produits',
    title: 'produits',
    caption: 'Liste des produits',
    type: 'group',
    children: [
        {
            id: 'produits',
            title: 'Produits',
            type: 'collapse',
            icon: ViewInArIcon,

            children: [
                {
                    id: 'tableView',
                    title: 'Liste',
                    type: 'item',
                    url: '/tableView/products',
                    icon: TocIcon,
                    target: false
                },
                {
                    id: 'girdview',
                    title: 'Éléments',
                    type: 'item',
                    icon: GridViewIcon,
                    url: 'listView/products',
                    target: false
                },
                {
                    id: 'addProduct',
                    title: 'Ajouter un produit',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: 'products/add',
                    target: false
                }
            ]
        }
    ]
};

export default produits;
