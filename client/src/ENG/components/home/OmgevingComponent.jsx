import styled from '@emotion/styled'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'



const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    gap: 35px;
`
const Nav = styled.nav`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 25px;
    margin: auto;
    background-color: beige;
    width: 100%;
    min-height: 85px;
   
`

const NavBtn = styled(Link)`
  border: none;
  text-decoration: none;

  &:hover{
    border-bottom: 1px solid;
  }
  &:nth-child(1){
      border-bottom:${props => props.selected === 'omgeving' && '1px solid' };
      color:${props => props.selected === 'omgeving' && 'black' } 
    }
  &:nth-child(2){
    border-bottom:${props => props.selected === 'kinderen' && '1px solid' }; 
    color:${props => props.selected === 'kinderen' && 'black' } 
    }
  &:nth-child(3){
    border-bottom:${props => props.selected === 'toerisme' && '1px solid' };
    color:${props => props.selected === 'toerisme' && 'black' }  
  }
`

const Body = styled.div`
 margin: auto;
`

const OmgevingComponent = () => {

  const [selected, setSelected] = useState("omgeving")

  return (
    <Main>
        <Nav>
            <NavBtn 
            selected={selected} 
            onClick= {() => setSelected("omgeving")}
            to=""
            >The area</NavBtn>

            <NavBtn 
            selected={selected} 
            onClick= {() => setSelected("kinderen")}
            to="kinderen"
            >Fun with children</NavBtn>

            <NavBtn 
            selected={selected} 
            onClick= {() => setSelected("toerisme")}
            to="toerisme"
            >Tourisme in the area</NavBtn>
        </Nav>
        <Body>
          <Outlet />
        </Body>
    </Main>
  )
}

export default OmgevingComponent