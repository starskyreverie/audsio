import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button, RedButton } from "../../globalStyles.js";
import { useLocation, useHistory } from "react-router-dom";

import { Modal } from "../index.js";

import {
  Header,
  HeaderContainer,
  HeaderLogo,
  HeaderIcon,
  MobileIcon,
  NavMenu,
  NavItemBtn,
  NavBtnLink,
  NavBtnDiv,
  CreatorLink,
} from "./Header.elements.js";

const HeaderBar = () => {
  const [isClicked, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isModalVisible, setModalVisibility] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    setClick(!isClicked);
  };

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Header>
          <HeaderContainer>
            <HeaderLogo
              onClick={() => {
                history.push("/home");
              }}
            >
              <HeaderIcon alt="Audsio Logo" />
            </HeaderLogo>
            <MobileIcon onClick={handleClick}>
              {isClicked ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} isClicked={isClicked}>
              {!user ? (
                <>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to="/login">
                        <Button primary>Login</Button>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/login">
                        <Button onClick={closeMobileMenu} fontBig primary>
                          Login
                        </Button>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnDiv>
                        <Button
                          primary
                          onClick={() => {
                            setModalVisibility(true);
                          }}
                        >
                          Saved
                        </Button>
                      </NavBtnDiv>
                    ) : (
                      <NavBtnDiv>
                        <Button
                          onClick={() => {
                            setModalVisibility(true);
                          }}
                          fontBig
                          primary
                        >
                          Saved
                        </Button>
                      </NavBtnDiv>
                    )}
                  </NavItemBtn>
                  <NavItemBtn>
                    {" "}
                    {button ? (
                      <NavBtnDiv>
                        <RedButton
                          primary
                          onClick={() => {
                            setModalVisibility(true);
                          }}
                        >
                          Upload
                        </RedButton>
                      </NavBtnDiv>
                    ) : (
                      <NavBtnDiv>
                        <RedButton
                          onClick={() => {
                            setModalVisibility(true);
                          }}
                          fontBig
                          primary
                        >
                          Upload
                        </RedButton>
                      </NavBtnDiv>
                    )}
                  </NavItemBtn>
                </>
              ) : (
                <>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to="/liked">
                        <Button primary>Saved</Button>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/liked">
                        <Button onClick={closeMobileMenu} fontBig primary>
                          Saved
                        </Button>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink to="/upload">
                        <RedButton primary>Upload</RedButton>
                      </NavBtnLink>
                    ) : (
                      <NavBtnLink to="/upload">
                        <RedButton onClick={closeMobileMenu} fontBig primary>
                          Upload
                        </RedButton>
                      </NavBtnLink>
                    )}
                  </NavItemBtn>
                  <CreatorLink to={`/u?name=${user.result.username}`}>
                    {user.result.username}
                  </CreatorLink>
                </>
              )}
            </NavMenu>
          </HeaderContainer>
        </Header>
      </IconContext.Provider>

      {isModalVisible && (
        <Modal
          onClose={() => setModalVisibility(false)}
          title="You must be logged in to do that"
        />
      )}
    </>
  );
};

export default HeaderBar;
