import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FaCircleUser, FaGear } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

const NavDrawer = ({ open, setOpen }) => {
    // const [open, setOpen] = React.useState(false);
    // const openDrawer = () => setOpen(true);
    // const closeDrawer = () => setOpen(false);
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
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
            <Drawer open={open} className="z-50 bg-slate-100 dark:bg-slate-800 dark:text-white" onClose={() => { setOpen(false) }}>
                <div className="mb-2 items-center justify-between p-4">
                    <div className="p-2 flex flex-col border-b dark:border-quick5 items-center">
                        <img className="rounded-full cursor-pointer w-1/2 aspect-square" src={user.avatar} onClick={() => { navigate("/profile?user=" + user.uid) }} />
                        <h1 className="flex text-xl font-sembold text-black dark:text-white hover:underline hover:cursor-pointer mt-5" onClick={() => { navigate("/profile?user=" + user.uid) }}>
                        </h1>
                    </div>
                    <Typography variant="h5" className="flex justify-center mt-3" color="blue-gray">
                        {user.name}
                        {user.subscriptions.indexOf('quicker') !== -1 && <span className='w-4 ml-1'><img src='quicker_badge.png' /></span>}
                    </Typography>
                </div>
                <List>
                    <ListItem onClick={() => { navigate('/profile?user=' + user.uid) }}>
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
                    <ListItem onClick={() => { navigate('/settings') }}>
                        <ListItemPrefix>
                            <FaGear />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                    <ListItem onClick={() => { so() }}>
                        <ListItemPrefix>
                            <BiLogOut />
                        </ListItemPrefix>
                        Logout
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default NavDrawer