import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/';
class LivreurServices {
    //liste livreur pour une poste
    getAll() {
        return axios.get(API_URL + 'poste/Listlivreurs', { headers: authHeader() })

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




}
export default new LivreurServices();