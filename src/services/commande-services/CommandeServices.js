import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/commande/';
const API_URL1 = 'http://localhost:8000/api/';


class CommandesServices {

    // get all commandes d une entreprise
    getAll(value, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL + 'getAll?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL + 'getAll?page=' + value + '&search=' + search, { headers: authHeader() })
        }

    }
    //get all commande with role poste
    getAllRolePoste(value, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL1 + 'poste/commande/getAllPoste?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL1 + 'poste/commande/getAllPoste?page=' + value + '&search=' + search, { headers: authHeader() })
        }
    }
    //get all commande with role poste
    getAllRoleLivreur(value, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL1 + 'livreur/commande/getAllLivreur?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL1 + 'livreur/commande/getAllLivreur?page=' + value + '&search=' + search, { headers: authHeader() })
        }
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
    //stat entreprise
    getStatics() {
        return axios.get(API_URL1 + 'entreprise/statics', { headers: authHeader() })
    }
    //post stat
    getPostStatics() {
        return axios.get(API_URL1 + 'poste/statics', { headers: authHeader() })
    }
    //livreur stat
    getLivreurStatics() {
        return axios.get(API_URL1 + 'livreur/statics/', { headers: authHeader() })
    }
    //clients stat
    getClientEntrepriseStat() {
        return axios.get(API_URL1 + 'entreprise/clientsstatics', { headers: authHeader() })
    }
    //livreur poste stat
    getLivreurPostStat() {
        return axios.get(API_URL1 + 'poste/livreursstatics', { headers: authHeader() })
    }

    //livreur clients stat
    getClientsLIvreurStat() {
        return axios.get(API_URL1 + 'livreur/clientsstatics', { headers: authHeader() })
    }



}
export default new CommandesServices();