import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@chakra-ui/react";

import {
  TextFieldInput,
  StyledForm,
  CoolText,
  RegisterLink,
  RegisterLinkContainer,
} from "./LoginForm.elements.js";
import { RedSmallButton } from "../../globalStyles";
import { login } from "../../store/actions/auth.js";
import { useHistory } from "react-router";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        usernameOrEmail: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        dispatch(login(values, history));
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <StyledForm onSubmit={handleSubmit}>
          <CoolText>Login to your eriv account</CoolText>
          <TextFieldInput
            placeholder="Username or email"
            name="usernameOrEmail"
            value={values.usernameOrEmail}
            onChange={handleChange}
          />
          <TextFieldInput
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
          />
          {!isSubmitting ? (
            <RedSmallButton type="submit">Login</RedSmallButton>
          ) : (
            <Box mt={60}>
              <CircularProgress isIndeterminate color="#fd4d4d" />
            </Box>
          )}
          <RegisterLinkContainer>
            <RegisterLink to="/register">Create an eriv account</RegisterLink>
          </RegisterLinkContainer>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
