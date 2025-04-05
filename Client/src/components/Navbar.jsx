import React, { useState } from "react";
import "./Navbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Logout icon
import { Link, useNavigate } from "react-router-dom";
import { useIt } from "../context.jsx";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [q, setQ] = useState("");
    const { user, setShowSignIn, setOpenUpload, logout } = useIt(); 

    return (
        <div className="navcont">
            <div className="navwrap">
                {/* 🔍 Search Bar */}
                <div className="navsearch">
                    <input 
                        className="navinput" 
                        placeholder="Search..." 
                        onChange={(e) => setQ(e.target.value)} 
                    />
                    <SearchOutlinedIcon 
                        className="search-icon" 
                        onClick={() => navigate(`/search?q=${q}`)} 
                    />
                </div>

                {/* 👤 User Section */}
                {user ? (
                    <div className="navuser">
                        <VideoCallOutlinedIcon 
                            className="upload-icon" 
                            onClick={() => setOpenUpload(true)} 
                        />
                        <div
                            className="user-section"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <img
                                src={user?.img || "https://mvhusfrehckbpsujhjqf.supabase.co/storage/v1/object/public/images//download%20(4).png"}
                                alt="User"
                                className="user-avatar"
                            />
                            {open && (
                                <div className="dropdown-menu">
                                    <Link to="/edit-profile" className="dropdown-item">Edit Profile</Link> 
                                </div>
                            )}
                        </div>
                        {/* <img src={user?.img || "https://mvhusfrehckbpsujhjqf.supabase.co/storage/v1/object/public/images//download%20(4).png"} className="navavtar" alt="User-logo"/> */}
                        <span className="username">{user.name}</span>
                        <ExitToAppIcon 
                            className="logout-icon" 
                            titleAccess="Log Out"
                            onClick={()=>{
                                logout();
                                navigate("/");
                            }}
                        />
                    </div>
                ) : (
                    <button className="navbtn" onClick={() => setShowSignIn(true)}>
                        <AccountCircleOutlinedIcon />
                        SIGN IN
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
