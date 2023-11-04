import Sidebar from "@/components/sidebar/Sidebar";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../header/Header"), {
  ssr: false,
});

import { Box } from "@mui/material";

const ClientLayout = ({ children }) => {
  const sideBarItems = [
    { title: "all articles", path: "/articles" },
    { title: "add article", path: "/articles/add-article" },
    { title: "your article", path: "/articles/your-article" },
  ];
  return (
    <div className="layout">
      <Sidebar sideBarItems={sideBarItems} />
      <Box sx={{ width: 1 }}>
        <Header />
        <main>{children}</main>
      </Box>
    </div>
  );
};

export default ClientLayout;
