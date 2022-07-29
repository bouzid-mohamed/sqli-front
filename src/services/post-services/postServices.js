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

    getAll(value, search) {

        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL + '?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL + '?page=' + value + '&search=' + search, { headers: authHeader() })
        }
    }
    //update un company
    updatePost(email, numTel, gouvernerat, delegation, newPassword, password, bodyFormData, id) {

        bodyFormData.append('email', email)
        bodyFormData.append('numTel', numTel)
        bodyFormData.append('gouvernerat', gouvernerat)
        bodyFormData.append('delegation', delegation)
        bodyFormData.append('password', password)
        bodyFormData.append('newPassword', newPassword)
        return axios
            .post(API_URL + "/update/" + id,
                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    //delete livreur from poste
    deleteLivreur(id) {
        return axios
            .put(API_URL + "/livreur/delete/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

}
export default new PostService();