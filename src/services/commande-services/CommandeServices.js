import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/commande/';
const API_URL1 = 'http://localhost:8000/api/';


class CommandesServices {

    // get all commandes d une entreprise
    getAll(value) {
        return axios.get(API_URL + 'getAll?page=' + value, { headers: authHeader() })
    }
    //get all commande with role poste
    getAllRolePoste(value) {
        return axios.get(API_URL1 + 'poste/commande/getAllPoste?page=' + value, { headers: authHeader() })
    }
    //get all commande with role poste
    getAllRoleLivreur(value) {
        return axios.get(API_URL1 + 'livreur/commande/getAllLivreur?page=' + value, { headers: authHeader() })
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
    //etat finie 
    finirCommande(id) {
        return axios
            .post(API_URL1 + "livreur/commande/finirCommande/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    //retour commande
    retourCommande(id) {
        return axios
            .post(API_URL1 + "livreur/commande/retourCommande/" + id, {

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

    ConfirmationPoste(id) {
        return axios
            .post(API_URL1 + "poste/commande/confirmationposte/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }


    //affecter un livreur a une commande
    affecterLivreur(id, livreur) {
        return axios
            .post(API_URL1 + "poste/commande/affecterLivreur/" + id, {
                livreur
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

}
export default new CommandesServices();