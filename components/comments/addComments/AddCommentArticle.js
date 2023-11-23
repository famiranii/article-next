import { useState } from "react";
import AddArticleInput from "../../inputs/AddArticleInput";
import Notification from "../../notifications/Notification";
import SubmitBtn from "../../buttons/SubmitBtn";
import { minValidator } from "../../validator/Rules";
import UseForm from "../../hook/useForm";
import { Paper } from "@mui/material";

function AddCommentArticle({ id }) {
  const [status, setStatus] = useState("none");
  const [formState, getInputInfo] = UseForm(
    {
      comment: { value: "", isValid: false },
    },
    false
  );
  const submitForm = async () => {
    setStatus("loading");
    const completeForm = {
      email: localStorage.getItem("articlesEmail"),
      comment: formState.inputValue.comment.value,
      articleId: id,
    };
    console.log(completeForm);
    try {
      const response = await fetch(
        "../../../api/articleHandler",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeForm),
        }
      );
      if (response.ok) {
        setStatus("success");
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
    <Paper elevation={3} sx={{ p: 2, bgcolor: "#f8f8f8" }}>
      <AddArticleInput
        id="comment"
        minRows={2}
        placeHolder="minimum length is 10"
        getInputInfo={getInputInfo}
        validation={[minValidator(10)]}
      />
      <SubmitBtn
        text="add comment"
        status={status}
        submitForm={submitForm}
        disabled={formState.isFormValid}
      />
      {status === "success" && (
        <Notification type={status} text="your article added successfully" />
      )}
      {status === "error" && (
        <Notification type={status} text="we had an error, try again" />
      )}
    </Paper>
  );
}

export default AddCommentArticle;
