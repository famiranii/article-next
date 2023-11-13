import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import SidebatItem from "./SidebartItem";
import Header from "../header/Header";
import { Button, Typography } from "@mui/material";

const drawerWidth = 240;

function ResponsiveDrawer({ sideBarItems }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("articlesEmail");
    if (emailFromStorage) {
      const atIndex = emailFromStorage.indexOf("@");
      const username = emailFromStorage.slice(0, atIndex);
      setEmail(username);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography
        align="center"
        p={2}
        fontSize={22}
        color="#ffff"
        bgcolor="#14213d"
      >
        {email}
      </Typography>

      <Divider />
      {sideBarItems.map((item) => (
        <SidebatItem key={item.title} item={item} />
      ))}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default ResponsiveDrawer;
