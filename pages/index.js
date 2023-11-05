import {
  FormControl,
  FormHelperText,
  Paper,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import InputPassword from "@/components/inputs/InputPassword";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "90%",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ width: "100%" }}>
          <Grid item xs={12} lg={6} sx={{ textAlign: "center" }}>
            <Image
              className={styles.registerImage}
              src="/assets/login.jpg"
              width={500}
              height={300}
              alt="Picture of the author"
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ textAlign: "center" }}>
            <FormControl sx={{ width: "65%" }}>
              <TextField id="name" label="name" variant="standard" />
              <TextField
                id="email"
                label="email"
                variant="standard"
                margin="normal"
              />
              <FormHelperText>we will never share your email</FormHelperText>
              <InputPassword />
              <TextField
                id="standard-number"
                label="tel number"
                type="number"
                variant="standard"
                margin="normal"
              />
              <SubmitBtn />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
