import react from  "react"
import MyTube from "../images/logo1.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import {useIt} from '../context.jsx';
import "./Sidebar.css";

const Sidebar = () =>{
    const {user, darkMode, setDarkMode, setShowSignIn, logout} = useIt();
      
    return (
        <div className="sidecontainer">
            <Link to = "/" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className ="logo">
                        <img src={MyTube} />
                        <div className="logodiv">
                            My-TUbe
                        </div>
                    </div>
                </Link>
            <div className="sidewrapper">
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="sideitem">
                        <HomeIcon />
                        Home
                    </div>
                </Link>
                 
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="sideitem">
                        <ExploreOutlinedIcon/>
                        Explore
                    </div>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="sideitem">
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                    </div>
                </Link>
                <hr className = "sidehr"/>
                <div className="sideitem">
                    <VideoLibraryOutlinedIcon />
                    Library
                </div>
                <div className="sideitem">
                    <HistoryOutlinedIcon />
                    History
                </div>
                <hr className = "sidehr" />
                {
                    !user && (
                        <>
                            <div className="sidelogin">
                                Sign in to like videos, comment and to subscribe.
                                <Link to ="/" style={{ textDecoration: "none", color: "inherit" }}>
                                    <button className="sidelogbtn" onClick={()=>setShowSignIn(true)} >
                                        <AccountCircleOutlinedIcon/>
                                        SIGN IN
                                    </button>
                                </Link>
                            </div>
                        </>
                    )
                }
                <h2 className = "sidetitle">Best of My-TUbe</h2>
                <div className="sideitem">
                    <LibraryMusicOutlinedIcon />
                    Music
                </div>
                <div className="sideitem">
                    <SportsBasketballOutlinedIcon />
                    Sports
                </div>
                <div className="sideitem">
                    <SportsEsportsOutlinedIcon />
                    Gaming
                </div>
                <div className="sideitem">
                    <MovieOutlinedIcon />
                    Movies
                </div>
                <div className="sideitem">
                    <ArticleOutlinedIcon />
                    News
                </div>
                <div className="sideitem">
                    <LiveTvOutlinedIcon />
                    Live
                </div>
                <hr className = "sidehr" />
                <div className="sideitem">
                    <SettingsOutlinedIcon />
                    Settings
                </div>
                <div className="sideitem">
                    <FlagOutlinedIcon />
                    Report
                </div>
                <div className="sideitem" >
                    <HelpOutlineOutlinedIcon />
                    Help
                </div>
                <div className="sideitem" onClick={()=>setDarkMode(!darkMode)}>
                <SettingsBrightnessOutlinedIcon />
                {darkMode ? "Light" : "Dark"} Mode
                </div>
                {user && 
                (<> 
                <hr className = "sidehr" />
                <div className="sideitem" onClick={logout}  >
                    <ExitToAppIcon />
                    SignOut
                </div>
                </>
                ) 
                }
                 
            </div>
        </div>
    );
};

export default Sidebar;