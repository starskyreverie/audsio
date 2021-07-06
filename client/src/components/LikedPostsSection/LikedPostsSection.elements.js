import styled from "styled-components";

export const SearchContainer = styled.main`
  margin: 2rem 0;
  flex: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  color: #d1d2d2;
`;

export const SearchBar = styled.input`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  flex: none;
  padding: 12px 16px;
  box-sizing: border-box;
  color: hsla(0, 0%, 100%, 0.8);
  background: hsla(0, 0%, 100%, 0.05);
  margin-bottom: 0 !important;
  margin-top: 30px;
  border: none;
  display: block;
`;
