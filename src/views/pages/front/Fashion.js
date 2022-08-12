import React, { useEffect, useState } from 'react'
import Banner from '../../../ui-component/Fashion/Banner'
import BannerBottom from '../../../ui-component/Fashion/BannerBottom'
import HotProduct from '../../../ui-component/Fashion/HotProduct'
import Trending from '../../../ui-component/Fashion/Trending'
import TodayDeal from '../../../ui-component/Fashion/TodayDeal'
import Footer from '../../../ui-component/Common/Footer'
import Header from '../../../ui-component/Common/Header'
import MediaServices from 'services/media-services/MediaServices'
import Loading from '../../../ui-component/Common/loader'
import { useParams } from 'react-router'
import promotionServices from 'services/promotion-services/promotionServices'
import ProductServices from 'services/productServices/ProductServices'

const Fashion = () => {

    const [medias, setMedias] = useState([]);
    const [promos, setPromos] = useState([]);
    const [prodsPrix, setProdsPrix] = useState([]);
    const [prodsNouveaux, setProdsNouveaux] = useState([]);
    const [prodsPromotion, setProdsPromotion] = useState([]);
    const [prodsVendu, setProdsVendu] = useState([]);

    const [topmedia, setTopmedia] = useState();
    const [bottommedia, setBottommedia] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [isLoading2, setIsloading2] = useState(true);
    const [isLoading3, setIsloading3] = useState(true);
    const [isLoading4, setIsloading4] = useState(true);

    const params = useParams();

    useEffect(() => {
        MediaServices.getAllMedia(params.idE).then((res) => {
            setMedias(res.data);
            // data.push(allData[0])
            res.data.filter((m) => {
                if (m.nom === 2) {
                    setTopmedia(m)

                } if (m.nom === 3) {
                    setBottommedia(m)

                }

            })



            setIsloading(false)

        })
        promotionServices.getAllPageHome(params.idE).then((res) => {
            setPromos(res.data)
            setIsloading2(false)
        })
        ProductServices.showProductTriHome(params.idE).then((res) => {

            res.data[0].filter((p) => {
                let hov = ''
                let price = 0
                let label = ''
                let im = []
                if (p.images.length > 1)
                    hov = p.images[1].nom
                else hov = p.images[0].nom
                if (p.promotion) {
                    price = Math.trunc(p.prix - (p.prix * p.promotion.pourcentage / 100))
                    label = 'promo' + ' ' + p.promotion.pourcentage + '%'
                }
                else price = p.prix
                p.images.map((i) => {
                    im.push({
                        color: 'red', img: "http://localhost:8000/uploads/" + i.nom, quantity: 1,
                    })
                })

                prodsPrix.push({
                    id: p.id, labels: label, category: "fashion", img: "http://localhost:8000/uploads/" + p.images[0].nom, hover_img: "http://localhost:8000/uploads/" + hov,
                    title: p.nom,
                    price: price,
                    description: p.description,
                    rating: {
                        rate: 3.9,
                        count: 30
                    },
                    promotion: p.promotion,
                    categorie: p.categorie,
                    stoks: p.stoks,
                    entreprise: p.Entreprise,
                    color:
                        im

                })

            })
            res.data[1].filter((p) => {
                let hov = ''
                let price = 0
                let label = ''
                let im = []
                if (p.images.length > 1)
                    hov = p.images[1].nom
                else hov = p.images[0].nom
                if (p.promotion) {
                    price = Math.trunc(p.prix - (p.prix * p.promotion.pourcentage / 100))
                    label = 'promo' + ' ' + p.promotion.pourcentage + '%'
                }
                else price = p.prix
                p.images.map((i) => {
                    im.push({
                        color: 'red', img: "http://localhost:8000/uploads/" + i.nom, quantity: 1,
                    })
                })

                prodsNouveaux.push({
                    id: p.id, labels: label, category: "fashion", img: "http://localhost:8000/uploads/" + p.images[0].nom, hover_img: "http://localhost:8000/uploads/" + hov,
                    title: p.nom,
                    price: price,
                    description: p.description,
                    rating: {
                        rate: 3.9,
                        count: 30
                    },
                    promotion: p.promotion,
                    categorie: p.categorie,
                    stoks: p.stoks,
                    entreprise: p.Entreprise,
                    color:
                        im

                })

            })
            res.data[2].filter((p) => {
                let hov = ''
                let price = 0
                let label = ''
                let im = []
                if (p.images.length > 1)
                    hov = p.images[1].nom
                else hov = p.images[0].nom
                if (p.promotion) {
                    price = Math.trunc(p.prix - (p.prix * p.promotion.pourcentage / 100))
                    label = 'promo' + ' ' + p.promotion.pourcentage + '%'
                }
                else price = p.prix
                p.images.map((i) => {
                    im.push({
                        color: 'red', img: "http://localhost:8000/uploads/" + i.nom, quantity: 1,
                    })
                })

                prodsPromotion.push({
                    id: p.id, labels: label, category: "fashion", img: "http://localhost:8000/uploads/" + p.images[0].nom, hover_img: "http://localhost:8000/uploads/" + hov,
                    title: p.nom,
                    price: price,
                    description: p.description,
                    rating: {
                        rate: 3.9,
                        count: 30
                    },
                    promotion: p.promotion,
                    categorie: p.categorie,
                    stoks: p.stoks,
                    entreprise: p.Entreprise,
                    color:
                        im

                })

            })
            setIsloading3(false)

            res.data[3].filter((p) => {
                let hov = ''
                let price = 0
                let label = ''
                let im = []
                if (p.images.length > 1)
                    hov = p.images[1].nom
                else hov = p.images[0].nom
                if (p.promotion) {
                    price = Math.trunc(p.prix - (p.prix * p.promotion.pourcentage / 100))
                    label = 'promo' + ' ' + p.promotion.pourcentage + '%'
                }
                else price = p.prix
                p.images.map((i) => {
                    im.push({
                        color: 'red', img: "http://localhost:8000/uploads/" + i.nom, quantity: 1,
                    })
                })

                prodsVendu.push({
                    id: p.id, labels: label, category: "fashion", img: "http://localhost:8000/uploads/" + p.images[0].nom, hover_img: "http://localhost:8000/uploads/" + hov,
                    title: p.nom,
                    price: price,
                    description: p.description,
                    rating: {
                        rate: 3.9,
                        count: 30
                    },
                    promotion: p.promotion,
                    categorie: p.categorie,
                    stoks: p.stoks,
                    entreprise: p.Entreprise,
                    color:
                        im

                })

            })

            setIsloading4(false)
        })
    }, []);
    return (
        <>
            {isLoading || isLoading2 || isLoading3 || isLoading4 ? (<Loading />) : (<>  <Header />
                <Banner medias={topmedia} />
                {promos.length >= 5 ? (<BannerBottom promos={promos} />) : (null)}
                <HotProduct prods={[prodsPrix, prodsNouveaux, prodsPromotion, prodsVendu.length > 7 ? prodsVendu.slice(0, 7) : prodsVendu]} />
                <TodayDeal prods={prodsNouveaux} />
                <Trending medias={bottommedia} />
                <Footer /> </>)
            }

        </>
    )
}

export default Fashion