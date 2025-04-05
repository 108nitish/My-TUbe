import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TimeAgo from "react-timeago";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments.jsx";
import Recommendation from "../components/Recommendation.jsx";
import "./Video.css";
import {useIt} from "../context.jsx";

const Video = () => {
    const {URL, user} = useIt();
    const path = useLocation().pathname.split("/")[2];
    const [video, setVideo] = useState(null);
    const [channel, setChannel] = useState({});
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const viewCountRef = useRef(false);
    const [isSubscribed, setIsSubscribed] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(URL + `videos/find/${path}`);
                console.log(videoRes);
                const channelRes = await axios.get(URL + `users/find/${videoRes.data.userId}`);
                setVideo(videoRes.data);
                setChannel(channelRes.data);
                const liked = user ? videoRes.data.likes.includes(user._id) : false;
                const disliked = user ? videoRes.data.dislikes.includes(user._id) : false;

                setLiked(liked);
                setDisliked(disliked);
                const subscribed = user ? channelRes.data.subscribedUsers?.includes(user._id.toString()) : false;
                setIsSubscribed(subscribed);
                if (!viewCountRef.current && videoRes.data) {
                    axios.put(URL + `videos/view/${videoRes.data._id}`).catch((err) => console.error(err));
                    viewCountRef.current = true;
                    console.log("Count Incremented");
                }
                
            } catch (err) {
                console.error("Error fetching video:", err);
            }
        };

        fetchData();

         
    }, [path]);

    const handleLike = async () => {
        try {
            await axios.put(URL + `videos/like/${video._id}`, {}, {
                headers: {
                    token: user.token,
                },
            });
    
            setVideo((prev) => {
                const alreadyLiked = prev.likes.includes(user._id);
                return {
                    ...prev,
                    likes: alreadyLiked 
                        ? prev.likes.filter(id => id !== user._id)
                        : [...prev.likes, user._id],
                    dislikes: prev.dislikes.filter(id => id !== user._id),
                };
            });
            setLiked((prev) => !prev);
            setDisliked(false);
        } catch (err) {
            console.error("Like failed", err);
        }
    };
    

    const handleDislike = async () => {
        try {
            await axios.put(URL + `videos/dislike/${video._id}`, {}, {
                headers: {
                    token: user.token,
                },
            });
    
            setVideo((prev) => {
                const alreadyDisliked = prev.dislikes.includes(user._id);
                return {
                    ...prev,
                    dislikes: alreadyDisliked 
                        ? prev.dislikes.filter(id => id !== user._id)
                        : [...prev.dislikes, user._id],
                    likes: prev.likes.filter(id => id !== user._id),
                };
            });
            setDisliked((prev) => !prev);
            setLiked(false);
        } catch (err) {
            console.error("Dislike failed", err);
        }
    };
    

    const handleSubscription = async () => {
        try {
            await axios.put(URL + `users/sub/${channel._id}`, {}, {
                headers: {
                    token: user.token,
                },
            }); 
            setIsSubscribed((prev) => !prev); 
            setChannel((prev) => ({
                ...prev,
                subscribers: prev.subscribers + (isSubscribed ? -1 : 1),
            }));
        } catch (err) {
            console.error("Subscription error:", err);
        }
    };
    

    return (
        <div className="container">
            <div className="content">
                {video && (
                    <>
                        <div className="video-wrapper">
                            <video src={video.videoUrl} controls className="video-frame" />
                        </div>
                        <h1 className="title">{video.title}</h1>
                        <div className="details">
                            <span className="info">
                                {video.views} views • <TimeAgo date={video.createdAt} />
                            </span>
                            <div className="buttons">
                            <div className={`button ${liked ? "active" : ""}`} onClick={handleLike}>
                                {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {video.likes?.length}
                            </div>
                            <div className={`button ${disliked ? "active" : ""}`} onClick={handleDislike}>
                                {disliked ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} Dislike
                            </div>

                                <div className="button">
                                    <ReplyOutlinedIcon /> Share
                                </div>
                                <div className="button">
                                    <AddTaskOutlinedIcon /> Save
                                </div>
                            </div>
                        </div>
                        <hr className="divider" />
                        <div className="channel">
                            <div className="channel-info">
                                <img src={channel.img} alt="channel" className="channel-image" />
                                <div className="channel-detail">
                                    <span className="channel-name">{channel.name}</span>
                                    <span className="channel-counter">{channel.subscribers} subscribers</span> 
                                </div>
                            </div>
                            <button className={`subscribe ${isSubscribed ? "subscribed" : ""}`}
                                onClick={handleSubscription} >
                                {isSubscribed ? "SUBSCRIBED ✅" : "SUBSCRIBE"}
                            </button>

                        </div>
                        
                        <hr className="divider" />
                        <p className="description">{video.desc}</p>
                        <hr className="divider" />
                        <Comments videoId={video._id} />
                    </>
                )}
            </div>
            <Recommendation tags={video?.tags} />
        </div>
    );
};

export default Video;
