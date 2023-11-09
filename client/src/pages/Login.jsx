import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"
import newRequest from "../functions/newRequest"

const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Form = styled.div`
     width: 360px;
      padding: 100px 0px;
      display: flex;
      flex-direction: column;
      gap: 20px;
`
const Title = styled.h1`
    color: gray;
    margin-bottom: 20px;
`
const Label = styled.label`
    color: gray;
    font-size: 18px;
`
const Input = styled.input`
     padding: 20px;
    border: 1px solid rgb(216, 214, 214);
`
const Btn = styled.button`
       border: none;
        padding: 20px;
        color: white;
        font-weight: 500;
        font-size: 18px;
        background-color: #1dbf73;
        cursor: pointer;
`
const Login = () => {
    const [guestName , setGuestname] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState("")

    const navigate = useNavigate()

    const {loading, err, dispatch} = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        dispatch({ type: "LOGIN_START" });
        try{
            const guestname = guestName.toLowerCase()
            const res = await newRequest.post("/auth/login", {guestname, password})
            if(res.data.isGert){
                dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
                const isGert = true
                navigate("/admin", {state: {isGert}})
            }else
          {  
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        }
            
        }catch(err){
            console.log("error log")
            setError(err.response)
        }
    }
  return (
    <Main>
        <Form>
            <Title>
                Login
            </Title>
            <Label htmlFor="">Gebruikersnaam</Label>
            <Input 
                name="Gebruikersnaam"
                type="text"
                placeholder="Gertje"
                onChange={(e) => setGuestname(e.target.value)}
            />
            <Label htmlFor="">Wachtwoord</Label>
            <Input 
                name="wachtwoord"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Btn onClick={handleSubmit}> Aanmelden</Btn>
        </Form>
    </Main>
  )
}

export default Login
