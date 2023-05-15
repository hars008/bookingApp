import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../component/Perks";
import axios from "axios";
const PlacePage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
    {
      text;
    }
  }
  function inputDescription(text) {
    return <p className="text-sm text-gray-400 mb-1">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
   if(filename === "error") return alert("Invalid Link");
   else{

     setAddedPhotos((prev) => [...prev, filename]);
     setPhotoLink("");
    }
  }
  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        setAddedPhotos((prev) => [...prev, ...filenames]);
      });
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-2 hover:font-bold transition duration-300  hover:scale-110"
            to={"/account/places/new"}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <form className="myForm text-left border-4 border-x-cyan-600 border-y-green-600 w-3/4 m-auto rounded-3xl mb-6 px-13 py-10">
          {preInput(
            "Title",
            "Title for your place, should be short and catchy as in advertisement."
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border-2 border-gray-400 rounded-full px-4 py-1 "
            placeholder="Example: My lovely Apartment"
          />
          {preInput("Address", "Address to this place")}
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="border-2 border-gray-400 rounded-full px-4 py-1"
            placeholder="address"
          />
          {preInput("Photos", "more = better")}
          <div className="flex gap-2">
            <input
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              className="border-2 border-gray-400 rounded-full px-4 py-1 w-full"
              type="text"
              placeholder="Add using a link ....jpg"
            />
            <button
              onClick={addPhotoByLink}
              className="bg-gray-200 px-4 rounded-2xl py-2 w-fit hover:bg-gray-300 transition duration-200 hover:scale-110"
            >
              Add&nbsp;Photos
            </button>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className="rounded-2xl flex h-32 overflow-hidden ">
                  <img
                    src={"http://localhost:4000/uploads/" + link}
                    className="object-cover w-full rounded-2xl"
                    alt=""
                  />
                </div>
              ))}
            <label className="flex cursor-pointer items-center gap-2 h-32 justify-center border-2 bg-transparent rounded-xl p-2 py-8 mb-4 text-2xl text-gray-600 hover:text-gray-400 transition duration-200 hover:scale-105">
              <input
                type="file"
                multiple={true}
                className="hidden"
                onChange={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 lg:w-8 lg:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <span className="text-sm lg:text-lg">Upload</span>
            </label>
          </div>
          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {preInput("Perks", " Select all the perks that apply to your place")}
          <div className="grid gap-2 my-2  grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            <Perks selected={perks} onChange={setPerks} />
          </div>

          {preInput(
            "Other Details",
            "add check in and out times, remember to have some time for cleaning the room between guests"
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check In</h3>
              <input
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-2 border-gray-400 rounded-full px-4 w-full py-1"
                type="text"
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check Out</h3>
              <input
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-2 border-gray-400 rounded-full px-4 w-full py-1"
                type="text"
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max Guests</h3>
              <input
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                className="border-2 border-gray-400 rounded-full px-4 w-full py-1"
                type="number"
                min={1}
                placeholder="1"
              />
            </div>
          </div>

          {preInput("Extra Info", "House Rules, etc. (optional)7374000774")}
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          <button className="primary my-4 text-xl font-bold"> Save</button>
        </form>
      )}
    </div>
  );
};

export default PlacePage;
