import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/';
class LivreurServices {
    //liste livreur pour une poste
    getAll(value, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL + 'poste/Listlivreurs?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL + 'poste/Listlivreurs?page=' + value + '&search=' + search, { headers: authHeader() })
        }

    }
    //sans pagination
    getList() {
        return axios.get(API_URL + 'poste/livreurs', { headers: authHeader() })

    }


    //ajouter un compte livreur
    addLivreur(email, password, numTel, nom, prenom, typePermis) {
        return axios
            .post(API_URL + "poste/addlivreur", {
                email, password, numTel, nom, prenom, typePermis
            }, { headers: authHeader() })
            .then(response => {
                if (response.data.id) {
                    return response.data
                }
                return response.data;
            });
    }
    //update un livreur
    updateLivreur(nom, prenom, email, numTel, typePermis, newPassword, password, bodyFormData, id) {

        bodyFormData.append('nom', nom)
        bodyFormData.append('prenom', prenom)
        bodyFormData.append('email', email)
        bodyFormData.append('numTel', numTel)
        bodyFormData.append('typePermis', typePermis)
        bodyFormData.append('password', password)
        bodyFormData.append('newPassword', newPassword)
        return axios
            .post(API_URL + "livreur/update/" + id,
                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }




}
export default new LivreurServices();