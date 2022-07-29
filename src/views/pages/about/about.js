import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import AboutComponent from '../../../ui-component/About'
import Footer from '../../../ui-component/Common/Footer'
const About = () => {
    return (
        <>
            <Header />
            <Banner title="About" />
            <AboutComponent />
            <Footer />
        </>
    )
}

export default About