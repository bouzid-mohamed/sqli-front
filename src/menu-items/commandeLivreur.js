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
            id: 'commande',
            title: 'Commandes',
            type: 'item',
            url: '/livreur/girdView/commandes?page=1',
            icon: LocalShippingIcon,
            breadcrumbs: false
        }
    ]
};

export default commandes;
