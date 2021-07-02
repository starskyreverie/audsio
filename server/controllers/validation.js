export const errorJson = (message) => {
  const errorObject = {
    errorMessage: message,
  };
  return errorObject;
};

export const validateCreatePostForm = (post) => {
  if (!post.title.length) {
    console.log("length too short");
  }
};
