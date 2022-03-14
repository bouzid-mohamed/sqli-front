// assets
import TocIcon from '@mui/icons-material/Toc';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CategoryIcon from '@mui/icons-material/Category';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const categorieStock = {
    id: 'ategorieStock',
    title: 'Categories & Stocks',
    caption: 'Categories & Stocks',
    type: 'group',
    children: [
        {
            id: 'categorie',
            title: 'Categories',
            type: 'collapse',
            icon: CategoryIcon,

            children: [

                {
                    id: 'girdCategorie',
                    title: 'Liste',
                    type: 'item',
                    icon: TocIcon,
                    url: 'girdView/categories',
                    target: false
                },
                {
                    id: 'addCategorie',
                    title: 'Ajouter une categ',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: 'categorie/add',
                    target: false
                }
            ],


        }, {
            id: 'stock',
            title: 'Stock',
            type: 'collapse',
            icon: Inventory2Icon,

            children: [

                {
                    id: 'girdstock',
                    title: 'Liste',
                    type: 'item',
                    icon: TocIcon,
                    url: 'girdView/stock',
                    target: false
                },
                {
                    id: 'addStock',
                    title: 'Ajouter un stock',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: 'stock/add',
                    target: false
                }
            ],


        }
    ]
};

export default categorieStock;
