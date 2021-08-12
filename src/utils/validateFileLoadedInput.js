const acceptedFormats = [".xlsx"];

export const validateFileLoadedInput = fileName => {
    let isFileValid = false;
    acceptedFormats.some(ext => {
        if(fileName.endsWith(ext)) {
            isFileValid = true;
        }
    })
}
