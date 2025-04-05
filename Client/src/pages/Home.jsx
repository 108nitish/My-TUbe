import React, {useEffect, useState} from "react";
import "./Home.css";
import Card from "../components/Card.jsx";
import axios from "axios";
import {useIt} from "../context.jsx"

const Home = ({type})=>{

    const [videos, setVideos] = useState([]);
    const {URL, user} = useIt();
    
    useEffect(()=>{
        const fetchVideos = async()=>{
            try{
                const headers = {}; 
                if (type === "sub" && user?.token) {
                    headers.token = user.token;
                }
                const res = await axios.get(URL + `videos/${type}`,{ headers });
                console.log("Videos on Home:-", res.data);
                if(Array.isArray(res.data)){
                    setVideos(res.data);
                }else{
                    console.log("Error fom Home API(Array Error)");
                    setVideos([]);
                }
            }catch{
                console.log("Error fom Home API(Array Error)");
                setVideos([]);
            }
        };
        fetchVideos();
    }, [type]);

    return (
        <div className="homecont" >
            {   
                videos.map((video)=>{
                    return <Card key={video._id} video={video}/>;
                })
            }
        </div>
    );
}

export default Home;