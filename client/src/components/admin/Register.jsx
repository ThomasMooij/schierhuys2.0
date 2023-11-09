import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import newRequest from "../../functions/newRequest.js"

const Main = styled.main`
width: 100wh;
height: 100vh;
max-width: 100%;
`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: auto;
`
const Label = styled.label`
`
const Input = styled.input`
`
const Btn = styled.button`
`
const Register = () => {

    const [guest, setGuest] = useState({
        guestname:"",
        email: "",
        password: "",
        password1: ""
    })
    // error variables
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [password1Error, setPassword1Error] = useState(false)
    const [correctError, setCorrectError] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) =>{
    setGuest((prev) =>{
        return {...prev, [e.target.name]: e.target.value}
    })
   }
   
    const handleClick = async (e) =>{
    const guestname = guest?.guestname.toLowerCase()
    if (!guest.guestname){
        setNameError(!setNameError)
    }else if (!guest.email){
        setEmailError(!emailError)
    }else if(!guest.password){
        setPasswordError(!passwordError)
    } else if(!guest.password1){
        setPassword1Error(!password1Error)
    }else if(guest.password !== guest.password1 ){
        setCorrectError(!correctError) 
    }else
      { 
        try{
        await newRequest.post("/auth/register" ,{
            guestname,
            email: guest.email,
            password: guest.password
        })
        alert("klant geregistreerd")
        navigate('/admin')
       } catch(err){
        console.log(err)
       }
    }
    }
    
  return (
   <Main>
    <Wrapper>
        <Label htmlFor="">naam gast</Label>
        {nameError ? <span>Wel de naam invullen Gertje</span> : null}
        <Input 
            name="guestname"
            type="text"
            placeholder="ons gert"
            onChange={handleChange}
        />
       {emailError ? <span>Wel de email invullen Gertje</span> : null}
        <Label> email</Label>
        <Input 
            name="email"
            type="email"
            placeholder="gert@onsgert"
            onChange={handleChange}
        />
        {passwordError ? <span>Wel het wachtwoord invullen Gertje</span> : null}
        {correctError ? <span>De wachtwoorden komen niet overeen Gertje</span> : null}
        <Label>Wachtwoord</Label>
        <Input 
            name="password"
            type="password"
            placeholder="geheim"
            onChange={handleChange}
        />
          <Label>Wachtwoord bevestigen</Label>
          {password1Error ? <span>Wel het wachtwoord bevestigen Gertje</span> : null}
          {correctError ? <span>De wachtwoorden komen niet overeen Gertje</span> : null}
        <Input 
            name="password1"
            type="password"
            placeholder="geheim"
            onChange={handleChange}
        />

        <Btn onClick={handleClick}> registreer</Btn>
    </Wrapper>
   </Main>
  )
}

export default Register
