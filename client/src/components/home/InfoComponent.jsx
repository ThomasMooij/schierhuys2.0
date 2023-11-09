import styled from "styled-components"


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
    font-size: 25px;
   
`


const InfoComponent = () => {
  return (
    <Main>
      <Nav>Praktische informatie over het huisje</Nav>
    </Main>
  )
}

export default InfoComponent
