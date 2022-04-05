import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/';
class PromotionServices {

    //ajouter un promo
    addPromotion(nom, description, dateDebut, dateFin, pourcentage, bodyFormData) {

        bodyFormData.append('nom', nom)
        bodyFormData.append('description', description)
        bodyFormData.append('dateDebut', dateDebut)
        bodyFormData.append('dateFin', dateFin)
        bodyFormData.append('pourcentage', pourcentage)
        console.log(bodyFormData.nom)

        return axios
            .post(API_URL + "promotion/addpromotion",

                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    // get all promotion d une entreprise
    getAll() {
        return axios.get(API_URL + 'promotion', { headers: authHeader() })
    }


    //update un promo
    updatePromotion(nom, description, dateDebut, dateFin, pourcentage, bodyFormData, id) {

        bodyFormData.append('nom', nom)
        bodyFormData.append('description', description)
        bodyFormData.append('dateDebut', dateDebut)
        bodyFormData.append('dateFin', dateFin)
        bodyFormData.append('pourcentage', pourcentage)

        return axios
            .post(API_URL + "promotion/updatepromotion/" + id,

                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    getAllList(value) {

        return axios.get(API_URL + 'promotion/all?page=' + value, { headers: authHeader() })

    }

    deletePromotion(id) {
        return axios
            .put(API_URL + "promotion/deletepromotion/" + id, {

            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    show(id) {
        return axios.get(API_URL + 'promotion/show/' + id, { headers: authHeader() })
    }
}
export default new PromotionServices();