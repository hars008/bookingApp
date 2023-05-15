import React, { useContext } from "react";
import "./LoginSign.css";
import reg from "./img/register.svg";
import sin from "./img/log.svg";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


function animHandle() {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

}

const LoginSign = () => {
  const mytimeout = setTimeout(animHandle, 100);
  const [rUser, setrUser] = useState({
    uname:"",
    email:"",
    password:""
  });
  const [lUser, setlUser] = useState({
    email:"",
    password:""
  });
  const [redirect, setRedirect] = useState(false);

  const {setUser, setReady} = useContext(UserContext);

  async function registerUser(e){
    e.preventDefault();
    // let {uname,email,password} = rUser;
    try{

      console.log(rUser);
      await axios.post("/register" , rUser);
      navigate("/");
    }
    catch(error){
      console.log(error);
    }

  }
async function loginUser(e){
    e.preventDefault();
    try{
     const {data}= await axios.post("/login" , {email:lUser.email,password:lUser.password} , {withCredentials:true});
      setRedirect(true);
      setUser(data);
      setReady(true);
      alert("Login successfull");

  }catch(e){
      alert("Login failed");
  }
}
if(redirect){
  
  clearTimeout(mytimeout);

  return <Navigate to={"/"} />
}

  return (
    <div >
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={loginUser}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Username" value={lUser.email} onChange={e => setlUser({...lUser,email:e.target.value})} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" value={lUser.password} onChange={e=> setlUser({...lUser,password:e.target.value}) }/>
              </div>
              <input type="submit" defaultValue="Login" className="btn solid bg-primary" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form mt-4" onSubmit={registerUser}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Username" value={rUser.uname} onChange={e=>setrUser({...rUser,uname:e.target.value})}/>
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input type="email" placeholder="Email" value={rUser.email} onChange={e=>setrUser({...rUser,email:e.target.value})}/>
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" value={rUser.password} onChange={e=>setrUser({...rUser,password:e.target.value})}/>
              </div>
              <input type="submit" className="btn bg-secondary" defaultValue="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel m-5">
            <div className="content ">
              <h3>New here ?</h3>
              <p>
                Make a free account in less than a minute!
              </p>
              <button className="btn transparent"  id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={sin} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Click below to Sign in to your account and show your personalised view!
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={reg} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};



export default LoginSign;
