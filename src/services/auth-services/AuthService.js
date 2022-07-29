import axios from "axios";
import jwt_decode from 'jwt-decode';
import { createBrowserHistory } from 'history';
import authHeader from "./auth-header";
const API_URL = "http://localhost:8000/api/";


export const history = createBrowserHistory();



class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + 'login', {
                email,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    var token = response.data.token;
                    localStorage.setItem('token', token);
                }

                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("token");
    }
    // register(username, email, password) {
    // return axios.post(API_URL + "signup", {
    // username,
    //email,
    //password
    // });
    //}
    getCurrentUser() {
        try {
            const token = localStorage.getItem('token');
            var decoded = jwt_decode(token);
            return decoded;
        } catch (err) {
            history.push('/login');
            window.location.reload();
        }
    }
    show() {
        return axios.get(API_URL + 'getAuth', { headers: authHeader() })
    }
}
export default new AuthService();