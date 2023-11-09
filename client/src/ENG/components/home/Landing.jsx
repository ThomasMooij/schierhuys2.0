import styled from "styled-components";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Link } from "react-scroll";

const Container =styled.main`
width: 100vw;
height: 100vh;
max-width: 100%;
display:flex;
position:relative;
overflow:hidden;
`
const Wrapper = styled.div`
height: 100%;
display: flex;
`

const Slide = styled.div`
width: 100%;
height:100%;
display: flex;
align-items: center;
background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.01) 50%, 
  rgba(0, 0, 0, 0.9) 100%), url("https://www.timetomomo.com/wp-content/uploads/2020/12/Bos-en-Heide.jpg") ;
background-repeat: no-repeat center center fixed;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
background-size: cover;
`
const SlideContainer = styled.div`
width: 100vw;
height:100vh;
position: relative;
`
const TextContainer = styled.div`
position: absolute;
width: 100%;
height:11%;
display: flex;
align-items: center;
justify-content: flex-end;
flex-direction: column;
top: 800px;
left: -25px;
`

const Button = styled.button`
padding:10px 35px;
font-size:20px;
font-weight: 700;
color: white;
background-color:#5d8238;
border-radius: 10px;
cursor:pointer;
&:hover{
  background-color:#93ad78;
  transform: translateY(-17px);
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
}
// springt niet naar boven zoals de bedoeling is

`
const ArrowDown = styled.div`
width:50px;
height:50px;
background-color:#2ed418; 
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
margin: auto;
cursor:pointer;
z-index:2;
&:hover{background-color:#93ad78;}
transform: translateY(-7px);
`;

const Landing = ({setSelectedPage}) => {

  return (
    <>
      <Container id="Home">
        <Wrapper>
        <SlideContainer>
            <Slide />
            <TextContainer>     
                <Link 
                onClick={()=> setSelectedPage("Reserve")}
                to="Reserve"
                smooth={true} 
                offset={-250} 
                duration={500}
                spy={true}>
                <Button> Reserve holiday home</Button></Link>
                <ArrowDown><ArrowCircleDownIcon /></ArrowDown>
            </TextContainer>
        </SlideContainer> 
        </Wrapper>
      </Container>
    </>

  )
}

export default Landing