import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/bon';
const API_URL2 = 'http://localhost:8000/';
class BonServices {
    // get all promotion d une entreprise


    //ajouter un stock 
    addBon(code, reduction) {

        return axios
            .post(API_URL + "/addBon", {
                code, reduction
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    //modifier un bon 
    updateBon(code, reduction, id) {

        return axios
            .post(API_URL + "/updatebon/" + id, {
                code, reduction
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    getAll(value, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL + '/list/all?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL + '/list/all?page=' + value + '&search=' + search, { headers: authHeader() })

        }



    }
    //delete stock
    deleteBon(id) {
        return axios
            .put(API_URL + "/deletebon/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    show(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
    }
    verifBon(entreprise, code) {
        return axios.get(API_URL2 + 'verif_bon/' + entreprise + '/' + code)
    }
}
export default new BonServices();