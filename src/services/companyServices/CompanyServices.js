import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/entreprise/';
const API_URL2 = 'http://localhost:8000/api/entreprise/';
const API_URL3 = 'http://localhost:8000/';
class CompanyService {

    //ajouter un compte client 
    addCompany(email, password, gouvernerat, delegation, numTel, nom) {
        return axios
            .post(API_URL + "add", {
                email,
                password,
                gouvernerat,
                delegation,
                numTel,
                nom
            })
            .then(response => {
                return response.data;
            });
    }

    //update un company
    updateCompany(nom, email, numTel, gouvernerat, delegation, newPassword, password, bodyFormData, id) {


        bodyFormData.append('nom', nom)
        bodyFormData.append('email', email)
        bodyFormData.append('numTel', numTel)
        bodyFormData.append('gouvernerat', gouvernerat)
        bodyFormData.append('delegation', delegation)
        bodyFormData.append('password', password)
        bodyFormData.append('newPassword', newPassword)
        return axios
            .post(API_URL2 + "update/" + id,
                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    updateAbout(textAbout, bodyFormData, id) {
        bodyFormData.append('text', textAbout)
        return axios
            .post(API_URL2 + "updateAboutUs/" + id,
                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

    //afficher entreprise 
    show(id) {
        return axios.get(API_URL3 + 'show_entreprise/' + id)
    }
    //modifier note
    updateNote(note, id) {

        return axios
            .post(API_URL3 + "update_Note/" + id, {
                note
            })
            .then(response => {
                return response.data;
            });
    }

}
export default new CompanyService();