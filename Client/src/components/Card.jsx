import { Link } from "react-router-dom";
import TimeAgo from 'react-timeago';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useIt } from "../context.jsx";
import "./Card.css";

const Card = ({ video }) => {
  const { URL } = useIt();
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const url = `${URL}users/find/${video.userId}`;
        const res = await axios.get(url);
        setChannel(res.data);
      } catch (err) {
        console.error("Error fetching channel:", err);
      }
    };
    fetchChannel();
  }, [video.userId, URL]); 
  
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <div className="video-card">
        <div className="video-thumbnail-container">
          <img src={video.imgUrl} alt="thumbnail" className="video-thumbnail" /> 
        </div>

        <div className="video-info">
          <div className="channel-info">
            <div className="channel-image-container">
              <img src={channel?.img} alt="channel" className="channel-image" />
            </div>
          </div>
          <div className="video-details">
            <h3 className="video-title">{video.title}</h3>
            <p className="channel-name">{channel?.name}</p>
            <p className="video-stats">
              {video.views ? `${video.views} views` : '0 views'} • <TimeAgo date={video.createdAt} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;