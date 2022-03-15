import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles/home.css";
import CameraIcon from "../assets/cameraIcon.svg";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

function Home() {
  const [allPost, setAllpost] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const[comment,setComment]=useState(null)



  const postDetails = () => {
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "instaclone2");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  var handleUpload = () => {
    if (selectedImage) {
      postDetails();
    }
  };
 
  const handleComment=async(id)=>{
  
    const res=await fetch('https://socialmediabackend1.herokuapp.com/post/comment',{
      method:"PUT",
      body:JSON.stringify({
       "text":comment,
        "postId":id,
      }),
      headers:({
        'Content-Type':'application/json',
        'x-auth-token':localStorage.getItem('token')
      })
    })
    const data=await res.json()

    
   }
     // like feature
const handleLike=async(id)=>{
  const res=await fetch('https://socialmediabackend1.herokuapp.com/post/like',{
    method:"PUT",
    body:JSON.stringify({
      "postId":id,
    }),
    headers:({
      'Content-Type':'application/json',
      'x-auth-token':localStorage.getItem('token')
    })
  })
  const data=await res.json();
}

// unlike feature
const handleUnLike=async(id)=>{
  const res=await fetch('https://socialmediabackend1.herokuapp.com/post/unlike',{
    method:"PUT",
    body:JSON.stringify({
      "postId":id,
    }),
    headers:({
      'Content-Type':'application/json',
      'x-auth-token':localStorage.getItem('token')
    })
  })
  const data=await res.json();

}


  useEffect(() => {
    if (url) {
      fetch("https://socialmediabackend1.herokuapp.com/post", {
        method: "POST",
        body: JSON.stringify({
          title,
          photo: url,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
    }
  }, [url]);

  useEffect(() => {
   

    fetch("https://socialmediabackend1.herokuapp.com/post/allpost")
      .then((res) => res.json())
      .then((data) => setAllpost(data.posts.reverse()))
      .catch((e) => console.log(e));
  }, [handleUnLike,handleComment,handleUpload]);





  return (
    <>
      <Navbar />
      <main className="main">
        <div className="mainContainer">
          <div className="uploadContainer">
            <textarea placeholder="write a caption..."   onChange={(e) => setTitle(e.target.value)}
              value={title}/>
            <label htmlFor="upload">
              <img src={CameraIcon} alt="icon" />
            </label>
            <input type="file" id="upload"    name="myImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}/>
            <Button className="postBtn"    onClick={handleUpload}>Upload</Button>
          </div>

          <div className="post">
            <div className="postContainer">
            {allPost&&allPost.map(item=>
            <Card key={item._id} photo={item.photo} title={item.title} postedBy={item.postedBy.username} createdAt={item.createdAt} handleComment={handleComment} id={item._id} handleChange={(e)=>setComment(e.target.value)} comments={item.comments} likes={item.likes} like={handleLike} unlike={handleUnLike}/>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
