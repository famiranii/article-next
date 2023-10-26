import Sidebar from "@/components/sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  const sideBarItems = [
    { title: "admin panel", path: "/admin" },
    { title: "all articles", path: "/admin/all-articles" },
    { title: "confirm article", path: "/admin/confirm-article" },
  ];
  return (
    <div className="layout">
      <Sidebar sideBarItems={sideBarItems} />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
