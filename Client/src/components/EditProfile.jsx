import React, { useState } from "react";
import axios from "axios";
import { useIt } from "../context.jsx";
import supabase from "../supabaseClient.js";
import "./EditProfile.css";

const EditProfile = () => {
    const { URL, user, setUser } = useIt();
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [img, setImg] = useState(undefined);
    const [imgURL, setImgURL] = useState("");

const uploadFile = async (file, bucketName="images") => {
    try {
        const fileName = `${new Date().getTime()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file);

        if (error) {
            console.error("Upload error:", error.message);
            return;
        }

        const publicUrl = supabase.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl;
        setImgURL(publicUrl);
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};

    
const updateName = async()=>{
    // console.log("hello")
    try{
        console.log(user.token);
        const res = await axios.post(URL + "users/updname", {name : name},{
            headers : {
                token : user.token,
            },
        })
        if(res.status === 200){
            setName("Name Updated✅");
            setUser((prev) =>({...prev , name : res.data.user.name}));
        }else{
            setName("Error❌");
        }
    }catch(e){
        console.log(e);
        setName("Error❌");
    }
};

const updatePass = async()=>{ 
  try{
      console.log(user.token);
      const res = await axios.post(URL + "users/updpass", {password},{
          headers : {
              token : user.token,
          },
      })
      if(res.status === 200){
          setPassword("Updated✅");
          setUser((prev) =>({...prev , password : res.data.user.password}));
      }else{
          setPassword("Error❌");
      }
  }catch(e){
      console.log(e);
      setPassword("Error❌");
  }
};

const updateimg = async()=>{ 
  try{
      console.log(user.token);
      const res = await axios.post(URL + "users/updimg", {img : imgURL},{
          headers : {
              token : user.token,
          },
      })
      if(res.status === 200){
          // setPassword("Updated✅");
          setUser((prev) =>({...prev , img : res.data.user.img}));
      }else{
          // setPassword("Error❌");
      }
  }catch(e){
      console.log(e);
      // setPassword("Error❌");
  }
};


  

  return (
    <div className="edit-profile-container">
      <h2>Edit Your Profile</h2>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="editbtn"  onClick={() => updateName()}>Update Name</button>

      <label>
        New Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="editbtn"  onClick={() => updatePass()}>Update Password</button>

      {/* Image */}
      <label>
        Profile Image URL:
        <input
          type="file"
          accept="image/*"
          // value={img}
          onChange={(e) => {
            const file = e.target.files[0];
            setImg(file);
            if (file) uploadFile(file, "images");
          }}
        />
      </label>
      <button className="editbtn" onClick={() => updateimg() } disabled={!imgURL}>Update Image</button>
    </div>
  );
};

export default EditProfile;
