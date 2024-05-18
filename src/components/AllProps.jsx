import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CiHospital1 } from "react-icons/ci";
import { MdOutlineSchool } from "react-icons/md";
import { FaCampground } from "react-icons/fa";
import { Button } from "flowbite-react";
export default function AllProps() {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  console.log(data);
  console.log(currentUser._id);
  useEffect(() => {
    const func = async () => {
      try {
        const api = await axios.get(
          `http://localhost:3000/api/prop/get?userId=${currentUser._id}`
        );
        console.log(api.data.prop);
        setData(api.data.prop);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);
  const handleCLick = async (id) => {
    console.log(data);
    setDisabled(true);
    try {
      const api = await axios.delete(
        `http://localhost:3000/api/prop/delete?propId=${id}`
      );
      console.log(api);
      if (api.status === 200) {
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" px-4 mt-2 w-full h-screen ">
      <p className="font-semibold text-xl py-3 border-b w-full">
        All properties
      </p>
      <section>
        <div className="flex flex-wrap mt-3">
          {Array.isArray(data) &&
            data.map((item) => (
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="bg-white shadow-md rounded-md pb-2">
                  <img src={item.image} alt="" className=" w-full h-44" />
                  <div className="px-2">
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold ">
                          {item.type}{" "}
                          <span className="text-gray-400 text-xs font-thin italic">
                            {item.area} sqft
                          </span>
                        </p>
                        <p className=" text-sm font-semibold text-gray-400 ml-2">
                          {item.for_}
                        </p>
                      </div>
                      <div className=" truncate">{item.discription}</div>
                      <div className="flex gap-10">
                        <div className="flex  items-center text-xs">
                          <p className="font-semibold">Bed :</p>
                          <p className="text-xs text-gray-400">{item.bed}</p>
                        </div>
                        <div className="flex  items-center text-xs">
                          <p className="font-semibold">Bath :</p>
                          <p className="text-xs text-gray-400">{item.bath}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      {item.nearby.hospital && (
                        <CiHospital1 color="#959698" size={"40px"} />
                      )}{" "}
                      {item.nearby.school && (
                        <MdOutlineSchool color="#959698" size={"40px"} />
                      )}{" "}
                      {item.nearby.playground && (
                        <FaCampground color="#959698" size={"40px"} />
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-gray-400">{item.city}</p>
                      <p className="text-xs text-gray-400">
                        &#8377;{item.prize}
                      </p>
                    </div>
                    <Button
                      color="failure"
                      className="mt-2"
                      disabled={disabled}
                      //   onClick={handleCLick(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
