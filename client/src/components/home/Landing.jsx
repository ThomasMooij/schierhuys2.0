import styled from "styled-components";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

const Container = styled.main`

  max-width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  @media (max-width: 1380px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;
const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-position: center;
  margin: auto;
  background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.01) 50%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url("https://www.timetomomo.com/wp-content/uploads/2020/12/Bos-en-Heide.jpg");
  background-repeat: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: ${(props) => (props.slide === false ? 1 : 0.7)};
  transition: 0.25s all ease-in-out;
  &:hover {
    transition: 0.25s all ease-in-out;
    opacity: 1;
  }
`;
const SlideContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;
const Text = styled.span`
  opacity: ${(props) => (props.slide === false ? 0 : 1)};
  color: white;
  font-size: 29px;
  transition: 0.25s all ease-in-out;
  font-weight: 700;
`;

const TextContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 11%;
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;
const Button = styled.button`
  padding: 10px 35px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  background-color: #5d8238;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #93ad78;
    transform: translateY(-17px);
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  }
`;
const ArrowDown = styled.div`
  width: 30px;
  height: 30px;
  background-color: #2ed418;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background-color: #93ad78;
  }
  transform: translateY(-7px);
`;
const Landing = ({ setSelectedPage }) => {
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlide(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container id="Home">
        <Wrapper>
        <Link
                onClick={() => setSelectedPage("Reserve")}
                to="Reserve"
                smooth={true}
                offset={-250}
                duration={500}
                spy={true}
              >
                <Button> reserveer het huisje</Button>
              </Link>
              <ArrowDown>
                <ArrowCircleDownIcon />
              </ArrowDown>
          <SlideContainer>
            <Slide
              slide={slide}
              onMouseEnter={() => setSlide(false)}
              onMouseLeave={() => setSlide(true)}
            />
            
          </SlideContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Landing;
