import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/';
class PromotionServices {

    getAll() {
        return axios.get(API_URL + 'promotion', { headers: authHeader() })
    }
}
export default new PromotionServices();