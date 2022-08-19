import axios from 'axios';
import authHeader from '../auth-services/auth-header';
const API_URL = 'http://localhost:8000/client/';
const API_URL1 = 'http://localhost:8000/api/client/';
class UserService {

  //ajouter un compte client 
  addClient(email, password, nom, prenom, numTel) {
    return axios
      .post(API_URL + "add", {
        email,
        password,
        nom,
        prenom,
        numTel
      })
      .then(response => {
        if (response.data.id) {
          //   localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  //update un client
  updateClient(nom, prenom, email, numTel, newPassword, password, bodyFormData, id) {

    bodyFormData.append('nom', nom)
    bodyFormData.append('prenom', prenom)
    bodyFormData.append('email', email)
    bodyFormData.append('numTel', numTel)
    bodyFormData.append('password', password)
    bodyFormData.append('newPassword', newPassword)
    return axios
      .post(API_URL1 + "update/" + id,
        bodyFormData, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }
}
export default new UserService();