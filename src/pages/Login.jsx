import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullname:"",
    username:"",
    email: "",
    password: "",
  });
  const[error,setError]=useState('');
  const[isActive,setIsActive]=useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // implementing login feature

  const handleLogin = async() => {
    const { email, password } = values;
    const res = await fetch("https://socialmediabackend1.herokuapp.com/login", {
      method: "POST",
      body:JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if(res.status===200){
      setError("")
      localStorage.setItem("token",data)
      navigate('/home')

    }else{
      setError('Invalid credentials')
    }
  };
  // implementing signup feature

  const handleSignup = async() => {
    const { fullname,username,email, password } = values;
    const res = await fetch("https://socialmediabackend1.herokuapp.com/signup", {
      method: "POST",
      body:JSON.stringify({
        fullname,
        username,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if(res.status===200){
      setError("")
     alert('user created')

    }else{
      setError('Invalid credentials')
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="loginTop">
          <p>SocialHub</p>
        </div>

        <div className="loginCardContainer">
         {!isActive&& <div className="loginCard">
            <p>Login</p>
            <p style={{color:'red',fontSize:'1.4rem'}}>{error}</p>
            <label htmlFor="#">Email</label>
            <Input
              type="email"
              onChange={handleChange}
              value={values.email}
              name="email"
            />
            <label htmlFor="#">Password</label>
            <Input
              type="password"
              onChange={handleChange}
              value={values.password}
              name="password"
            />
            <Button onClick={handleLogin}>Login</Button>
            <p className="signupText">
              Don't have an account? <span onClick={()=>setIsActive(true)}>Signup</span>
            </p>
          </div> }
          {isActive&& <div className="loginCard">
            <p>Signup</p>
            <p style={{color:'red',fontSize:'1.4rem'}}>{error}</p>
            <label htmlFor="#">Fullname</label>
            <Input
              type="text"
              onChange={handleChange}
              value={values.fullname}
              name="fullname"
            />
            <label htmlFor="#">Username</label>
            <Input
              type="text"
              onChange={handleChange}
              value={values.username}
              name="username"
            />
            <label htmlFor="#">Email</label>
            <Input
              type="email"
              onChange={handleChange}
              value={values.email}
              name="email"
            />
            <label htmlFor="#">Password</label>
            <Input
              type="password"
              onChange={handleChange}
              value={values.password}
              name="password"
            />
            <Button onClick={handleSignup}>Signup</Button>

          </div>}
         
         
        </div>
      </div>
    </div>
  );
}

export default Login;
