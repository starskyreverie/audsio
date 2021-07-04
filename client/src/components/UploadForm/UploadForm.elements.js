import styled from "styled-components";

export const UploadFormContainer = styled.main`
  margin: 2rem 0;
  flex: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  color: #d1d2d2;
`;

export const StyledForm = styled.form`
  width: 80%;
  padding: 0;
  box-sizing: border-box;
  align-items: center;
  max-width: 800px;
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
  max-width: 800px;
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
  max-width: 800px;
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
  display: flex;
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

export const ImageFileInputLabel = styled.label`
  color: hsla(0, 0%, 100%, 0.8);
  background: hsla(0, 0%, 100%, 0.05);
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px 20px;
  border-radius: 0.25em;
  cursor: pointer;
  display: inline-block;
  width: 196px;
  margin-top: 15px;
  margin-right: 10px;
`;
export const containerWithCenteredText = styled.div`
  width: 100%;
  text-align: center;
`;

export const ErrorText = styled.div`
  color: #fd4d4d;
  margin-top: 15px;
`;
