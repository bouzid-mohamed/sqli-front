import React, { useEffect, useState } from 'react'
import AboutTop from './AboutTop'
import Functionality from './Functionality'
import Feature from './Feature'
import Team from './Team'
import CompanyServices from 'services/companyServices/CompanyServices'
import { useParams } from 'react-router-dom';
import Loading from '../Common/loader'
import { useSelector } from 'react-redux'

const AboutComponent = () => {

    const [user, setUser] = useState(null);
    const params = useParams()
    const [loadcirular, setLoadcirular] = useState(true);
    const [img, setImg] = useState(null)
    let loadingEntreprise = useSelector((state) => state.products.loadingEntreprise)
    let entreprise = useSelector((state) => state.products.entreprise)

    return (
        <>
            {loadingEntreprise ? (<Loading></Loading>) : (<><AboutTop user={entreprise} img={entreprise.photoAbout != null ? "http://localhost:8000/uploads/" + entreprise.photoAbout : "http://localhost:8000/uploads/" + entreprise.photo.photo} />
                <Feature user={entreprise} /> </>)}

        </>
    )
}

export default AboutComponent
