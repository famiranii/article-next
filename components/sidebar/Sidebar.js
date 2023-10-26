import React from "react";
import List from "@mui/material/List";
import SidebatItem from "./SidebatItem";

function Sidebar({sideBarItems}) {
  const style = {
    width: "100%",
    maxWidth: 200,
    bgcolor: "background.paper",
    minHeight: "100vh",
  };
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {sideBarItems.map((item, index) => (
        <SidebatItem key={index} item={item} />
      ))}
    </List>
  );
}

export default Sidebar;
