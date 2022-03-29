import axios from 'axios';
import { useParams } from 'react-router';
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

    getAll(value) {

        return axios.get(API_URL + 'produit?page=' + value, { headers: authHeader() })

    }

    getAllNoPagination() {
        console.log(axios.get(API_URL + 'produit/all', { headers: authHeader() }))

        return axios.get(API_URL + 'produit/all', { headers: authHeader() })

    }

    show(id) {
        return axios.get(API_URL + 'produit/show/' + id, { headers: authHeader() })
    }

}
export default new ProductService();