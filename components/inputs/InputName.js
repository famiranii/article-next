import { TextField } from "@mui/material";
export default function InputName({ nameHandler }) {
  return (
    <TextField
      id="name"
      label="name"
      variant="standard"
      onChange={(e) => nameHandler(e.target.value)}
    />
  );
}
