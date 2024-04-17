import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FaCircleUser, FaGear } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { auth } from "../../firebase";
import Drawer from "../drawer/Drawer";

const NavDrawer = ({ open, setOpen }) => {
  // const [open, setOpen] = React.useState(false);
  // const openDrawer = () => setOpen(true);
  // const closeDrawer = () => setOpen(false);
  //   const [is_open, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const so = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Drawer isOpen={open} setIsOpen={setOpen}>
        <div className="mb-2 items-center justify-between p-4">
          <div className="flex flex-col items-start">
            <img
              className="rounded-md cursor-pointer w-20 aspect-square object-cover"
              src={user.avatar}
              onClick={() => {
                navigate("/profile?user=" + user.uid);
              }}
            />
            <h1
              className="flex text-xl font-sembold text-black dark:text-white hover:underline hover:cursor-pointer mt-5"
              onClick={() => {
                navigate("/profile?user=" + user.uid);
              }}
            ></h1>
          </div>
          <Typography variant="h5" className="flex" color="blue-gray">
            {user.name}
            {user.subscriptions !== undefined &&
              user.subscriptions !== undefined &&
              user.subscriptions.indexOf("quicker") !== -1 && (
                <span className="w-4 ml-1">
                  <img src="quicker_badge.png" />
                </span>
              )}
          </Typography>
        </div>
        <List>
          <ListItem
            className="flex gap-4"
            onClick={() => {
              navigate("/profile?user=" + user.uid);
            }}
          >
            <ListItemPrefix>
              <FaCircleUser />
            </ListItemPrefix>
            Profile
          </ListItem>
          {/* <ListItem onClick={() => { navigate('/admin_tools') }}>
            <ListItemPrefix>
              <AiFillProfile />
            </ListItemPrefix>
            Administrator tools
          </ListItem> */}
          <ListItem
            className="flex gap-4"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <ListItemPrefix>
              <FaGear />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem
            className="flex gap-4"
            onClick={() => {
              so();
            }}
          >
            <ListItemPrefix>
              <BiLogOut />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavDrawer;
