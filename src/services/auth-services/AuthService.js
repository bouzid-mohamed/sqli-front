import axios from "axios";
import jwt_decode from 'jwt-decode';
import { createBrowserHistory } from 'history';
import authHeader from "./auth-header";
const API_URL = "http://localhost:8000/api/";
const API_URL2 = "http://localhost:8000/"

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
    forgotPassword(email) {
        return axios
            .post(API_URL2 + 'forgot_password/', {
                email,
            })
            .then((response) => {
                return response.data;
            });
    }
    forgotPasswordFront(email, id) {
        return axios
            .post(API_URL2 + 'forgot_password/?idE=' + id, {
                email,
            })
            .then((response) => {
                return response.data;
            });
    }
    changePassword(password, token) {
        return axios
            .post(API_URL2 + 'forgot_password/' + token, {
                password,
            })
            .then((response) => {
                return response.data;
            });
    }


    logout() {
        localStorage.removeItem("token");
        if (localStorage.getItem('user')) {
            localStorage.removeItem("user");
        }
    }
    // register(username, email, password) {
    // return axios.post(API_URL + "signup", {
    // username,
    //email,
    //password
    // });
    //}

    refrechToken() {
        let t = localStorage.getItem('refresh_token')
        let t1 = localStorage.getItem('token')
        return axios
            .post(API_URL + 'token/refresh', {
                'refresh_token': t
            })
            .then((response) => {
                if (response.data.token) {
                    var token = response.data.token;
                    localStorage.setItem('token', token);
                }


            });
    }
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
    getCurrentClient(id) {
        try {
            const token = localStorage.getItem('token');
            var decoded = jwt_decode(token);
            return decoded;
        } catch (err) {
            return ({ roles: ['any'] })
        }
    }
    show() {
        return axios.get(API_URL + 'getAuth', { headers: authHeader() })
    }
}
export default new AuthService();