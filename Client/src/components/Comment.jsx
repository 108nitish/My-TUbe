import React, { useEffect, useState } from "react"; 
import axios from "axios";
import "./Comment.css"
import {useIt} from "../context.jsx";

const Comment = ({comment}) =>{
    const {URL} = useIt();
    const [channel, setChannel] = useState({});

    useEffect(()=>{
        const fetchComment = async() =>{
            const url = URL + `users/find/${comment.userId}`;
            const res = await axios.get(url);
            setChannel(res.data);
        };
        fetchComment();
    },[comment.userId]);

    return (
        <div className ="commcont" >
            <img className = "commimg" src={channel.img}/>
            <div className ="commdet" >
                <span className ="commname" >
                    {channel.name} 
                    <span className="commdate" > 1 Day ago</span>
                </span>
                <span className="commtext" > {comment.desc} </span>
            </div>
        </div>
    );
};

export default Comment;