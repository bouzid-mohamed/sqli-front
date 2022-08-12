import React, { useEffect, useState } from 'react'
import AboutTop from './AboutTop'
import Functionality from './Functionality'
import Feature from './Feature'
import Team from './Team'
import CompanyServices from 'services/companyServices/CompanyServices'
import { useParams } from 'react-router-dom';
import Loading from '../Common/loader'

const AboutComponent = () => {

    const [user, setUser] = useState(null);
    const params = useParams()
    const [loadcirular, setLoadcirular] = useState(true);
    const [img, setImg] = useState(null)
    useEffect(() => {
        CompanyServices.show(params.idE).then((res) => {
            setUser(res.data[0]);

            setLoadcirular(false);
            if (res.data[0].photoAbout != null) {
                setImg("http://localhost:8000/uploads/" + res.data[0].photoAbout)

            } else {
                setImg("http://localhost:8000/uploads/" + res.data[0].photo)

            }

        })
    }, [])
    return (
        <>
            {loadcirular ? (<Loading></Loading>) : (<><AboutTop user={user} img={img} loadcirular={loadcirular} />
                <Feature user={user} /> </>)}

        </>
    )
}

export default AboutComponent
