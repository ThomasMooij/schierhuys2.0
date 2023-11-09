import styled from "styled-components"

const Main = styled.main`
  width: 100vw;
  height: 60vh;
  max-width: 100%;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Contact = () => {
  return (
    <Main id="Contact">
      <Wrapper>
         <p>contact</p>
      </Wrapper>
    </Main>
  )
}

export default Contact
