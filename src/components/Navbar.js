import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "../Context/CurrentUser";

export const Navbar = () => {
  const navigate=useNavigate()
  const{user}=useContext(CurrentUser);

  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate('/')
  }


  return (
    <div className="navbar">
      <div className="navbarContainer">
          <Link to='/home'>
            <p className="logo">SocialHub</p>
          </Link>
          <div className="links">
              <Link to='/home'>
                <p>Home</p>
              </Link>
              <Link to='/profile'>
                <p>Profile</p>
              </Link>
              <p onClick={handleLogout}>Logout</p>
             <img src={user&&user.profilePic} alt="user" />
              </div>
          
          </div>
    </div>
  );
};
