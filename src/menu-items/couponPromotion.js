// assets
import TocIcon from '@mui/icons-material/Toc';
import DiscountIcon from '@mui/icons-material/Discount';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PercentIcon from '@mui/icons-material/Percent';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const coupons = {
    id: 'Bon',
    title: 'Bons & promotions',
    caption: 'Bons & promotions',
    type: 'group',
    children: [
        {
            id: 'bon',
            title: 'Bons',
            type: 'collapse',
            icon: DiscountIcon,

            children: [

                {
                    id: 'girdbon',
                    title: 'Liste',
                    type: 'item',
                    icon: TocIcon,
                    url: 'girdView/bons?page=1',
                    target: false
                },
                {
                    id: 'addBon',
                    title: 'Ajouter un Bon',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: 'bon/add',
                    target: false
                }
            ],


        }, {
            id: 'promotion',
            title: 'Promotions',
            type: 'collapse',
            icon: PercentIcon,

            children: [

                {
                    id: 'girdpromotion',
                    title: 'Liste',
                    type: 'item',
                    icon: TocIcon,
                    url: 'girdView/promotion?page=1',
                    target: false
                },
                {
                    id: 'addPromotion',
                    title: 'Ajouter un promo',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: 'promotion/add',
                    target: false
                }
            ],


        }
    ]
};

export default coupons;
