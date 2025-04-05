import React, { useEffect, useState } from "react";  
import Comment from "./Comment";
import axios from "axios";
import {useIt} from "../context.jsx";
import "./Comments.css";


const Comments = ({videoId}) =>{
    const {URL, user} = useIt();

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(()=>{
        const fetchComments = async () => {
            const url = URL + `comments/${videoId}`;
            try {
                const res = await axios.get(url);
                setComments(res.data);
              } catch (err) {}
        }; 
        fetchComments();
    },[videoId]);

    const handleSubmitComment = async()=>{
        const url = URL + `comments`;
        try {
            const res = await axios.post(url, {
              userId: user._id,
              videoId,
              desc: newComment,
            });
            
            setComments([...comments, res.data]);
            setNewComment("");
        } catch (err) {
            console.error("Error submitting comment:", err);
        }
    };

    const handleCancelComment = () =>{
        setNewComment("");
    };

    return(
        <div className ="commentsCont" > 
            <div className ="newComm">
                <img className="commentsavtar" src={user?.img || "https://mvhusfrehckbpsujhjqf.supabase.co/storage/v1/object/public/images//download%20(4).png"} />
                <input className ="commentsinput"
                placeholder="Add a comment...."
                value ={newComment}
                onChange={(e)=>setNewComment(e.target.value)}
                />
                <div className="commbtnwraper">
                    {
                        newComment && (
                            <>
                            <button className="addnewcomm" onClick={handleSubmitComment}>Submit</button>
                            <button className="addnewcomm" onClick={handleCancelComment}>Cancel</button>
                
                            </>
                        )
                    }
                    
                    </div>
            </div>
        </div>
    );

};

export default Comments;