import { TextField } from "@mui/material";
export default function InputNumber({numberHandler}) {
  return (
    <TextField
      id="standard-number"
      label="tel number"
      type="number"
      variant="standard"
      margin="normal"
      onChange={(e)=>numberHandler(e.target.value)}
    />
  );
}
