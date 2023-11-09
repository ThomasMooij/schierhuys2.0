import styled from "styled-components"

const Main = styled.main`
display: flex;
justify-content: center;
align-items: center;
  width: 100vw;
  height: 20vh;
  max-width: 100%;
  background-color: #5d8238;;
  @media(max-width: 780px ){
     display: none;
    }
`
const Wrapper = styled.footer`
    display: flex;
    gap: 65px;
    
`
const Left = styled.section`
    display: flex;
    flex-direction: column;
`
const Name = styled.article`
    
`
const Address = styled.article`
    
`
const Email = styled.article`
    
`
const Phone = styled.article`
    
`
const Right = styled.section`
    display: flex;
    flex-direction: column;
`   

const Alt = styled.h1`
    font-size: 19px;
    color: white;
`
const Footer = () => {
  return (
    <Main>
      <Wrapper>
        <Left>
            <Name>Schierhuys bv</Name>
            <Address>Berkenlaan 10</Address>
            <Email>Gertshuis@ossosvangert.nl</Email>
            <Phone>060606060606</Phone>
        </Left>
        <Right>
         <Alt>All rights reserved@</Alt>
         <Alt>A TumTech Site ~ tumtech@gmail.com</Alt>
        </Right>
      </Wrapper>
    </Main>
  )
}

export default Footer
