import Sidebar from "@/components/sidebar/Sidebar";
import { Box } from "@mui/system";

const ClientLayout = ({ children }) => {
  const sideBarItems = [
    { title: "all articles", path: "/" },
    { title: "add article", path: "/articles/add-article" },
    { title: "your article", path: "/articles/your-article" },
  ];
  return (
    <div className="layout">
      <Sidebar sideBarItems={sideBarItems} />
        <Box mt={8} width='100%'>{children}</Box>
    </div>
  );
};

export default ClientLayout;
