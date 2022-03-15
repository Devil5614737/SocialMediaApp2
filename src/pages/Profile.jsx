import { Navbar } from "../components/Navbar";
import "../styles/profile.css";
import CameraIcon from "../assets/camera2.svg";
import EditIcon from "../assets/edit.svg";
import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "../Context/CurrentUser";

export default function Profile() {
  const { user } = useContext(CurrentUser);
  const [myPost, setMyPost] = useState([]);
  const [show,setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const[fullname,setfullname]=useState("")


useEffect(()=>{
alert("double tap on post to delete")
},[])




  const postData = () => {
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
  useEffect(() => {
    if (selectedImage) {
      return postData();
    }
  }, [selectedImage]);

  useEffect(() => {
    if (url) {
      fetch("https://socialmediabackend1.herokuapp.com/post/updatepic", {
        method: "PUT",
        body: JSON.stringify({
          pic:url,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.alert("profile pic updated");
        })
        .catch((e) => console.log(e));
    }
  }, [url]);


// removing posts


const handleDelete=async(id)=>{

  const res = await fetch("https://socialmediabackend1.herokuapp.com/post/removepost", {
    method: "DELETE",
    body:JSON.stringify({
      postId:id
    }),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  console.log(data)

}
// updating username
const updatingName=async()=>{
  const res = await fetch("https://socialmediabackend1.herokuapp.com/post/updatename", {
    method: "PUT",
    body:JSON.stringify({
      fullname
    }),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  if(res.status===200){
    setShow(false)
  }else{
    return;
  }

}



// fetching posts
useEffect(async () => {
  const res = await fetch("https://socialmediabackend1.herokuapp.com/post/mypost", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  const data = await res.json();
  setMyPost(data.mypost.reverse());
}, [handleDelete]);
  return (
    <>
      <Navbar />
      <div className="profileInfo">
        <div className="profileInfoContainer">
          <div className="profileImageContainer">
            <img src={user && user.profilePic} alt="user display pic" />
            <label htmlFor="upload" className="profileImageUpload">
              <img src={CameraIcon} alt="upload icon" />
            </label>
            <input
              type="file"
              id="upload"
              name="myImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
      <div className="userStats">
        <div className="userStatsContainer">
          <p>
            <span>Name:</span>{user&&user.fullname}
            <img
            onClick={()=>setShow(true)}
              src={EditIcon}
              alt="edit icon"
            />
          </p>
          <p>
            <span>Followers:</span>
            {user && user.followers.length}
          </p>
          <p>
            <span>Following:</span>
            {user && user.following.length}
          </p>
        </div>
      </div>

      <div className="post">
        <div className="postContainers">
          <div className="postTitle">
            <p>Posts({myPost && myPost.length}) </p>
          </div>

          <div className="posts">
            {myPost &&
              myPost.map((post) => (
                <div key={post._id} className="postImages">
                  <img onDoubleClick={()=>handleDelete(post._id)} src={post.photo} alt="post" />
                </div>
              ))}
          </div>
        </div>
      </div>
      {show&& <div className="usernameInput">
        <input type="text" onChange={(e)=>setfullname(e.target.value)} placeholder="enter name" />
        <button onClick={updatingName}>Submit</button>
        <button onClick={()=>setShow(false)}>Cancel</button>
      </div>}
     
    </>
  );
}
