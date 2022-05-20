import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Box, CircularProgress } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import ReactCrop from "react-image-crop";
import cropImage from "./cropImage";
import "react-image-crop/dist/ReactCrop.css";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import "./UploadForm.css";

import {
  TextFieldInput,
  StyledForm,
  CoolText,
  TextFieldArea,
  FileInput,
  FileInputLabel,
  ErrorText,
  ImageFileInputLabel,
  ReactCropContainer,
} from "./UploadForm.elements.js";
import { RedSmallButton } from "../../globalStyles";
import { createPost } from "../../store/actions/posts.js";
import { useRef } from "react";

const UploadForm = () => {
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({
    circularCrop: true,
    unit: "%",
    width: 30,
    aspect: 1,
  });
  const [filename, setFilename] = useState();
  const [imageFilename, setImageFilename] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const inputRef = useRef();

  if (user) {
    return (
      <Formik
        initialValues={{
          title: "",
          message: "",
          tags: "",
          file: "",
          imageFile: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const data = await dispatch(
            createPost({
              ...values,
              creatorUsername: user?.result.username,
            })
          );
          if (data.errorMessage) {
            setError(data.errorMessage);
          } else if (data) {
            history.push(`/p?postId=${data._id}`);
          }
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
          <StyledForm onSubmit={handleSubmit} ref={inputRef}>
            <CoolText>
              Upload a Clip (DO NOT post anything you don't have the rights to
              under copyright law)
            </CoolText>
            <TextFieldInput
              placeholder="Title of the clip (include artist preferrably too)"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <TextFieldArea
              placeholder="A short description of the clip (optional)"
              name="message"
              value={values.message}
              onChange={handleChange}
            />
            <TextFieldInput
              placeholder="Tags separated by space (optional)"
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
            <br />
            <FileInput
              name="imageFile"
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={(e) => {
                setFieldValue("imageFile", e.target.files[0]);
                console.log(e.target.files[0]);
                setImageFilename(e.target.files[0].name);
                const reader = new FileReader();
                reader.addEventListener("load", () => setUpImg(reader.result));
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
            <span>
              <ImageFileInputLabel htmlFor="imageFile">
                Choose a Cover Image
              </ImageFileInputLabel>
              {imageFilename}
            </span>
            {imageFilename && (
              <ReactCropContainer>
                <ReactCrop
                  src={upImg}
                  crop={crop}
                  onChange={(c) => {
                    console.log(c);
                    setCrop(c);
                  }}
                  onComplete={async (c) => {
                    console.log(inputRef.current.clientWidth);
                    const blob = await cropImage(
                      upImg,
                      values.imageFile,
                      c,
                      inputRef.current.clientWidth
                    );
                    const file = new File([blob], imageFilename);
                    setFieldValue("imageFile", file);
                  }}
                />
              </ReactCropContainer>
            )}
            {error && <ErrorText>{error}</ErrorText>}
            {!isSubmitting ? (
              <div>
                <RedSmallButton type="submit">Upload</RedSmallButton>
              </div>
            ) : (
              <Box mt={30}>
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
