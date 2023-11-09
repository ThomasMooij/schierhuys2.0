import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components' 

const Main = styled.main`
width: 100wh;
height: 100vh;
max-width: 100%;
display: flex;
`
const SideBar = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #F9FBFF;
  box-shadow: 0px 1px 10px #999;
`
const Article = styled.article`
  
`
const Body = styled.div`
  flex:3;
`

const Admin = () => {
  return (
    <Main>
      <SideBar>
        <Link to=""><Article>Klant registeren</Article></Link>
        <Link to="/admin/reserve"><Article>Geregisteerden klanten en reviews</Article></Link>
        <Link to="/admin/datum"><Article>Datum vast zetten</Article></Link>
        <Link to="/admin/reserve"><Article>Reservaties beheren</Article></Link>
      </SideBar>
      <Body><Outlet/></Body>
    </Main>
  )
}

export default Admin
