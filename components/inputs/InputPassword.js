import { useReducer, useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

function InputPassword({ getInputInfo, validation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: true,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onchangeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validation,
      isValid: true,
    });
  };
  const { value, isValid } = mainInput;
  useEffect(() => {
    getInputInfo("password", value, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <FormControl sx={{ mt: 1 }} variant="standard" margin="normal">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        value={mainInput.value}
        id="standard-adornment-password"
        type={showPassword ? "dence" : "password"}
        margin="dense"
        autoComplete="off"
        placeholder="more than 7 charector"
        error={!mainInput.isValid}
        onChange={onchangeHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default InputPassword;
