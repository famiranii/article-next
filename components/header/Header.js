import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";

function Header({ drawerWidth, handleDrawerToggle }) {
  console.log(drawerWidth);
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.clear("articlesEmail");
    router.push("/login");
  };
  return (
    <header>
      <AppBar
        sx={{
          display: "flex",
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Box sx={{display:"flex",alignItems:"center",width:"90%",justifyContent:"space-between"}}>
            <Box sx={{ display: "flex",alignItems:"center" }}>
              <NewspaperIcon color="yellow" sx={{ fontSize: 50 }} />
              <Typography variant="h1">Articles</Typography>
            </Box>
            <Button
            sx={{mr:{xs:2,lg:0}}}
              variant="contained"
              color="navyBlue"
              onClick={logoutHandler}
            >
              logout
            </Button>
          </Box>
        </Box>
      </AppBar>
    </header>
  );
}

export default Header;
