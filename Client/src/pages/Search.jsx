import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import Card from "../components/Card.jsx";
import {useIt} from "../context.jsx";
import "./Search.css";

const Search = ()=>{
    const {URL} = useIt();
    const [videos, setVideos] = useState([]);
    const q = useLocation().search;

    useEffect(()=>{
        const fetchVideos = async()=>{
            const res = await axios.get(URL + `videos/search/${q}`);
            console.log(res.data);
            setVideos(res.data);
        };
        fetchVideos();
    },[q]);


    return(
        <div className="searchcont" > 
            {
                videos.map((video)=>{
                    return <Card key={video._id} video={video}/>
                })
            }
        </div>
    );
}

export default Search;