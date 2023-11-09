import styled from "styled-components"
import useFetch from "../../functions/useFetch"
import SingleCostumer from "./SingleCostumer"

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 50px;
  
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap: 25px;
  
`
const Costumers = () => {
  const {data, loading, error} = useFetch('http://localhost:8080/api/users/')

  return (
<Main>
  <Wrapper>
    {data.map((costumer) =>(
      <SingleCostumer key={costumer._id} costumer={costumer}/>
    ))}
  </Wrapper>
</Main>
  )
}

export default Costumers
