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
            <article>Schierhuys bv</article>
            <article>Berkenlaan 10</article>
            <article>Gertshuis@ossosvangert.nl</article>
            <article>060606060606</article>
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
