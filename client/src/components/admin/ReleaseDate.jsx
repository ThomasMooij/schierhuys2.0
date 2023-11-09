import styled from "styled-components"
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import newRequest from "../../functions/newRequest";
import { format } from "date-fns";

const Main = styled.main`
display: flex;
align-items: center;
flex-direction: column;
gap: 50px;
padding: 25px;
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
border-radius: 15px;
`
const CalendarTitle = styled.h2`
  color: #383333;
  font-weight: 400;
`
const Btn = styled.button`
  padding: 15px;
  margin: 10px;
  background-color: lightblue;
  cursor: pointer;

  &:hover{
    background-color: red;
  }
`

const ReleaseDate = () => {

  const [release, setRelease] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start)
    const dates =[]
  
    while(date <= end){
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1)
    }
  
    return dates;
  }
  const allRelease = getDatesInRange(release[0].startDate, release[0].endDate)

  let newRelease = [];
  for(let i = 0; i < allRelease.length ; i++){
    newRelease.push(format(new Date(allRelease[i]), "yyyy-MM-dd"))
   }
  const updateReserve = async (dates) =>{
    try{
        await newRequest.put(`http://localhost:8080/api/reserve/unavailable`, {dates})
        alert("gelukt, check de website voor de zekerheid")
    }catch(err){
        console.log(err)
    }
  }
  return (
    <Main>
        <Calender > 
        <CalendarTitle>Datum handmatig vrijzetten( wel mee uitkijken gertje )</CalendarTitle>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRelease([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={release}
            className="date"
            minDate={new Date()}
          />
          <Btn onClick={()=> updateReserve(newRelease)}>Data vrijgegeven</Btn>          
        </Calender>
 
    </Main>
  )
}

export default ReleaseDate
