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
} from "./RegisterForm.elements.js";
import { RedSmallButton } from "../../globalStyles";

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <StyledForm onSubmit={handleSubmit}>
          <CoolText>Create an eriv account</CoolText>
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

          {!isSubmitting ? (
            <RedSmallButton type="submit">Sign Up</RedSmallButton>
          ) : (
            <Box mt={60}>
              <CircularProgress isIndeterminate color="#fd4d4d" />
            </Box>
          )}

          <RegisterLinkContainer>
            <RegisterLink to="/login">Login to your eriv account</RegisterLink>
          </RegisterLinkContainer>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RegisterForm;
