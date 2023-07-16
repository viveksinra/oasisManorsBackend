import "./amenityStle.css";
import Header from "../Components/Header/Header";
import { TopAbstract } from "../MyApp";
import Amenities from "../Components/Amenities/Amenities";
import Footer from "../Components/Footer/Footer";
function AmenitiesPage() {
  return (
    <main>
    <Header/>
    <TopAbstract/>
    <Amenities/>
    <Footer/>
    </main>
  )
}

export default AmenitiesPage