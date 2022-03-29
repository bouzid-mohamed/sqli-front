import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/entreprise/';
class PromotionServices {
    // get all promotion d une entreprise
    getAll() {
        return axios.get(API_URL + 'promotion', { headers: authHeader() })
    }

    //ajouter un promo
    addPromotion(nom, description, dateDebut, dateFin, pourcentage, bodyFormData) {

        bodyFormData.append('nom', nom)
        bodyFormData.append('description', description)
        bodyFormData.append('dateDebut', dateDebut)
        bodyFormData.append('dateFin', dateFin)
        bodyFormData.append('pourcentage', pourcentage)

        return axios
            .post(API_URL + "promotion/addpromotion",

                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    getAllList(value) {

        return axios.get(API_URL + 'promotion/all?page=' + value, { headers: authHeader() })

    }
}
export default new PromotionServices();