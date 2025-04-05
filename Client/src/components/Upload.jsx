import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Upload.css";
import { useIt } from "../context.jsx";
import supabase from "../supabaseClient.js";

const Upload = () => {
    const { setOpenUpload , URL, user} = useIt();
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({ img: 0, video: 0 });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTags = (e) => {
        const tagList = e.target.value.split(",").map(tag => tag.trim().toLowerCase());
        setTags(tagList);
    };
    

    useEffect(() => {
        if (video) uploadFile(video, "videoUrl", "videos", "video");
    }, [video]);

    useEffect(() => {
        if (img) uploadFile(img, "imgUrl", "images", "img");
    }, [img]);

    const uploadFile = async (file, urlType, bucketName, type) => {
        try {
            const fileName = `${new Date().getTime()}-${file.name}`;
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file, {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
        
                        setUploadProgress((prev) => ({ ...prev, [type]: percentCompleted }));
                    },
                });

            if (error) {
                console.error("Upload error:", error.message);
                return;
            }

            const publicUrl = supabase.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl;
            setInputs((prev) => ({ ...prev, [urlType]: publicUrl }));
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post( URL +  "videos", { ...inputs, tags }, {
          headers: {
              token: user.token,  
          },
      });
        setOpenUpload(false);
        if (res.status === 200) navigate(`/video/${res.data._id}`);
    };

    return (
        <div className="uploadcont">
            <div className="uploadwrapper">
                <div className="closeupload" onClick={() => setOpenUpload(false)}>X</div>
                <h1 className="uploadtitle">Upload a New Video</h1>

                <label className="uploadlabel">Video:</label>
                <input
                    className="uploadinput"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                />
                {uploadProgress.video > 0 && <p>Uploading Video: {uploadProgress.video}%</p>}

                <input
                    className="uploadinput"
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />

                <textarea
                    className="uploaddesc"
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                />

                <input
                    className="uploadinput"
                    type="text"
                    placeholder="Separate the tags by commas(,)."
                    onChange={handleTags}
                />

                <label className="uploadlabel">Thumbnail:</label>
                <input
                    className="uploadinput"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    type="file"
                />
                {uploadProgress.img > 0 && <p>Uploading Image: {uploadProgress.img}%</p>}

                <button className="uploadbtn" onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default Upload;
