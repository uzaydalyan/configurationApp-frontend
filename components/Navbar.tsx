import Image from 'next/image';
import styles from '../styles/Navbar.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import {IconButton} from "@mui/material";
import Icon from '../public/icon.png';
import {auth} from '../firebase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import {useState} from "react";

const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        auth.signOut().then().catch(e => {
            alert(e)
        })
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_content}>
                <Image className={styles.navbar_icon} src={Icon} alt="Codeway" width={50}/>
                <IconButton onClick={openMenu}>
                    <PersonIcon className={styles.profile}/>
                </IconButton>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={closeMenu}
                onClick={closeMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={signOut}>
                    Logout
                </MenuItem>

            </Menu>
        </div>
    );
}

export default Navbar;