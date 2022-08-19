import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/';
const API_URL2 = 'http://localhost:8000/';
class CategorieServices {

    getAll() {
        return axios.get(API_URL + 'categories', { headers: authHeader() })
    }
    getAllFront(id) {
        return axios.get(API_URL2 + 'show_categories_list/' + id)
    }

    getAllPagination(value, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL + 'categories/all?page=' + value, { headers: authHeader() })
        } else {
            return axios.get(API_URL + 'categories/all?page=' + value + '&search=' + search, { headers: authHeader() })

        }
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

    //delete categorie
    deleteCategorie(id) {
        return axios
            .put(API_URL + "categories/deleteCategorie/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
}
export default new CategorieServices();