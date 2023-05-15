import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacePage from './PlacePage'
import ProfilePage from './ProfilePage'

const AccountPage = () => {
    const {user,ready,setUser} = useContext(UserContext);
    const [redirect,setRedirect] = useState(null);
    let {subpage} = useParams();
    if (subpage===undefined){
      subpage='profile';
    }
    if(!ready){
        return <h1>Loading...</h1>
    }
    setTimeout(() => {
      if (ready && !user && !redirect) {
        // console.log(user);
        return <Navigate to={"/login"} />;
      }
    }, 0);
   

    function linkClasses (type=null){
      let classes =
        "py-2 rounded-full px-4 hover:font-bold transition duration-300  hover:scale-110 inline-flex gap-1";
      if(type===subpage){
        classes += ' bg-primary text-white font-bold c';
      }else{
        classes += ' bg-gray-200';
      }
      return classes;

    }

     async function logout(){
       await axios.post('/logout');
       setRedirect('/');      
       setUser(null);
     }
     if (redirect){
      return <Navigate to={redirect} />;
     }

  return (
    <div>
      Account page for {user?.name}
      <nav className="w-full flex py-2 px-6  mt-8 mb-8 gap-9 justify-center">
        <Link className={linkClasses("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("booking")} to={"/account/booking"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My Places
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">My Profile</h1>

          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-lg">{user?.email}</p>

          <button
            onClick={logout}
            className="bg-primary w-full rounded-full max-w-sm mt-2 p-2"
          >
            Logout
          </button>
          <ProfilePage />
        </div>
      )}
      {subpage === "places" && <PlacePage />}
    </div>
  );
}

export default AccountPage
