import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/stock';
class StockServices {
    // get all promotion d une entreprise


    //ajouter un stock 
    addStock(produit, couleur, taille, quantite) {
        return axios
            .post(API_URL + "/addstock", {
                produit, couleur, taille, quantite
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    getAll(value) {
        return axios.get(API_URL + '?page=' + value, { headers: authHeader() })
    }
}
export default new StockServices();