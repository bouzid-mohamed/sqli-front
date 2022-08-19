import axios from 'axios';
import { useParams } from 'react-router';
import authHeader from 'services/auth-services/auth-header';

const API_URL = 'http://localhost:8000/api/entreprise/';
const API_URL1 = 'http://localhost:8000/';

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

            if (order === null) {
                return axios.get(API_URL + 'produit?page=' + value + '&filter=' + filter, { headers: authHeader() })

            } else {
                return axios.get(API_URL + 'produit?page=' + value + '&filter=' + filter + '&order=' + order, { headers: authHeader() })

            }

        } else
            if (order === null) {
                return axios.get(API_URL + 'produit?page=' + value + '&filter=' + filter + '&search=' + search, { headers: authHeader() })

            } else {
                return axios.get(API_URL + 'produit?page=' + value + '&filter=' + filter + '&order=' + order + '&search=' + search, { headers: authHeader() })

            }
    }

    getAllNoPagination() {

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

    getAllProductEntreprise(id, value, filter, order, search) {


        if (value === null)
            value = 1;
        if (search === null) {

            if (order === null) {
                return axios.get(API_URL1 + 'produits_entreprise/' + id + '?page=' + value + '&filter=' + filter)

            } else {
                return axios.get(API_URL1 + 'produits_entreprise/' + id + '?page=' + value + '&filter=' + filter + '&order=' + order)
            }

        } else
            if (order === null) {
                return axios.get(API_URL1 + 'produits_entreprise/' + id + '?page=' + value + '&filter=' + filter + '&search=' + search)

            } else {
                return axios.get(API_URL1 + 'produits_entreprise/' + id + '?page=' + value + '&filter=' + filter + '&order=' + order + '&search=' + search)

            }
    }
    showProductFront(idE, idP) {
        return axios.get(API_URL1 + 'show_produit/' + idE + '/' + idP)

    }

    showProductTriHome(idE) {
        return axios.get(API_URL1 + 'show_produits_home/' + idE)

    }


}
export default new ProductService();