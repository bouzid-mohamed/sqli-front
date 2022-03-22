import axios from 'axios';
const API_URL = 'http://localhost:8000/entreprise/';
class CompanyService {

    //ajouter un compte client 
    addCompany(email, password, gouvernerat, delegation, numTel) {
        return axios
            .post(API_URL + "add", {
                email,
                password,
                gouvernerat,
                delegation,
                numTel
            })
            .then(response => {
                return response.data;
            });
    }

}
export default new CompanyService();