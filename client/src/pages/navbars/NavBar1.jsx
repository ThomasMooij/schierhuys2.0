import styled from "styled-components";
import NavLink from "../../components/home/Link";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HouseIcon from "@mui/icons-material/House";
import { Link as MobileLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../functions/newRequest";
import { useContext, useState } from "react";
import { langContext } from "../../context/langContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Nav = styled.nav`
  position: sticky;
  top: 0px;
  z-index: 999;
  box-shadow: 0px 1px 10px #999;
`;
const NavContainer = styled.div`
  background-color: #5d8238;
  width: 100%;
  max-width: 100%;
  z-index: 30;
  height: 105px;
  justify-content: center;
  display: flex;
  justify-content: space-evenly;
`;
const InnerContainer = styled.div`
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: space-evenly;
`;
const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 15px 28px;
`;
const IconDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  @media (max-width: 780px) {
    display: none;
  }
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;
  @media (max-width: 780px) {
    display: none;
  }
`;
const ContactLogo = styled.div`
  background-color: whitesmoke;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContactText = styled.p`
  color: white;
`;
const LeftSide = styled.div`
  margin: auto;
  width: 70%;
  display: flex;
  justify-content: space-evenly;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 45px;
  border-radius: 30%;
  flex-direction: column;
`;
const Logo = styled.p`
  font-size: 35px;
  color: whitesmoke;
  padding: 10px;
  font-weight: 700;
`;
const LogoText = styled.p`
  font-size: 14;
  color: whitesmoke;
  font-weight: 600;
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const LangBtn = styled.button`
  cursor: pointer;
  background-color: inherit;
  color: white;
  font-size: 19px;
  font-weight: 900;
  border-radius: 50%;
  padding: 15px;
  outline: inherit;
  border: none;
  @media (max-width: 1380px) {
    display: none;
  }
`;
const AdminLinks = styled.article`
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;

  @media (max-width: 780px) {
    display: none;
  }
`;
const MobileIcon = styled.article`
  display: flex;
  justify-content: flex-end;
  color: white;
  align-items: center;
  transform: scale(1.3);
  cursor: pointer;

  &:hover {
    color: yellowgreen;
  }

  @media (min-width: 1380px) {
    display: none;
  }
`;
const Close = styled.article`
  transform: scale(1.8);
  color: red;
  cursor: pointer;
  &:hover {
    color: yellowgreen;
  }
`;
const MobileMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: lightgreen;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  justify-content: flex-start;
  padding-top: 80px;
  gap: 55px;
`;
const MobileItem = styled.li`
  padding: 6px 0px;
  text-decoration: none;
  list-style-type: none;
  font-size: 19px;
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid blue;
  }
`;
const NavBar1 = ({ selectedPage, setSelectedPage }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const admin = JSON.parse(localStorage.getItem("deEchteGertGeheim"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    await newRequest.post("/auth/logout");
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const { lang, setLang } = useContext(langContext);

  const changeLang = () => {
    localStorage.setItem("lang", "ENG");
    setLang("ENG");
  };

  const [openMobile, setOpenMobile] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <InnerContainer>
          <ContactContainer>
            <IconDiv>
              <ContactLogo>
                <LocalPhoneIcon />
              </ContactLogo>
              <ContactLogo>
                <HouseIcon />
              </ContactLogo>
            </IconDiv>

            <TextDiv>
              <ContactText>06000006</ContactText>
              <ContactText>Berkenlaan 10, 1800PX</ContactText>
            </TextDiv>
          </ContactContainer>
          <LeftSide>
            <NavLink
              page="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page="Fotos"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <LogoContainer>
              <Logo>Schierhuys</Logo>
              <LogoText>Vakanties in Drenthe</LogoText>
            </LogoContainer>
            <NavLink
              page="Reserve"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page="Reviews&info"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page="Contact"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />

            <AdminLinks>
              {admin ? <Link to="/admin">Admin</Link> : null}
              {currentUser || admin ? (
                <Link onClick={handleLogout}>logout</Link>
              ) : null}
            </AdminLinks>

            {/* MOBILE */}
            <MobileIcon onClick={() => setOpenMobile(!openMobile)}>
              {" "}
              {!openMobile ? <MenuIcon /> : <CloseIcon />}
            </MobileIcon>
            {openMobile && (
              <MobileMenu>
                <Close onClick={() => setOpenMobile(false)}>
                  <CloseIcon />
                </Close>
                <div>
                  <MobileLink
                    to="Fotos"
                    smooth={true}
                    offset={-250}
                    duration={500}
                    onClick={() => setOpenMobile(false)}
                  >
                    <MobileItem>Foto's</MobileItem>
                  </MobileLink>
                  <MobileLink
                    to="Reserve"
                    smooth={true}
                    offset={-250}
                    duration={500}
                    onClick={() => setOpenMobile(false)}
                  >
                    <MobileItem>Reserve</MobileItem>
                  </MobileLink>
                  <MobileLink
                    to="Reviews&info"
                    smooth={true}
                    offset={-250}
                    duration={500}
                    onClick={() => setOpenMobile(false)}
                  >
                    <MobileItem>Reviews&info</MobileItem>
                  </MobileLink>
                  <MobileLink
                    to="Contact"
                    smooth={true}
                    offset={-250}
                    duration={500}
                    onClick={() => setOpenMobile(false)}
                  >
                    <MobileItem>Contact</MobileItem>
                  </MobileLink>
                  {admin ? (
                    <MobileItem>
                      <Link onClick={() => setOpenMobile(false)} to="/admin">
                        Admin
                      </Link>{" "}
                    </MobileItem>
                  ) : null}
                  {currentUser || admin ? (
                    <MobileItem>
                      <Link onClick={handleLogout}>logout</Link>{" "}
                    </MobileItem>
                  ) : null}
                </div>
              </MobileMenu>
            )}
          </LeftSide>
          <RightSide>
            <LangBtn onClick={changeLang}>{lang}</LangBtn>
          </RightSide>
        </InnerContainer>
      </NavContainer>
    </Nav>
  );
};

export default NavBar1;
