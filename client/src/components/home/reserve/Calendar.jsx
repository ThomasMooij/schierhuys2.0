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

const Calendar = () => {
    return (
        {dateError ? <span> }
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
    )
}