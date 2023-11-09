import styled from "styled-components"
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../functions/useFetch"
import { useEffect } from "react";

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
const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #F9FBFF;
  box-shadow: 0px 1px 10px #999;
  border-radius: 35px;
  @media(max-width: 1280px ){
     max-width: 280px;
     margin-left: 15px;
    }
`
const LeftTitle = styled.h1`
  color: #383333;
  font-weight: 400;
`
const Label = styled.label`
  font-weight:200;
`
const NameInput = styled.input`
   width: 60%;
`
const LastNameInput = styled.input`
   width: 60%;
`
const EmailInput = styled.input`
   width: 60%;
`
const Options = styled.div`
z-index: 2;
  background-color: white;
  color: gray;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  width: 60%;
 
`
const OptionsTitle = styled.h2`
  color: #383333;
  font-weight: 400;
`
const OptionsItem = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  
`
const OptionsText = styled.span`
  
`
const OptionsCounter= styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: black;
  
`
const CounterBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #0071c2;
  color: #0071c2;
  cursor: pointer;
  background-color: white;
  &:disabled{
    cursor: not-allowed;
  }
  
`
const CounterNum = styled.span`
  
`
const Calender = styled.div`
cursor: pointer;
display: flex;
flex-direction: column;
background-color: #F9FBFF;
align-items: center;
justify-content: center;
padding: 15px;
box-shadow: 0px 1px 10px #999;
border-radius: 35px;
@media(max-width: 1280px ){
     max-width: 280px;
     margin-left: 15px;
     border: none;
     box-shadow: none;
     background-color: whitesmoke;
    }
`
const CalendarTitle = styled.h2`
  color: #383333;
  font-weight: 400;
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
                <Top>
                  <LeftTitle>Uw persoonsgegevens</LeftTitle>
                  <Label htmlFor="">Voornaam</Label> 
                  {firstName ? <span style={{color:"red", fontSize: "22px"}}><b>Gelieve dit veld in te vullen</b></span> : "" }
                  <NameInput 
                    name="firstname"
                    type="text"
                    placeholder="Jan"
                    onChange={handleChange}
                    ></NameInput>
                   <Label htmlFor="">Achternaam</Label> 
                   {lastName ? <span style={{color:"red", fontSize: "22px"}}><b>Gelieve dit veld in te vullen</b></span> : "" }
                  <LastNameInput 
                    name="lastname"
                    type="text"
                    placeholder="Smit"
                    onChange={handleChange}
                    ></LastNameInput>
                  <Label htmlFor="">E-mail</Label> 
                  {email ? <span style={{color:"red", fontSize: "22px"}}><b>Gelieve dit veld in te vullen</b></span> : "" }
                  <EmailInput 
                    name="email"
                    type="email"
                    placeholder="Jan@smit.nl"
                    onChange={handleChange}
                    ></EmailInput >
                  <Options>
                    <OptionsTitle>Gelieve het aantal gasten aan te geven</OptionsTitle>
                    <OptionsItem>
                        <OptionsText>Volwassenen</OptionsText>
                            <OptionsCounter>
                            <CounterBtn
                             disabled={options.adult <= 1}
                             onClick={()=> handleOptions("adult" , "decrease")}
                             type="button"
                             > - </CounterBtn>

                                <CounterNum> {options.adult}</CounterNum>

                              <CounterBtn
                               disabled={totaal >= 8}
                               onClick={()=> handleOptions("adult" , "i")}
                               type="button"
                               > + </CounterBtn>
                           </OptionsCounter>                     
                    </OptionsItem>
                    <OptionsItem>
                        <OptionsText>Kinderen </OptionsText>
                            <OptionsCounter>
                              <CounterBtn
                               disabled={options.children <= 0}
                               onClick={()=> handleOptions("children" , "decrease")} 
                               type="button"                
                               > - </CounterBtn>

                                <CounterNum> {options.children} </CounterNum>

                              <CounterBtn 
                              disabled={totaal >= 8}
                              onClick={()=> handleOptions("children" , "i")}
                              type="button"
                              > + </CounterBtn>
                            </OptionsCounter>
                        
                    </OptionsItem>
                  </Options>
                </Top>
                {dateError ? <span style={{color:"red", fontSize: "22px"}}><b>U dient minstens voor een nacht te boeken</b></span> : ""}
                  <Calender > 
                    <CalendarTitle>Selecteer de datum van uw verblijf</CalendarTitle>
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      minDate={new Date()}
                      disabledDates={disabled_dates}
                    />          
                  </Calender>
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
