
import Banner from '../../../ui-component/Common/Banner'
import AboutComponent from '../../../ui-component/About'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'

const About = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    return (
        <>{error404 === 0 ? (
            <>
                <Banner title="À PROPOS" />
                <AboutComponent />
            </>) : (<Error404></Error404>)}</>
    )
}

export default About