import axios from "axios";
const API_URL = "https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json";
class GouverneratService {


    getAllDelegationAryana() {

        return axios.get(API_URL).then(function (response) {
            return response.data.Ariana.map((obj, index) => {
                return obj.delegation
            })
        });
    }
    getAllDelegationBizerte() {

        return axios.get(API_URL).then(function (response) {
            return response.data.Bizerte.map((obj, index) => {
                return obj.delegation
            })
        });
    }
    getAllDelegationManouba() {

        return axios.get(API_URL).then(function (response) {
            return response.data.Mannouba.map((obj, index) => {
                return obj.delegation
            })
        });
    }

}
export default new GouverneratService();
