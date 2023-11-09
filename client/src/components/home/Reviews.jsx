import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Main = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
`
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #F9FBFF;
  box-shadow: 0px 1px 10px #999;
  border-radius: 15px;
  @media (max-width: 1280px){
           display: none;
        }
`
const Btn = styled(Link)`
	padding: 0;
	cursor: pointer;
	text-decoration:none;
  font-size: 18px;
  &:hover{
    border-bottom: 1px solid;
  }
  &:nth-child(1){
      border-bottom:${props => props.selectedPage === 'Review' && '1px solid' };
      color:${props => props.selectedPage === 'Review' && 'black' } 
    }
  &:nth-child(2){
    border-bottom:${props => props.selectedPage === 'Omgeving' && '1px solid' }; 
    color:${props => props.selectedPage === 'Omgeving' && 'black' } 
    }
  &:nth-child(3){
    border-bottom:${props => props.selectedPage === 'Info' && '1px solid' };
    color:${props => props.selectedPage === 'Info' && 'black' }  
  }
`
const Review = styled.span`
  
`
const Omgeving = styled.span`
  
`
const Info = styled.span`
  
`
const Body = styled.div`
display: flex;
align-items: flex-start;
justify-content: center;
background-color: whitesmoke;
flex: 3;
`
const Reviews = () => {
  
  const [selectedPage, setSelectedPage] = useState("Review")

  return (
    <Main id='Reviews&info'>
      <SideBar>
        <Btn 
          selectedPage = {selectedPage}
          to="/"
          onClick={()=> setSelectedPage("Review")}
        > 
          <Review >Recensies</Review>
        </Btn>

        <Btn 
          selectedPage = {selectedPage}
          to="omgeving"
          onClick={()=> setSelectedPage("Omgeving")}
        > 
          <Omgeving >Omgeving</Omgeving>
        </Btn>
              
        <Btn 
          selectedPage = {selectedPage}
          to="info"
          onClick={()=> setSelectedPage("Info")}
        > 
          <Info >Praktische informatie</Info>
        </Btn>   
      </SideBar>
      <Body><Outlet /></Body>
    </Main>
  )
}

export default Reviews
