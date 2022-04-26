import axios from 'axios';
import authHeader from '../auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/poste';
class PostService {

    //ajouter un compte poste
    addPost(email, password, numTel, gouvernerat, delegation) {
        return axios
            .post(API_URL + "/addposte", {
                email, password, numTel, gouvernerat, delegation
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.id) {
                    return response.data
                }
                return response.data;
            });
    }

    getAll(value) {
        return axios.get(API_URL + '?page=' + value, { headers: authHeader() })
    }

}
export default new PostService();