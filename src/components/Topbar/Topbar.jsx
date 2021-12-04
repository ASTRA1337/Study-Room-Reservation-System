import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./topbar.css";

export default function Topbar({user, logout}) {
    return (
        <div className = "topbar">

            <div className = "topbarWrapper">
                <div className = "topleft">
                    <span className = "logo">UHD Study Room Reservation</span>
                </div>
                <div className = "topright">
                    <div>Hello {user.first_name}</div>
                    <button onClick={logout} className="logout-button">Logout</button>
                    <div className = "topbarIconContainer">
                        <SettingsIcon />

                    </div>
                    <div className = "topbarIconContainer">
                        <AccountCircleIcon />

                    </div>
                    <div className = "topbarIconContainer">
                        <MailOutlineIcon />

                    </div>
                </div>
            </div>
            
        </div>
    )
}