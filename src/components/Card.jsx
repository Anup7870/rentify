import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { CiHospital1 } from "react-icons/ci";
import { MdOutlineSchool } from "react-icons/md";
import { FaCampground } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { IconContext } from "react-icons";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
// import nodemailer from "nodemailer";
export default function ({ data }) {
  //   console.log(data[0]);
  const [liked, setLiked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    // if user id present in the likes array then set liked to true
    if (currentUser && data.likes.includes(currentUser._id)) {
      setLiked(true);
    }
  }, []);
  const handleLike = async () => {
    if (!currentUser) {
      window.location.href = "/signin";
    }
    try {
      const like = await axios.post(
        `http://35.154.220.126:3000/api/prop/like`,
        {
          propId: data._id,
          userId: currentUser._id,
        }
      );
      if (like.data.message === "Liked") {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelClick = async () => {
    // it current user is not signed in then redirect to login page
    if (!currentUser) {
      window.location.href = "/signin";
    }
    // send email to the owner of the property and the user
    try {
      const sendEmail = await axios.post(
        `https://rentifyserver.onrender.com/api/prop/contact`,
        { user: currentUser, propId: data._id }
      );
      if (sendEmail.status === 200) {
        alert("Email sent");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full ">
      <div className="bg-white shadow-md rounded-md pb-2">
        <img src={data.image} alt="" className=" w-full h-48" />
        <div className="px-2">
          <div>
            <div className="flex justify-between items-center">
              <p className="font-semibold ">
                {data.type}{" "}
                <span className="text-gray-400 text-xs font-thin italic">
                  {data.area} sqft
                </span>
              </p>
              <p className=" text-sm font-semibold text-gray-400 ml-2">
                {data.for_}
              </p>
            </div>
            <div className=" truncate">{data.discription}</div>
            <div className="flex gap-10">
              <div className="flex  items-center text-xs">
                <p className="font-semibold">Bed :</p>
                <p className="text-xs text-gray-400">{data.bed}</p>
              </div>
              <div className="flex  items-center text-xs">
                <p className="font-semibold">Bath :</p>
                <p className="text-xs text-gray-400">{data.bath}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            {data.nearby.hospital && (
              <CiHospital1 color="#959698" size={"40px"} />
            )}{" "}
            {data.nearby.school && (
              <MdOutlineSchool color="#959698" size={"40px"} />
            )}{" "}
            {data.nearby.playground && (
              <FaCampground color="#959698" size={"40px"} />
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-400">{data.city}</p>
            <p className="text-xs text-gray-400">&#8377;{data.prize}</p>
          </div>
          <div className="flex items-center gap-5">
            <Button className="mt-2 italic" onClick={handelClick}>
              I'm Intrested
            </Button>

            <div className="flex items-center">
              {liked ? (
                <AiFillLike
                  fill="red"
                  size={20}
                  stroke="gray"
                  onClick={handleLike}
                />
              ) : (
                <BiLike
                  fill="gray"
                  size={20}
                  stroke="gray"
                  onClick={handleLike}
                />
              )}
              {data.likes.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
