import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Button, Pagination } from "flowbite-react";
export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const onPageChange = (page) => setCurrentPage(page);
  const [citys, setCity] = useState(null);
  const [type, setType] = useState(null);
  useEffect(() => {
    const func = async () => {
      try {
        const api = await axios.get(
          `https://rentifyserver.onrender.com/api/prop/get`
        );
        setData(api.data.prop);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);
  const city = [
    "Delhi",
    "Mumbai",
    "Banglore",
    "Kolkata",
    "Chennai",
    "Pune",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Patna",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Vadodara",
    "Firozabad",
    "Ludhiana",
    "Rajkot",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Ranchi",
    "Haora",
    "Coimbatore",
    "Jabalpur",
    "Gwalior",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Guwahati",
    "Chandigarh",
    "Solapur",
    "Hubli and Dharwad",
    "Bareilly",
    "Moradabad",
    "Mysore",
    "Gurgaon",
    "Aligarh",
    "Jalandhar",
    "Tiruchirappalli",
    "Bhubaneswar",
    "Salem",
    "Mira and Bhayander",
    "Thiruvananthapuram",
    "Bhiwandi",
    "Saharanpur",
    "Gorakhpur",
    "Guntur",
    "Bikaner",
    "Amravati",
    "Noida",
    "Jamshedpur",
    "Bhilai Nagar",
    "Warangal",
    "Cuttack",
    "Firozabad",
    "Kochi",
    "Bhavnagar",
    "Dehradun",
    "Durgapur",
    "Asansol",
    "Nanded Waghala",
    "Kolhapur",
    "Ajmer",
    "Gulbarga",
    "Jamnagar",
    "Ujjain",
    "Loni",
    "Siliguri",
    "Jhansi",
    "Ulhasnagar",
    "Nellore",
    "Jammu",
    "Sangli-Miraj & Kupwad",
    "Belgaum",
    "Mangalore",
    "Ambattur",
    "Tirunelveli",
    "Malegoan",
    "Gaya",
    "Jalgaon",
    "Udaipur",
    "Maheshtala",
    "Tirupur",
    "Davanagere",
    "Kozhikode",
    "Akola",
    "Kurnool",
    "Bokaro Steel City",
    "Rajpur Sonarpur",
    "South Dumdum",
    "Bellary",
    "Patiala",
    "Gopalpur",
    "Agartala",
    "Bhagalpur",
    "Muzaffarnagar",
    "Bhatpara",
    "Panihati",
    "Latur",
    "Dhule",
  ];
  const handleAll = async () => {
    try {
      const api = await axios.get(
        `https://rentifyserver.onrender.com/api/prop/get`
      );
      setData(api.data.prop);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesale = async () => {
    try {
      const api = await axios.get(
        `https://rentifyserver.onrender.com/api/prop/get?for_=sale`
      );
      setData(api.data.prop);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRent = async () => {
    try {
      const api = await axios.get(
        `https://rentifyserver.onrender.com/api/prop/get?for_=rent`
      );
      setData(api.data.prop);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCity = async (city) => {
    try {
      const api = await axios.get(
        `https://rentifyserver.onrender.com/api/prop/get?city=${city}`
      );
      setData(api.data.prop);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className=" px-28 w-screen">
      <div>
        {/* filters */}
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold text-xl">properties</p>
          <div className="flex gap-4">
            <select
              name=""
              onChange={(e) => handleCity(e.target.value)}
              id=""
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
            >
              {city.map((city) => (
                <option value={city}>{city}</option>
              ))}
            </select>
            <Button className=" h-10 w-36" outline onClick={handleAll}>
              All
            </Button>
            <Button className=" h-10 w-36" outline onClick={handlesale}>
              sale
            </Button>
            <Button className=" h-10 w-36" outline onClick={handleRent}>
              rent
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-20 w-full mt-5">
        {Array.isArray(currentItems) &&
          currentItems.map((item) => <Card data={item} key={item._id} />)}
      </div>
      <div className="flex overflow-x-auto sm:justify-center w-full items-center justify-center mb-10 mt-5">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={data.length}
          onPageChange={onPageChange}
        />
      </div>
    </main>
  );
}
