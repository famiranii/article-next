import { FormControl, Paper, Box, Grid } from "@mui/material";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import SubmitBtn from "@/components/buttons/SubmitBtn";
import InputPassword from "@/components/inputs/InputPassword";
import InputEmail from "@/components/inputs/InputEmail";
import InputNumber from "@/components/inputs/InputNumber";
import InputName from "@/components/inputs/InputName";
import Notification from "@/components/notifications/Notification";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_NUMBER":
      return { ...state, number: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [status, setStatus] = useState("none");
  const nameDispatch = (name) => {
    dispatch({ type: "SET_NAME", payload: name });
  };
  const emailDispatch = (email) => {
    dispatch({ type: "SET_EMAIL", payload: email });
  };
  const numberDispatch = (number) => {
    dispatch({ type: "SET_NUMBER", payload: number });
  };
  const passwordDispatch = (pass) => {
    dispatch({ type: "SET_PASSWORD", payload: pass });
  };
  const submitForm = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/clientsHandler", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        setStatus("success");
        localStorage.setItem("articlesEmail", state.email);
        router.push("/articles");
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
                <InputName nameHandler={nameDispatch} />
                <InputEmail emailHandler={emailDispatch} />
                <InputPassword passwordHandler={passwordDispatch} />
                <InputNumber numberHandler={numberDispatch} />
                <SubmitBtn submitForm={submitForm} status={status} />
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
