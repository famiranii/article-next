import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
function SidebatItem({ item }) {
  return (
    <>
      <ListItem button>
        <Link className="Link" href={item.path}>
          <ListItemText primary={item.title} />
        </Link>
      </ListItem>
      <Divider />
    </>
  );
}

export default SidebatItem;
