import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@chakra-ui/react";

import {
  TextFieldInput,
  StyledForm,
  CoolText,
  RegisterLink,
  RegisterLinkContainer,
  ErrorText,
} from "./RegisterForm.elements.js";
import { RedSmallButton } from "../../globalStyles";
import { useHistory } from "react-router";
import { signUp } from "../../store/actions/auth.js";

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        const errors = await dispatch(signUp(values, history));
        if (errors) {
          setError(errors);
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <StyledForm onSubmit={handleSubmit}>
          <CoolText>Create an Audsio account</CoolText>
          <TextFieldInput
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <TextFieldInput
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <TextFieldInput
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
          />
          <TextFieldInput
            placeholder="Confirm password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            type="password"
          />
          {error && <ErrorText>{error}</ErrorText>}
          {!isSubmitting ? (
            <RedSmallButton type="submit">Sign Up</RedSmallButton>
          ) : (
            <Box mt={30}>
              <CircularProgress isIndeterminate color="#fd4d4d" />
            </Box>
          )}
          <RegisterLinkContainer>
            <RegisterLink to="/login">
              Login to your Audsio account
            </RegisterLink>
          </RegisterLinkContainer>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RegisterForm;
