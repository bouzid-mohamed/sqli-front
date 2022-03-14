// assets
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// constant


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const commandes = {
    id: 'commandes',
    title: 'Commandes',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Commandes',
            type: 'item',
            url: '/commandes',
            icon: LocalShippingIcon,
            breadcrumbs: false
        }
    ]
};

export default commandes;
