import styled from "styled-components";

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
const Label = styled.label`
  font-weight:200;
`
const LeftTitle = styled.h1`
  color: #383333;
  font-weight: 400;
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
const UserForm = ({handleChange, firstName, lastName, email, handleOptions, options, totaal}) => {
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
          <span>Volwassenen</span>
              <OptionsCounter>
              <CounterBtn
               disabled={options.adult <= 1}
               onClick={()=> handleOptions("adult" , "decrease")}
               type="button"
               > - </CounterBtn>

                  <span> {options.adult}</span>

                <CounterBtn
                 disabled={totaal >= 8}
                 onClick={()=> handleOptions("adult" , "i")}
                 type="button"
                 > + </CounterBtn>
             </OptionsCounter>                     
      </OptionsItem>
      <OptionsItem>
          <span>Kinderen </span>
              <OptionsCounter>
                <CounterBtn
                 disabled={options.children <= 0}
                 onClick={()=> handleOptions("children" , "decrease")} 
                 type="button"                
                 > - </CounterBtn>

                  <span> {options.children} </span>

                <CounterBtn 
                disabled={totaal >= 8}
                onClick={()=> handleOptions("children" , "i")}
                type="button"
                > + </CounterBtn>
              </OptionsCounter>
          
      </OptionsItem>
    </Options>
  </Top>
};

export default UserForm;
