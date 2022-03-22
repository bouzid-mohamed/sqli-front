import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/';
class CategorieServices {

    getAll() {
        return axios.get(API_URL + 'categories', { headers: authHeader() })
    }
}
export default new CategorieServices();