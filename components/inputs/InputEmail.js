import { TextField, FormHelperText } from "@mui/material";

export default function InputEmail({emailHandler}) {
  return (
    <>
      <TextField id="email" label="email" variant="standard" margin="normal" onChange={(e)=>emailHandler(e.target.value)}/>
      <FormHelperText>we will never share your email</FormHelperText>
    </>
  );
}
