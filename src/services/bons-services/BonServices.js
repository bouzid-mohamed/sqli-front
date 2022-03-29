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

    getAll(value) {
        return axios.get(API_URL + '/all?page=' + value, { headers: authHeader() })
    }
}
export default new BonServices();