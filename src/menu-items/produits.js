// assets
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import TocIcon from '@mui/icons-material/Toc';
import GridViewIcon from '@mui/icons-material/GridView';



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
                    id: 'register3',
                    title: 'Éléments',
                    type: 'item',
                    icon: GridViewIcon,
                    url: 'listView/products',
                    target: false
                }
            ]
        }
    ]
};

export default produits;
