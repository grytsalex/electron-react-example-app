const acceptedFormats = [".xlsx"];

export const validateLoadedFile = (fileName) => {
  // eslint-disable-next-line
  let isFileValid = false;
  // eslint-disable-next-line
  acceptedFormats.some((ext) => {
    if (fileName.endsWith(ext)) {
      isFileValid = true;
    }
  });
};
