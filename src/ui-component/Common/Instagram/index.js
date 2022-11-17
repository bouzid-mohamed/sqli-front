import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { InstgramData } from './InstgramData';
import Heading from '../../Furniture/Heading'
import HeadingTwo from '../../Fashion/Heading'
import MediaServices from 'services/media-services/MediaServices';
import { useParams } from 'react-router';
import img1 from '../../../assets/img/instagram/post2.png'



const InstgramSlider = (props) => {
  const params = useParams()
  const [rows, setRows] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const [settings, setSettings] = useState(null);


  useEffect(() => {
    MediaServices.showInstagramSection(params.idE).then((res) => {
      setRows(res.data);
      setSettings({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }

        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
        ]
      })
      setIsloading(false)

    })

  }, []);
  return (
    <>
      {isLoading || rows.length === 0 ? (null) : (<>
        {props.container ? (
          <section id="instagram_area_one" style={{ marginTop: '50px', marginBottom: "50px" }}>
            <div className="container">
              <Heading heading="SUIVEZ-NOUS SUR INSTAGRAM" />
              <div className="row">
                <div className="col-lg-12">
                  <div className="instagram_post_slider">
                    <Slider {...settings}>
                      {rows.map((data, index) => (
                        <div className="instgram_post" key={index}>
                          <a href={data.url} target="_blank">
                            <i className="fa fa-instagram"></i>
                            <img style={{ height: '441px' }} src={data.image === null ? img1 : "http://localhost:8000/uploads/" + data.image} alt="img" />
                          </a>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (

          <section id="instagram_area_one" style={{ marginTop: '50px', marginBottom: "50px" }}>
            <div className="container-fluid">
              <HeadingTwo heading="SUIVEZ-NOUS SUR INSTAGRAM" para="Suivez-nous et soyez mis à jour depuis notre instagram" />
              <div className="row">
                <div className="col-lg-12">
                  <div className="instagram_post_slider">
                    <Slider {...settings}>
                      {rows.map((data, index) => (
                        <div className="instgram_post" key={index}>
                          <a href={data.url} target="_blank">
                            <i className="fa fa-instagram"></i>
                            <img style={{ height: '441px' }} src={data.image === null ? img1 : "http://localhost:8000/uploads/" + data.image} alt="img" />
                          </a>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
      )}
    </>

  )
}

export default InstgramSlider