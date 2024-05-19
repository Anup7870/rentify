import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CiHospital1 } from "react-icons/ci";
import { MdOutlineSchool } from "react-icons/md";
import { FaCampground } from "react-icons/fa";
import { Button } from "flowbite-react";
import { Pagination } from "flowbite-react";
export default function AllProps() {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (page) => setCurrentPage(page);
  useEffect(() => {
    console.log("claiing");
    const func = async () => {
      try {
        const api = await axios.get(
          `https://rentifyserver.onrender.com/api/prop/get?userId=${currentUser._id}`
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
        `https://rentifyserver.onrender.com/api/prop/delete?propId=${id}`
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
      <section className="overflow-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 mt-3">
          {Array.isArray(currentItems) &&
            currentItems.map((item) => (
              <div className="w-full ">
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
                      //   disabled={disabled}
                      onClick={() => handleCLick(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex overflow-x-auto sm:justify-center w-full items-center justify-center mb-10 mt-5">
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={data.length}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </div>
  );
}
