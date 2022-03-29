import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/';
class CategorieServices {

    getAll() {
        return axios.get(API_URL + 'categories', { headers: authHeader() })
    }

    getAllPagination(value) {
        return axios.get(API_URL + 'categories/all?page=' + value, { headers: authHeader() })
    }
    //ajouter une categorie
    addCategorie(nom, categoriePere, categorieFils) {
        return axios
            .post(API_URL + "categorie/addCategorie", {
                nom, categoriePere, categorieFils
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}
export default new CategorieServices();