import React from "react";

import { RegisterFormContainer } from "../../components/RegisterForm/RegisterForm.elements.js";
import { RegisterForm } from "../../components";

const Register = () => {
  return (
    <div>
      <RegisterFormContainer>
        <RegisterForm></RegisterForm>
      </RegisterFormContainer>
    </div>
  );
};

export default Register;
