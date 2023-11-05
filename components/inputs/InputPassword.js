import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function InputPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ mt: 1 }} variant="standard" margin="normal">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? "dence" : "password"}
        margin="dense"
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
