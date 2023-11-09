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
 
    @media (max-width: 1380px){
           display: none;
        }
    &:hover{
        border-bottom: 3px solid;
    }
    &.active{
       border-bottom: 3px solid;
    }
`
const Anchor = styled(AnchorLink)`
  @media (max-width: 1380px){
           display: none;
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
      <Anchor >{page}</Anchor>
    </Btn>
  )
}

export default NavLink