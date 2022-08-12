// assets
import TocIcon from '@mui/icons-material/Toc';
import InfoIcon from '@mui/icons-material/Info';
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
                }
            ],


        }
    ]
};

export default contents;
