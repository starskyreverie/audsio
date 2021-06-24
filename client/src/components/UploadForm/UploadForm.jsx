import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@chakra-ui/react";

import {
  TextFieldInput,
  StyledForm,
  CoolText,
  TextFieldArea,
  FileInput,
  FileInputLabel,
} from "./UploadForm.elements.js";
import { RedSmallButton } from "../../globalStyles";
import { createPost } from "../../store/actions/posts.js";

const UploadForm = () => {
  const [filename, setFilename] = useState();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return (
      <Formik
        initialValues={{
          title: "",
          message: "",
          tags: "",
          file: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            createPost({
              ...values,
              creatorUsername: user?.result.username,
            })
          );
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <CoolText>Upload a Clip</CoolText>
            <TextFieldInput
              placeholder="Title of the clip"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <TextFieldArea
              placeholder="A short description of the clip"
              name="message"
              value={values.message}
              onChange={handleChange}
            />
            <TextFieldInput
              placeholder="Tags separated by comma"
              name="tags"
              value={values.tags}
              onChange={(e) => {
                setFieldValue("tags", e.target.value);
              }}
            />
            <FileInput
              name="file"
              type="file"
              id="audioFile"
              accept="audio/*"
              onChange={(e) => {
                setFieldValue("file", e.target.files[0]);
                console.log(e.target.files[0]);
                setFilename(e.target.files[0].name);
              }}
            />
            <span>
              <FileInputLabel htmlFor="audioFile">
                Choose an Audio File
              </FileInputLabel>
              {filename}
            </span>
            <br></br>
            {!isSubmitting ? (
              <RedSmallButton type="submit">Upload</RedSmallButton>
            ) : (
              <Box mt={60}>
                <CircularProgress isIndeterminate color="#fd4d4d" />
              </Box>
            )}
          </StyledForm>
        )}
      </Formik>
    );
  }
  return <div>login dumbass</div>;
};

export default UploadForm;
