import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Recommendation.css";
import { useIt } from "../context.jsx";

// Card Component
const Card = ({ video, type }) => {
    const { URL } = useIt();
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            const url = URL + `users/find/${video.userId}`;
            const res = await axios.get(url);
            setChannel(res.data);
        };
        fetchChannel();
    }, [video.userId]);

    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <div className={`cardcont ${type === "sm" ? "sm" : ""}`}>
                <div className = "recvidcont" > 
                <img src={video.imgUrl} alt="video thumbnail" className="card-img" />
                </div>
                <div className={`carddetail ${type === "sm" ? "sm-detail" : ""}`}> 
                    <div className="cardtextdet">
                        <h1 className={`cardtitle ${type === "sm" ? "sm-title" : ""}`}>
                            {video.title}
                        </h1>
                        <h2 className="cardvidname">{channel.name}</h2>
                        <div className="cardcidinfo">
                            {video.views} views• { "_"+  new Date(video.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Recommendation Component
const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);
    const { URL } = useIt();

    useEffect(() => {
        const fetchVideos = async () => {
            const url = URL + `videos/tags?tags=${tags}`;
            const res = await axios.get(url);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

    return (
        <div className="recomcont">
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </div>
    );
};

export default Recommendation;
