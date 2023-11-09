import { useRef } from "react"
import styled from "styled-components"
import emailjs from '@emailjs/browser';

const Main = styled.main`
  padding: 0.25rem;

  background-color: whitesmoke;

  @media(max-width: 1280px ){
      padding-top:55px
    }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 25px;
  @media(max-width: 780px){
    padding: 5px;
  }
`

const Title = styled.h2`
  font-weight: 600;

  &:nth-child(1){
    font-weight: 400;
  }
` 
const FormWrapper = styled.section`
  align-items: flex-start;
  background-color: #F9FBFF;
  box-shadow: 0px 1px 10px #999;
  margin-top: 25px;
  padding: 35px 250px;
  border-radius: 25px;
@media (max-width: 1080px){
           padding: 15px;
           max-width: 280px;
        }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  gap: 6px;
` 
const Label = styled.label`
  
` 
const Input = styled.input`
  
` 
const TextArea = styled.textarea`
  
` 
const InputBtn = styled.input`
  background-color: lightblue;
  padding: 7px;
  width: 40%;
  margin: auto;
  border-radius: 15px;
  border: none;

  &:hover{
    background-color: white;
  }
`
const Contact = () => {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_qxjnhra', 'template_hiwr4pd', e.target, 'LTlQv0sg7RiYlKMB4' )
      .then((result) => {
          console.log(result.text);
          {e.target}
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  return (
    <Main id="Contact">
      <Wrapper>
   
        <FormWrapper>
       
         <Title>Heeft u vragen? </Title>
         <Title>Neem contact met ons op!</Title>
         <Form ref={form} onSubmit={sendEmail}>
            <Label>Naam</Label>
            <Input type="text" name="name" placeholder="jan smit"></Input>
            <Label>Waar gaat uw vraag over</Label>
            <Input type="text" name="subject" placeholder="beschikbare faceliteiten"></Input>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="jansmit@gmail.com"></Input>
            <Label >message</Label>
            <TextArea placeholder="uw vraag...." name="message" cols={50} rows={10}></TextArea>
            <InputBtn type="submit" value="Send" />
         </Form>
        </FormWrapper>
      </Wrapper>
    </Main>
  )
}

export default Contact
