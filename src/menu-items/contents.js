// assets
import InstagramIcon from '@mui/icons-material/Instagram'; import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const contents = {
    id: 'contents',
    caption: 'Contenu',
    type: 'group',
    children: [
        {
            id: 'contenu',
            title: 'Contenu',
            type: 'collapse',
            icon: DesignServicesIcon,

            children: [

                {
                    id: 'aboutUs',
                    title: 'À propos',
                    type: 'item',
                    icon: InfoIcon,
                    url: 'about',
                    target: false
                },
                {
                    id: 'media',
                    title: 'Média',
                    type: 'item',
                    icon: BorderColorIcon,
                    url: '/media',
                    target: false
                },
                {
                    id: 'istagram',
                    title: 'Instagram section',
                    type: 'item',
                    icon: InstagramIcon,
                    url: '/instagram',
                    target: false
                },
            ],


        }
    ]
};

export default contents;
