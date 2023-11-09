import { format } from "date-fns"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import newRequest from "../../functions/newRequest.js"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Checkout.jsx"
import { Helmet } from 'react-helmet';

const Main = styled.main`
display: flex;
    justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Top = styled.div`
  display: flex;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding:15px;
  gap: 15px;
  background-color: #F9FBFF;
  box-shadow: 0px 1px 10px #999;
`
const Title = styled.h2`
  font-weight: 500;
`
const Guest = styled.span`
  
`
const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Adult = styled.span`
  
`
const Children = styled.span`

`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
`
const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
`
const Select = styled.select`
  
`
const Option = styled.option`
  
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #F9FBFF;
  box-shadow: 0px 1px 10px #999;
  margin: 15px;
  padding:15px;
`
const TextArea = styled.textarea`
  
`
const Btn = styled.button`
  width: 20%;
  padding: 5px;
  background-color: lightblue;
  margin: auto;
  border-radius: 15px;
  border: none;
  cursor: pointer;

  &:hover{
    background-color: white;
  }
`

const Bottom = styled.div`
  padding: 20px;
`

const stripePromise = loadStripe("pk_test_51Mla1bLbsEaFtLUIDOIf7b6IlnK65iLS88NgQbymTY3BMVbZv7GYpn6BCiStvrClCbhW5GeGP4s8X3UgQTsb9WsH0015EUMJmm");

const PaySummary = () => {
  const [notification, setNotification] = useState(true)
// LOCATION VARIABLES FROM PREVIOUS PAGE
  const location = useLocation()
  const [date, setDate] = useState(location.state.date)
  const [guest, setGuest] = useState(location.state.guest)
  const [numGuests, setNumGuests] = useState(location.state.options)
//CALCULATE NUMBER OF CHILDREN FOR AGE SUBMISION
const childCount = (count) =>{
  let child = []
  for( let i = 0; i < count; i++){
    child.push(<div></div>)
  }
  return child
}
const children = childCount(numGuests.children)
const [childAges, setChildAges] = useState([])

const handleSubmit = (event) =>{
  event.preventDefault()
  setChildAges([
    ...childAges,
    event.target.value
  ])
}
// CALCULATE NUMBER OF DAYS FOR PRICE CALCULATION
const getDatesInRange = (startDate, endDate) => {
  let start = new Date(startDate)
   start.setDate(start.getDate() +1)
  let end = new Date(endDate)
    end.setDate(end.getDate() +1)
  const date = new Date(start)
  const dates =[]

  while(date <= end){
      dates.push(new Date(date));
      date.setDate(date.getDate() +1)
  }

  return dates;
}
const getUnavailables = (startDate, endDate) => {
  let start = new Date(startDate)
  let end = new Date(endDate)
  const date = new Date(start)
  const dates =[]

  while(date <= end){
      dates.push(new Date(date));
      date.setDate(date.getDate() +1)
  }

  return dates;
}
const unAvailableDays = getUnavailables( date[0].startDate ,date[0].endDate)

// PRICE CALCULATIONS
const allDays = getDatesInRange( date[0].startDate ,date[0].endDate)
const priceChildren = allDays.length * 35 * numGuests.children
const priceAdults =  allDays.length * 45 * numGuests.adult
const total = priceChildren + priceAdults
//CLIENT SECRET AND API POST
const [clientSecret, setClientSecret] = useState("");
//GET TEXTAREA MESSAGE
const [message, setMessage] = useState('')

const handleMessage = (e) => {
  setMessage(e.target.value)
}

console.log("alldays:" , allDays)

const handleClick = async (e) =>{
  try{  
   
   const res =  await newRequest.post("/reserve/create-payment-intent", JSON.stringify({
      firstname: guest.firstname,
      lastname: guest.lastname,
      email: guest.email,
      adults:numGuests.adult,
      children:numGuests.children,
      childrenAge:childAges,
      dates: allDays,
      desc:message, 
      price: total,
      days: allDays.length,
    }))

  setClientSecret(res.data.clientSecret)
  
  }catch(err){
    console.log(err)
  }
}
// STRIPE VARIABLES
const appearance = {
  theme: 'stripe',
};
const options = {
  clientSecret,
  appearance,
};

const formattedDates = `${format(date[0].startDate, "dd/MM/yyyy")} tot ${format(date[0].endDate, "dd/MM/yyyy")}`

  return (
   <Main>
       <Helmet>
        <title>Schierhuys | Betaaloverzicht</title>
      </Helmet>
    <Top>

   
<Container>
     
   { notification &&    
   <>
   <Label htmlFor="message">Wilt u ons iets laten weten? Heeft u speciale wensen? schrijf ze hier op of neem contact met ons op via 06000006 en wij accomoderen uw wensen graag</Label>
        <TextArea
          rows={6}
          cols={60}
          id="message"
          name="message"
          value={message}
          onChange={handleMessage}
          maxLength={3000}
          >
        </TextArea>  
        <Btn onClick={(()=> setNotification(false))}>Volgende!</Btn>
      </> 
        }
      
{ !notification & !clientSecret &&
  <>
        <Title>Neem de gegevens goed door! </Title>
        <Guest><b>voornaam: </b>{guest.firstname} , <b>achternaam:</b> {guest.lastname} <b>email:</b>{guest.email}</Guest>
        <Options>
          <Adult><b>aantal volwassenen: </b>{numGuests.adult}</Adult>
          <Children><b>aantal kinderen:</b> {numGuests.children}</Children>
          <span>{formattedDates}</span>
          <span>Prijs: {total}</span>
          {children.map((item)=> (
            <Form>
            <Label htmlFor="children">Gelieve de leeftijd van de kinderen in te vullen</Label>
              <Select name="children" id="children" onChange={handleSubmit}>
                <Option value={0}>0</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
                <Option value="13">13</Option>
                <Option value="14">14</Option>
                <Option value="15">15</Option>
                <Option value="16">16</Option>
                <Option value="17">17</Option>
              </Select>         
            </Form>  

))}
          {childAges.length >= children.length ?   
          <Btn onClick={handleClick}>Bevestig gegevens</Btn> :
          <span>gelieve alle leeftijden in te vullen</span>}  
        </Options>
    </>
        }
    </Container>
  
    </Top>
    <Bottom>
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
          <CheckoutForm dates={unAvailableDays} guestEmail={guest.email} formattedDates={formattedDates}/>
        </Elements>
        )}
    </Bottom>

   </Main>
  )
}

export default PaySummary
