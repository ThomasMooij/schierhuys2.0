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
      border-bottom:${props => props.selected === 'reserveren' && '1px solid' };
      color:${props => props.selected === 'omgeving' && 'black' } 
    }
  &:nth-child(2){
    border-bottom:${props => props.selected === 'reserveren' && '1px solid' }; 
    color:${props => props.selected === 'vrijgeven' && 'black' } 
    }
`
const Body = styled.div`
 margin: auto;
`

const DatumComponent = () => {
    const [selected, setSelected] = useState("reserveren")

  return (
    <Main>
    <Nav>
        <NavBtn 
        selected={selected} 
        onClick= {() => setSelected("reserveren")}
        to=""
        >Datum reserveren</NavBtn>

        <NavBtn 
        selected={selected} 
        onClick= {() => setSelected("vrijgeven")}
        to="release"
        >Datum handmatig vrijgeven</NavBtn>
    </Nav>
    <Body>
      <Outlet />
    </Body>
</Main>
  )
}

export default DatumComponent
