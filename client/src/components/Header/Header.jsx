import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button, RedButton } from "../../globalStyles.js";
import { useLocation } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  HeaderLogo,
  HeaderIcon,
  MobileIcon,
  NavMenu,
  NavItemBtn,
  NavBtnLink,
  CreatorLink,
} from "./Header.elements";

const HeaderBar = () => {
  const [isClicked, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const location = useLocation();

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
            <HeaderLogo to="/">
              <HeaderIcon />
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
                    {" "}
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
                </>
              ) : (
                <>
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
                  <CreatorLink to={`/u/${user.result.username}`}>
                    {user.result.username}
                  </CreatorLink>
                </>
              )}
            </NavMenu>
          </HeaderContainer>
        </Header>
      </IconContext.Provider>
    </>
  );
};

export default HeaderBar;
