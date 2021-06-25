import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterFormContainer = styled.main`
  margin: 2rem 0;
  display: flex;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #d1d2d2;
`;

export const StyledForm = styled.form`
  margin-top: 20vh;
  width: 80%;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  max-width: 800px;
  text-align: center;
`;

export const TextFieldGroup = styled.div`
  position: relative;
  background: hsla(0, 0%, 100%, 0.05);
  border-radius: 2px;
  overflow: hidden;
`;

export const TextFieldLabel = styled.label`
  padding: 8px 16px 0;
  cursor: text;
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const TextFieldInput = styled.input`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  flex: none;
  padding: 12px 16px;
  box-sizing: border-box;
  color: hsla(0, 0%, 100%, 0.8);
  background: hsla(0, 0%, 100%, 0.05);
  margin-bottom: 0 !important;
  margin-top: 15px;
  border: none;
  display: block;
`;

export const TextFieldArea = styled.textarea`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  flex: none;
  padding: 12px 16px;
  box-sizing: border-box;
  color: hsla(0, 0%, 100%, 0.8);
  background: hsla(0, 0%, 100%, 0.05);
  margin-bottom: 0 !important;
  margin-top: 15px;
  border: none;
  display: block;
  resize: none;
  font-size: 13px;
  height: 80px;
`;

export const CoolText = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  align-self: center;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  color: hsla(0, 0%, 100%, 0.8);
  background: hsla(0, 0%, 100%, 0.05);
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px 20px;
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-block;
  width: 190px;
  margin-top: 15px;
  margin-right: 10px;
`;

export const containerWithCenteredText = styled.div`
  width: 100%;
  text-align: center;
`;

export const SignUpText = styled.div`
  margin-top: 15px;
  font-size: 16px;
  color: hsla(0, 0%, 100%, 0.48);
`;

export const RegisterLinkContainer = styled.div`
  margin-top: 15px;
`;

export const RegisterLink = styled(Link)`
  margin-top: 15px;
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.48);

  &:hover {
    text-decoration: underline;
  }
`;
