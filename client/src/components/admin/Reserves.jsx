import styled from "styled-components"
import useFetch from "../../functions/useFetch"
import SingleReserve from "./SingleReserve"

const Main = styled.main`
display: flex;
align-items: center;
flex-direction: column;
gap: 15px;
padding: 20px;
`
const Reserves = () => {

  const {data, loading, error} = useFetch('http://localhost:8080/api/reserve/')

console.log(data)

  return (
    <Main>
      {data.map((reserve)=> (
        <SingleReserve key={reserve._id} reserve={reserve} />
      ))}
    </Main>
  )
}

export default Reserves
