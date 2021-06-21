import React from "react";

import { UploadFormContainer } from "../../components/UploadForm/UploadForm.elements.js";
import { UploadForm } from "../../components";

const Upload = () => {
  return (
    <div>
      <UploadFormContainer>
        <UploadForm></UploadForm>
      </UploadFormContainer>
    </div>
  );
};

export default Upload;
