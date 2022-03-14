import dashboard from './dashboard';
import produits from './produits';
//import utilities from './utilities';
//import other from './other';
import coupon from './couponPromotion';
import categorieStock from './categorieStock';
import commandes from './commande';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, commandes, produits, categorieStock, coupon]
};

export default menuItems;
