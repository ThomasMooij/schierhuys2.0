import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from "styled-components"
import {Link} from 'react-scroll';


const Btn = styled(Link)`
   margin-left: 15px;
    border: none;
    padding:3px 35px;
    cursor: pointer;
    color: white;
    font-size: 19px;
    align-self: center;
    display: block;
    font-weight: 700;
    background-color: transparent;
    border-spacing: 13px;
    &:hover{
        border-bottom: 3px solid;
    }
    &.active{
       border-bottom: 3px solid;
    }

`
  const NavLink = ({page, selectedPage, setSelectedPage}) => {

  return (
   
    <Btn 
    page={page} 
    selectedPage={selectedPage}
    onClick={()=> setSelectedPage(page)}
    to={page || "/"} 
    smooth={true} 
    offset={-250} 
    duration={500}
    spy={true}
    >
      <AnchorLink >{page}</AnchorLink>
    </Btn>
  )
}

export default NavLink