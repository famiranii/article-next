import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./topices.module.css";
import SingleTopic from "./topic/SingleTopic";

function Topics({ dispatchTopic, topics, removeTopic }) {
  const [topic, setTopic] = useState("");

  const addTopic = () => {
    dispatchTopic(topic);
    setTopic("");
  };

  const deleteTopic = (deletedTopic) => {
    removeTopic(deletedTopic);
  };
  return (
    <>
      <div className={styles.topic}>
        <TextField
          label="topics"
          color="navyBlue"
          rows={5}
          fullWidth
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
        <Fab
          color="secondary"
          aria-label="add"
          size="small"
          className={styles.fab}
          onClick={addTopic}
        >
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.showSlug}>
        {topics.map((topic, index) => (
          <SingleTopic key={index} topic={topic} deleteTopic={deleteTopic} />
        ))}
      </div>
    </>
  );
}

export default Topics;
