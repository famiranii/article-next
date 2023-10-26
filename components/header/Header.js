import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NewspaperIcon from "@mui/icons-material/Newspaper";
const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
  },
  buttonBox: {
    paddingRight: theme.spacing(3),
  },
  logoutButton: {
    color: "#FFFFFF",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <header>
      <Paper className={classes.header}>
        <Box className={classes.logoBox}>
          <NewspaperIcon color="yellow" sx={{ fontSize: 50 }} />
          <Typography variant="h1">Articles</Typography>
        </Box>
        <Box className={classes.buttonBox}>
          <Button
            variant="contained"
            color="navyBlue"
            className={classes.logoutButton}
          >
            logout
          </Button>
        </Box>
      </Paper>
    </header>
  );
}

export default Header;
