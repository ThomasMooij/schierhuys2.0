import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// NL IMPORTS
import Home from "./pages/Home";
import PaySummary from "./components/pay/PaySummary";
import ReviewComponent from "./components/home/ReviewComponent"
import InfoComponent from "./components/home/InfoComponent"
import OmgevingComponent from "./components/home/OmgevingComponent"
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Success from "./components/pay/Success";
import NavBar from "./pages/navbars/NavBar";
import Register from "./components/admin/Register";
import Datum from "./components/admin/Datum";
import Reserves from "./components/admin/Reserves";
import Costumers from "./components/admin/Costumers";
import Omgeving from "./components/home/omgeving/Omgeving";
import { langContext } from "./context/langContext";
import Children from "./components/home/omgeving/Children";
import Tourism from "./components/home/omgeving/Tourism";
// ENG IMPORTS 
import NavBarENG from "./ENG/pages/navbars/NavBarENG"
import HomeENG from "./ENG/pages/HomeENG";
import Area from "./ENG/components/home/OmgevingComponent"
import Surrounding from './ENG/components/home/omgevingENG/Omgeving'
import ChildrenENG from './ENG/components/home/omgevingENG/Children'
import TourismENG from './ENG/components/home/omgevingENG/Tourism'
import ReviewsENG from './ENG/components/home/ReviewComponent'
import DatumComponent from "./components/admin/DatumComponent";
import ReleaseDate from "./components/admin/ReleaseDate";

function App() {
 
  const [selectedPage, setSelectedPage] = useState('Home')
  const [lang, setLang] = useState(localStorage.getItem("lang") || "NL")

  return (
  <BrowserRouter>
  <langContext.Provider value={{lang,setLang}}>
    { lang === "NL" &&
    <>
    <NavBar
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
      lang = {lang}
      />
      <Routes>
        <Route path='/' element ={<Home setSelectedPage={setSelectedPage} />}>
          <Route path="/" element={<ReviewComponent />}/>
          <Route path="omgeving" element={<OmgevingComponent />}>
              <Route path="" element={<Omgeving />} />
              <Route path="kinderen" element={<Children />} />
              <Route path="toerisme" element={<Tourism />}/>
          </Route>
          <Route path="info" element={<InfoComponent />}/>
        </Route>
        <Route path='/paysummary' element ={<PaySummary />}  />
        <Route path='/login' element ={<Login />}  />
        <Route path='/success' element ={<Success />}  />
        <Route path="/admin" element={<Protected />}>
          <Route exact path="/admin" element={<Admin />}>
            <Route path="" element={<Register />}/>
            <Route exact path="costumers" element={<Costumers  />}/>
            <Route exact path="datum" element={<DatumComponent  />}>
              <Route path="" element={<Datum />} />
              <Route path="release" element={<ReleaseDate />} />
            </Route>
            <Route exact path="Reserve" element={<Reserves  />}/>
          </Route>
        </Route>
      </Routes> 
      </>}
      {lang === "ENG" &&
        <>
          <NavBarENG
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
      lang = {lang}
      />
        <Routes>
        <Route path='/' element ={<HomeENG setSelectedPage={setSelectedPage} />}>
          <Route path="/" element={<ReviewsENG />}/>
          <Route path="omgeving" element={<Area />}>
              <Route path="" element={< Surrounding/>} />
              <Route path="kinderen" element={<ChildrenENG />} />
              <Route path="toerisme" element={<TourismENG />}/>
          </Route>
          <Route path="info" element={<InfoComponent />}/>
        </Route>
        <Route path='/paysummary' element ={<PaySummary />}  />
        <Route path='/login' element ={<Login />}  />
        <Route path='/success' element ={<Success />}  />
        <Route path="/admin" element={<Protected />}>
          <Route exact path="/admin" element={<Admin />}>
            <Route path="" element={<Register />}/>
            <Route exact path="costumers" element={<Costumers  />}/>
            <Route exact path="datum" element={<Datum  />}/>
            <Route exact path="Reserve" element={<Reserves  />}/>
          </Route>
        </Route>
      </Routes> 
        </>
      }
    </langContext.Provider>
   </BrowserRouter>
  )
}

export default App
