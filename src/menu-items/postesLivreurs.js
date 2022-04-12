import TocIcon from '@mui/icons-material/Toc';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


// constant
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const postesLivreurs = {
    id: 'addposte',
    title: 'postes & livreurs',
    type: 'group',
    children: [
        {
            id: 'postes',
            title: 'Postes',
            type: 'collapse',
            icon: AccountBalanceIcon,
            children: [
                {
                    id: 'listpostes',
                    title: 'Liste',
                    type: 'item',
                    icon: TocIcon,
                    url: 'girdView/promotion?page=1',
                    target: false
                },
                {
                    id: 'addPoste',
                    title: 'Ajouter une poste',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: 'post/add',
                    target: false
                }
            ],


        }, {
            id: 'livreurs',
            title: 'Livreurs',
            type: 'collapse',
            icon: DeliveryDiningIcon,
            children: [
                {
                    id: 'listLivreurs',
                    title: 'Liste',
                    type: 'item',
                    icon: TocIcon,
                    url: '/post/livreur/list?page=1',
                    target: false
                },
                {
                    id: 'addLivreur',
                    title: 'Ajouter un livreur',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: '/post/livreur/add',
                    target: false
                }
            ],


        }
    ]
};
export default postesLivreurs;
