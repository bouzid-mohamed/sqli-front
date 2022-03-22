// material-ui
import ShowOne from 'ui-component/SingleProduct/showOne'


// project imports
import MainCard from 'ui-component/cards/MainCard';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import {
    BrowserRouter,
    useParams
} from "react-router-dom";
import { useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function ShowProduct() {
    const history = createBrowserHistory();
    // the dynamic pieces of the URL.
    let { id } = useParams();

    useEffect(() => {
        console.log(id)
    })

    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) {
        return (
            <MainCard title="les détails du produit">
                <ShowOne></ShowOne>
            </MainCard>

        );

    }
    else {
        history.push('/login');
        window.location.reload();
    }
}

