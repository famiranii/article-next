import { FormControl, Paper, Box, Grid, Link } from "@mui/material";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import InputPassword from "@/components/inputs/InputPassword";
import CustomInput from "@/components/inputs/CustomInput";
import Notification from "@/components/notifications/Notification";
import { minValidator, emailValidator } from "@/components/validator/Rules";
import useForm from "@/components/hook/useForm";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [status, setStatus] = useState("none");
  const [message, setMessage] = useState("");
  const [formState, getInputInfo] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );
  const submitForm = async () => {
    setStatus("loading");
    const registerData = {
      email: formState.inputValue.email.value,
      password: formState.inputValue.password.value,
    };
    try {
      const response = await fetch("../api/clientsHandler/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        localStorage.setItem("articlesEmail", registerData.email);
        router.push("/");
      } else {
        setMessage(data.error);
        console.error("POST request failed");
        setStatus("error");
      }
    } catch (error) {
      console.error("An error occurred while making the POST request", error);
      setMessage(data.error);
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
              src="/assets/lock.jpg"
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
                  margin="normal"
                  id="email"
                  type="email"
                  placeholder="email should be valid"
                  getInputInfo={getInputInfo}
                  validation={[emailValidator()]}
                />
                <InputPassword
                  getInputInfo={getInputInfo}
                  validation={[minValidator(8)]}
                />
                <SubmitBtn
                  submitForm={submitForm}
                  status={status}
                  disabled={formState.isFormValid}
                />
                <Link href="/register" variant="body2" mt={2}>
                  register page
                </Link>
              </FormControl>
            </form>
          </Grid>
          {status === "success" && (
            <Notification type={status} text={message} />
          )}
          {status === "error" && (
            <Notification type={status} text={message} />
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
