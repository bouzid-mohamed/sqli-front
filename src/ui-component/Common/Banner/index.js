import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MediaServices from 'services/media-services/MediaServices';
import Loading from '../../../ui-component/Common/loader'

const Banner = (props) => {
    const [isLoading, setIsloading] = useState(true);
    const params = useParams();
    const [banner, setBanner] = useState();
    const [imageUrl, setImageUrl] = useState('')
    const imageUrl2 = 'http://localhost:8000/uploads/common_bg.1f243401.png'
    let load = useSelector((state) => state.products.loading)

    useEffect(() => {

        MediaServices.getAllMedia(params.idE).then((res) => {

            res.data.filter((m) => {
                if (m.nom === 1) {
                    setBanner(m)
                    setImageUrl("http://localhost:8000/uploads/" + m.image)
                }
            })
            setIsloading(false)

        })

    }, []);
    return (


        <>
            {isLoading ? (

                <Skeleton id="common_banner_one" sx={{ mt: -10, mb: 0 }} animation="wave" height={400} />

            ) : (<section id="common_banner_one" style={{ backgroundImage: `url("${imageUrl}")` }}>
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="common_banner_text">
                                <h2>{props.title}</h2>
                                <ul>
                                    <li><Link to={'/' + params.idE + "/home"}>Accueil</Link></li>
                                    <li className="slash">/</li>
                                    <li className="active">{props.title}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)}

        </>
    )
}

export default Banner