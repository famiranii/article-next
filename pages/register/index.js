import { FormControl, Paper, Box, Grid,Link } from "@mui/material";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import InputPassword from "@/components/inputs/InputPassword";
import CustomInput from "@/components/inputs/CustomInput";
import Notification from "@/components/notifications/Notification";
import {
  minValidator,
  maxValidator,
  emailValidator,
} from "@/components/validator/Rules";
import useForm from "@/components/hook/useForm";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [status, setStatus] = useState("none");
  const [formState, getInputInfo] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      number: { value: "", isValid: false },
    },
    false
  );
  const submitForm = async () => {
    setStatus("loading");
    const registerData = {
      name: formState.inputValue.name.value,
      email: formState.inputValue.email.value,
      password: formState.inputValue.password.value,
      number: formState.inputValue.number.value,
    };
    try {
      const response = await fetch("../api/clientsHandler", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (response.ok) {
        setStatus("success");
        localStorage.setItem("articlesEmail", registerData.email);
        router.push("/");
      } else {
        console.error("POST request failed");
        setStatus("error");
      }
    } catch (error) {
      console.error("An error occurred while making the POST request", error);
      setStatus("error");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0.5rem",
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
              alt="register"
              priority="high"
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ textAlign: "center" }}>
            <form>
              <FormControl sx={{ width: "65%" }} actions="submit">
                <CustomInput
                  id="name"
                  type="text"
                  getInputInfo={getInputInfo}
                  validation={[minValidator(6), maxValidator(20)]}
                />
                <CustomInput
                  margin="normal"
                  id="email"
                  type="email"
                  getInputInfo={getInputInfo}
                  validation={[emailValidator()]}
                />
                <InputPassword
                  getInputInfo={getInputInfo}
                  validation={[minValidator(8)]}
                />
                <CustomInput
                  margin="normal"
                  id="number"
                  type="number"
                  getInputInfo={getInputInfo}
                  validation={[minValidator(8), maxValidator(11)]}
                />
                <SubmitBtn
                  submitForm={submitForm}
                  status={status}
                  disabled={formState.isFormValid}
                />
                <Link href="/login" variant="body2" mt={2}>
                  login page
                </Link>
              </FormControl>
            </form>
          </Grid>
          {status === "success" && (
            <Notification type={status} text="you signed up successfully" />
          )}
          {status === "error" && (
            <Notification type={status} text="there is problem try again" />
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
