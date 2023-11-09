import styled from 'styled-components'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HouseIcon from '@mui/icons-material/House';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../../functions/newRequest';

const Nav = styled.nav`
   position: sticky;
   top: 0px;
    z-index: 999;
    box-shadow: 0px 1px 10px #999;
    
`
const NavContainer = styled.div`
  background-color: #5d8238;
  width:100%;
  z-index: 30;
  height: 105px;
  justify-content: center;
  display: flex;
  justify-content: space-evenly;

`
const InnerContainer = styled.div`
 margin: auto;
  width: 95%;
  display: flex;
  justify-content: space-evenly;
`
const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 15px 28px;
`
const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;
`
const ContactLogo = styled.div`
  background-color: whitesmoke;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ContactText = styled.p`
  color: white;
`
const LeftSide = styled.div`
margin: auto;
width: 70%;
display: flex;
justify-content: space-evenly;
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 45px;
  border-radius: 30%;
  flex-direction: column;
`
const Logo = styled.p`
font-size: 35px;
color: whitesmoke;
padding: 10px ;
font-weight: 700;
`
const LogoText = styled.p`
font-size: 14;
color: whitesmoke;
font-weight: 600;
`

const RightSide = styled.div`
display: flex;
align-items: center;
`
const NavBar2 = ({selectedPage, setSelectedPage}) => {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const navigate = useNavigate()

  const handleLogout = async () =>  {
    await newRequest.post('/auth/logout')
    localStorage.setItem("currentUser" , null)
    navigate('/')
  }

  return (
    <Nav>
        <NavContainer>
           <InnerContainer>
              <ContactContainer>

                <IconDiv>
                  <ContactLogo><LocalPhoneIcon /></ContactLogo>
                  <ContactLogo><HouseIcon /></ContactLogo>
                </IconDiv>
               
                <TextDiv>
                  <ContactText>06000006</ContactText>
                  <ContactText>Berkenlaan 10, 1800PX</ContactText>
                </TextDiv>
              
              </ContactContainer>
                <LeftSide>
              <Link to="/">
                Home
              </Link>
                  
                {currentUser?._doc?.isGert ? <Link to="/admin">Admin</Link> : null }
                {currentUser ? <Link onClick={handleLogout}>logout</Link> : null}

                </LeftSide>
                <RightSide>
                   NL
                </RightSide>
            </InnerContainer>
        </NavContainer>
    </Nav>
  )
}

export default NavBar2