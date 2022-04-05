import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/bon';
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

    getAll(value) {
        return axios.get(API_URL + '/list/all?page=' + value, { headers: authHeader() })
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
}
export default new BonServices();