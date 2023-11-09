import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import NavBar1 from "./NavBar1"
import NavBar2 from "./NavBar2"

const NavBar = ({selectedPage , setSelectedPage}) => {

    const [nav, setNav] =useState(<NavBar1 />)
    const location = useLocation()
    useEffect(() => {
        if(
        location.pathname.indexOf("admin") >-1 || 
        location.pathname.indexOf("paysummary") >-1 ||
        location.pathname.indexOf("login") >-1
        ){
            setNav(<NavBar2 />)
        }else{
            setNav(<NavBar1 
                selectedPage ={selectedPage}
                setSelectedPage = {setSelectedPage}
            />)
        }

    }, [location.pathname])

  return (
  <>
  {nav}
  </>
  )
}

export default NavBar
