import styled from "styled-components";
import { Container } from "../../globalStyles";
import { Link } from "react-router-dom";
import ErivLogo from "../../images/eriv_logo.svg";

export const Header = styled.header`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  position: sticky;
  top: 0;
  z-index: 2000;
  padding-top: 2rem;
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const HeaderLogo = styled(Link)`
  color: hsla(0, 0%, 100%, 0.8);
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

export const HeaderIcon = styled.img.attrs({
  src: `${ErivLogo}`,
})`
  height: 50px;
  width: 50px;
  z-index: 2;
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    right: 0;
    padding-top: 1.6rem;
    padding-right: 2rem;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ isClicked }) => (isClicked ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    background: #1c1f22;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #fd4d4d;
  }

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;

export const NavLinks = styled(Link)`
  color: #d1d2d2;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  font-size: 16px;
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    padding-top: 3rem;
    width: 100%;
    display: table;
    font-size: 20px;
    &:hover {
      color: #fd4d4d;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 6px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
  }
`;
