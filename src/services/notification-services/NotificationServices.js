import axios from 'axios';
import authHeader from '../auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/';

class NotificationServices {
    getAll() {
        return axios.get(API_URL + 'notifications', { headers: authHeader() })

    }
    showEntreprise(id) {
        return axios.get(API_URL + 'entreprise/notifications/show/' + id, { headers: authHeader() })
    }
    showPoste(id) {
        return axios.get(API_URL + 'poste/notifications/show/' + id, { headers: authHeader() })
    }
    showLivreur(id) {
        return axios.get(API_URL + 'livreur/notifications/show/' + id, { headers: authHeader() })
    }
    //setVu
    updateNotification() {
        return axios
            .post(API_URL + "notifications/update", {
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }

}
export default new NotificationServices();