import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/commande/';
const API_URL1 = 'http://localhost:8000/api/';

class CommandesServices {

    // get all commandes d une entreprise
    getAll(value) {
        return axios.get(API_URL + 'getAll?page=' + value, { headers: authHeader() })
    }
    // changer les etats d une commande
    ConfirmerCommande(id) {
        return axios
            .post(API_URL + "confirmer/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    // etat affecter poste
    AffecterPoste(id) {
        return axios
            .post(API_URL + "affecterposte/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    // etat annulee
    Annulee(id) {
        return axios
            .post(API_URL1 + "annuleecommande/commande/annuleecommande/" + id, {
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }


}
export default new CommandesServices();