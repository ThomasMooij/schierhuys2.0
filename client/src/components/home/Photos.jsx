import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import photos from "../../assets/photos.js";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  height: 80%;
  background-color: whitesmoke;
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 80%;
  height: 80%;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 8vh;
  justify-content: center;
  margin-bottom: 15px;
`;
const TitleH1 = styled.h1`
  font-weight: 400;
`;
const Slider = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 75vh;
  max-width: 100%;
  background-color: rgba(204, 193, 193, 0.613);
  z-index: 999;
  display: flex;
  align-items: center;
  @media (max-width: 450px) {
    background-color: whitesmoke;
    height: 350px;
    width: 350px;
  }
  @media (max-width: 580px) {
    background-color: whitesmoke;
    height: 350px;
  }
  @media (min-width: 580px) and (max-width: 1280px) {
    background-color: whitesmoke;
    height: 450px;
  }
`;
const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseIconDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: black;
  cursor: pointer;
`;
const Arrow = styled.article`
  margin: auto;
  font-size: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: black;
  cursor: pointer;
`;
const SlideImg = styled.img`
  @media (max-width: 580px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 580px) and (max-width: 1380px) {
    width: 450px;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ImageWrapper = styled.div`
  width: 33%;
`;
const Image = styled.img`
  width: 100%;
  max-height: 355px;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    transform: translateY(-17px);
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  }
`;
const Photos = () => {
  // state variables
  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [arrayNum, setArrayNum] = useState(0);
  const [arrayName, setArrayName] = useState("woonkamer");
  // handle move open slider
  const handleMove = (direction) => {
    let newSlide;

    if (direction === "left") {
      newSlide = slideNumber === 0 ? 29 : slideNumber - 1;
    } else {
      newSlide = slideNumber === 29 ? 0 : slideNumber + 1;
    }
    setArrayName(photos[newSlide].desc);
    setSlideNumber(newSlide);
  };
  // handle close slider
  const handleClose = () => {
    setOpen(false);

    slideNumber <= 5
      ? setArrayName("woonkamer") & setArrayNum(0)
      : (slideNumber >= 6) & (slideNumber <= 11)
      ? setArrayName("badkamer") & setArrayNum(1) & setSlideNumber(0)
      : (slideNumber >= 12) & (slideNumber <= 17)
      ? setArrayName("slaapkamer") & setArrayNum(2) & setSlideNumber(0)
      : (slideNumber >= 18) & (slideNumber <= 23)
      ? setArrayName("tuin") & setArrayNum(3) & setSlideNumber(0)
      : (slideNumber >= 24) & (slideNumber <= 29)
      ? setArrayName("omgeving") & setArrayNum(4) & setSlideNumber(0)
      : setArrayName("woonkamer") & setSlideNumber(0);
  };
  //handle slides main slider
  const handleSlide = (direction) => {
    let newArrayNum;

    if (direction === "left") {
      newArrayNum = arrayNum === 0 ? 4 : arrayNum - 1;
    } else {
      newArrayNum = arrayNum === 4 ? 0 : arrayNum + 1;
    }
    newArrayNum === 0
      ? setArrayName("woonkamer")
      : newArrayNum === 1
      ? setArrayName("badkamer")
      : newArrayNum === 2
      ? setArrayName("slaapkamer")
      : newArrayNum === 3
      ? setArrayName("tuin")
      : newArrayNum === 4
      ? setArrayName("omgeving")
      : null;

    setArrayNum(newArrayNum);
  };
  // open specific images
  const openImage = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  // sliced photo's array
  const living = photos.slice(0, 6);
  const bathroom = photos.slice(6, 12);
  const bedroom = photos.slice(12, 18);
  const garden = photos.slice(18, 24);
  const area = photos.slice(24, 30);

  return (
    <>
      <Container id="Fotos">
        <Title>
          {!open && (
            <Arrow onClick={() => handleSlide("left")}>
              <KeyboardArrowLeftIcon />
            </Arrow>
          )}

          <TitleH1>{arrayName}</TitleH1>
          
          {!open && (
            <Arrow onClick={() => handleSlide("right")}>
              <KeyboardArrowRightIcon />
            </Arrow>
          )}
        </Title>
        <Wrapper>
          {open && (
            <Slider>
              <CloseIconDiv onClick={() => handleClose(slideNumber)}>
                <CloseIcon />
              </CloseIconDiv>

              <Arrow onClick={() => handleMove("left")}>
                <KeyboardArrowLeftIcon />
              </Arrow>

              <SlideWrapper>
                <SlideImg src={photos[slideNumber].src} />
              </SlideWrapper>

              <Arrow onClick={() => handleMove("right")}>
                <KeyboardArrowRightIcon />
              </Arrow>
            </Slider>
          )}
          <ImageContainer>
            {!open && (arrayNum == 0) & (slideNumber <= 6)
              ? living.map((photo, i) => (
                  <ImageWrapper key={i}>
                    <Image
                      onClick={() => openImage(i)}
                      src={photo.src}
                      onMouseEnter={() => setArrayName(photo.desc)}
                      onMouseLeave={() => setArrayName("woonkamer")}
                    ></Image>
                  </ImageWrapper>
                ))
              : !open && arrayNum == 1
              ? bathroom.map((photo, i) => (
                  <ImageWrapper key={i}>
                    <Image
                      onClick={() => openImage(i + 6)}
                      src={photo.src}
                      onMouseEnter={() => setArrayName(photo.desc)}
                      onMouseLeave={() => setArrayName("badkamer")}
                    ></Image>
                  </ImageWrapper>
                ))
              : !open && arrayNum == 2
              ? bedroom.map((photo, i) => (
                  <ImageWrapper key={i}>
                    <Image
                      onClick={() => openImage(i + 12)}
                      src={photo.src}
                      onMouseEnter={() => setArrayName(photo.desc)}
                      onMouseLeave={() => setArrayName("slaapkamers")}
                    ></Image>
                  </ImageWrapper>
                ))
              : !open && arrayNum == 3
              ? garden.map((photo, i) => (
                  <ImageWrapper key={i}>
                    <Image
                      onClick={() => openImage(i + 18)}
                      src={photo.src}
                      onMouseEnter={() => setArrayName(photo.desc)}
                      onMouseLeave={() => setArrayName("tuin")}
                    ></Image>
                  </ImageWrapper>
                ))
              : !open && arrayNum == 4
              ? area.map((photo, i) => (
                  <ImageWrapper key={i}>
                    <Image
                      onClick={() => openImage(i + 24)}
                      src={photo.src}
                      onMouseEnter={() => setArrayName(photo.desc)}
                      onMouseLeave={() => setArrayName("omgeving")}
                    ></Image>
                  </ImageWrapper>
                ))
              : ""}
          </ImageContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Photos;
