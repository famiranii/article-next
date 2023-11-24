import { useReducer, useEffect } from "react";
import { TextField } from "@mui/material";
import validator from "../validator/Validator";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        value: action.value,
        isValid: validator(action.value, action.validation),
      };
    default:
      return state;
  }
};

function AddArticleInput({
  id,
  minRows,
  validation,
  getInputInfo,
  placeHolder,
  inputValue,
}) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: inputValue,
    isValid: false,
  });
  const inputHandler = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      isValid: true,
      validation,
    });
  };
  const { value, isValid } = mainInput;
  useEffect(() => {
    getInputInfo(id, value, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <TextField
      label={id}
      color="navyBlue"
      value={inputValue}
      fullWidth
      minRows={minRows}
      multiline
      margin="dense"
      placeholder={placeHolder}
      error={!mainInput.isValid}
      onChange={inputHandler}
      // onKeyDown={handleEnter}
    />
  );
}

export default AddArticleInput;
