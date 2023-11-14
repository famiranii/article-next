import { TextField, FormHelperText } from "@mui/material";
import validator from "../validator/Validator";
import { useEffect, useReducer } from "react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        value: action.value,
        isValid: validator(action.value, action.validation),
      };
    }
    default:
      return state;
  }
};

export default function CustomInput({
  getInputInfo,
  id,
  type,
  margin,
  validation,
  placeholder
}) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: true,
  });
  const onchangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validation,
      isValid: true,
    });
  };
  const { value, isValid } = mainInput;
  useEffect(() => {
    getInputInfo(id, value, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <>
      <TextField
        error={!mainInput.isValid}
        placeholder={placeholder}
        id={id}
        label={id}
        type={type}
        variant="standard"
        margin={margin}
        onChange={onchangeHandler}
      />
      {id === "email" && (
        <FormHelperText id="my-helper-text">
          We will never share your email.
        </FormHelperText>
      )}
    </>
  );
}
