import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';

const API_URL = 'http://localhost:8000/api/entreprise/';
class ProductService {


    //ajouter un produit
    addProduct(nom, prix, categorie, description, promotion, bodyFormData) {

        bodyFormData.append('nom', nom)
        bodyFormData.append('description', description)
        bodyFormData.append('categorie', categorie)
        bodyFormData.append('promotion', promotion)

        bodyFormData.append('prix', prix)

        return axios
            .post(API_URL + "produit/addproduit",

                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    getAll(value, filter, order, search) {
        if (value === null)
            value = 1;
        if (search === null) {
            return axios.get(API_URL + 'produit?page=' + value + '&filter=' + filter + '&order=' + order, { headers: authHeader() })
        } else
            return axios.get(API_URL + 'produit?page=' + value + '&filter=' + filter + '&order=' + order + '&search=' + search, { headers: authHeader() })
    }

    getAllNoPagination() {
        console.log(axios.get(API_URL + 'produit/all', { headers: authHeader() }))

        return axios.get(API_URL + 'produit/all', { headers: authHeader() })

    }

    show(id) {
        return axios.get(API_URL + 'produit/show/' + id, { headers: authHeader() })
    }
    //delete produit
    deleteProduit(id) {
        return axios
            .put(API_URL + "produit/delete/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    //delete image
    deleteImage(id) {
        return axios
            .put(API_URL + "produit/delete/image/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    //ajouter un produit
    updateProduct(id, nom, prix, categorie, description, promotion, bodyFormData) {

        bodyFormData.append('nom', nom)
        bodyFormData.append('description', description)
        bodyFormData.append('categorie', categorie)
        bodyFormData.append('promotion', promotion)

        bodyFormData.append('prix', prix)

        return axios
            .post(API_URL + "produit/updateProduit/" + id,

                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

}
export default new ProductService();