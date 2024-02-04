import styled from "styled-components"
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../functions/useFetch"
import { useEffect } from "react";
import UserForm from "./reserve/UserForm";

const Container = styled.main`
width: 100%;
height: 100%;
background-color: whitesmoke;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TitleDiv = styled.div`
display: flex;
  width: 100vw;
  max-width: 100%;
  background-color: beige;
  justify-content: center;
`
const Title = styled.h1`
  padding: 20px;
  color: #383333;
  font-weight: 400;
`
const Form = styled.form`
  display: flex;
  width: 80%;
  height: 80%;
  align-items: center;
  gap: 20px;
  @media (max-width: 1280px){
           flex-direction: column;
        }
`
const Left = styled.div`
display: flex;
flex: 1;
flex-direction: column;
justify-content: space-between;
padding: 20px;
gap: 25px;
`



const Right = styled.div`
flex: 1;
display: flex;
align-self: center;
flex-direction: column;
gap: 25px;
`
const RightWrapper = styled.div`
width: 300px;
height: 300px;
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
width: 60%;
align-self: center;
padding: 85px;
background-color: #F9FBFF;
box-shadow: 0px 1px 10px #999;
border-radius: 50%;
`
const WrapperTitle = styled.h2`
  color: #383333;
  font-weight: 400;
`
const WrapperSub = styled.h3`
  
`
const Rooms = styled.span`
  color: #383333;
  font-weight: 800;
`
const BathRooms = styled.span`
  color: #383333;
  font-weight: 800;
  margin-bottom: 45px;
`
const Price = styled.span`
  color: #383333;
  font-size:21px;
`
const ReserveBtn = styled.button`
  width: 40%;
  align-self: center;
  padding: 15px;
  border-radius: 15px;
  background-color: white;
  font-weight: 800;
  font-size: 19px;
  &:hover{
    transform: translateY(-17px);
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  }
  @media (max-width: 1280px){
           margin-bottom: 15px;
        }
`

const Reserve = () => {
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setGuest((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
// STATE VARIABLES
  const [guest , setGuest] = useState({
    firstname: "",
    lastname: "",
    email: "",
  })
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  //testeffect
  useEffect(()=> {
    setDateError(date[0].startDate === date[0].endDate);
  }, [date])


  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
  });
  const topRef = useRef();
  // CHECK TOTAL TO NOT ALLOW MORE THAN 8 PEOPLE 
  const totaal = options.adult + options.children
  // SET ADULT AND CHILDREN 
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {  ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,};
    });
  };
// SEARCH AND MISSINGs INFO FUNCTIONALITY
  const [firstName , setFirstName] = useState(false)
  const [lastName , setLastName] = useState(false)
  const [email , setEmail] = useState(false)
  const [dateError, setDateError] = useState(false)

  const goToTop = () =>{
    const top = topRef.current.offsetTop
    window.scrollTo({
        top: top,
        behavior:"smooth"
    })
  }

  const handleSearch = (e) => {
    e.preventDefault();
  
    setFirstName(false);
    setLastName(false);
    setEmail(false);
  
    if (!guest.firstname) {
      setFirstName(true);
      goToTop();
    }
  
    if (!guest.lastname) {
      setLastName(true);
      goToTop();
    }
  
    if (!guest.email) {
      setEmail(true);
      goToTop();
    }
  
    if (date[0].startDate === date[0].endDate) {
      setDateError(true);
      console.log("dateerror:" , dateError)
      goToTop();
      
    }
  
    if (guest.firstname && guest.lastname && guest.email && !dateError) {
      navigate("/paysummary", {state: {guest, date, options}});
    }
  }
  
  // DISABLED DATES
       let disabled_dates =[]    
       const {data,error,loading} = useFetch('http://localhost:8080/api/reserve/unavailable')
       const array = Object.values(data);
       const length = array[0]?.length 
  
       for(let i = 0; i < length ; i++){
        disabled_dates.push(new Date(array[0][i]))
        array[0][i]
       }
       
  return (
    <Container ref={topRef} id="Reserve">
        <Wrapper>
          <TitleDiv><Title>Boek uw verblijf !</Title></TitleDiv>
            <Form>
              <Left>
                <UserForm />
             
              </Left>
              <Right>
                 <RightWrapper>
                    <WrapperTitle>Algemene gegevens</WrapperTitle>
                    <WrapperSub>Het huis beschikt over de volgende faciliteiten</WrapperSub>
                    <Rooms>4 slaapkamers voor 2 personen</Rooms>
                    <BathRooms>1 badkamer en 1 slaapkamer met badkamer</BathRooms>
                    <Price><b>150 euro</b> per nacht</Price>
                 </RightWrapper>
                 <ReserveBtn disabled={!guest} onClick={(e)=> handleSearch(e)}>Reserveer uw verblijf</ReserveBtn>
              </Right>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Reserve
