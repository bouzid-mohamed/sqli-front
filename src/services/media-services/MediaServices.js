import axios from 'axios';
import authHeader from 'services/auth-services/auth-header';
const API_URL = 'http://localhost:8000/api/';
const API_URL2 = 'http://localhost:8000/';
class MediaServices {

    //sans pagination
    getList() {
        return axios.get(API_URL + 'entreprise/medias', { headers: authHeader() })

    }
    getInstagramList() {
        return axios.get(API_URL + 'entreprise/instagram', { headers: authHeader() })

    }

    getAllMedia(id) {
        return axios.get(API_URL2 + 'show_medias/' + id)
    }



    updateMedia(titre, description, url, bodyFormData, id) {
        if (titre != '') {
            bodyFormData.append('titre', titre)
            bodyFormData.append('description', description)
            bodyFormData.append('url', url)
        }
        if (titre == '' && url != '') {
            bodyFormData.append('url', url)

        }
        return axios
            .post(API_URL + "entreprise/media/edit/" + id,
                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    addInstagram(url, bodyFormData) {
        bodyFormData.append('url', url)
        return axios
            .post(API_URL + "entreprise/instagram/add",
                bodyFormData, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }
    //afficher media
    show(id) {
        return axios.get(API_URL + 'entreprise/media/show/' + id, { headers: authHeader() })
    }
    //afficher instagram section
    showInstagramSection(id) {
        return axios.get(API_URL2 + 'instagramSection/' + id, { headers: authHeader() })
    }
    //delete stock
    deleteInstagram(id) {
        return axios
            .put(API_URL + "entreprise/instagram/delete/" + id, {
            }, { headers: authHeader() })
            .then(response => {
                return response.data;
            });
    }





}
export default new MediaServices();