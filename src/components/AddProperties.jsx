import { Button, Checkbox, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CiHospital1 } from "react-icons/ci";
import { MdOutlineSchool } from "react-icons/md";
import { FaCampground } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AddProperties() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const [images, setImages] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [Hospital, sethospital] = useState(false);
  const [School, setschool] = useState(false);
  const [Playground, setplayground] = useState(false);
  const [cit, setCity] = useState("Delhi");
  const [bed, setBed] = useState(1);
  const [bath, setBath] = useState(1);
  const [for_, setFor] = useState("rent");
  const [disabled, setDisabled] = useState(false);
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
  const image = useRef();
  const handleImageInput = () => {
    image.current.click();
    setImages(image.current.files[0]);
  };
  const handleImage = (e) => {
    // console.log("image");
    // const file = e.target.files[0]; // Corrected here
    // console.log(file);
    // if (file) {
    //   console.log(e.target.files[0]);
    //   setImages(e.target.files[0]);
    //   setImageUrl(URL.createObjectURL(e.target.files[0]));
    // }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(reader.result); // set the Base64 string to state
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // callin the api

  const onSubmit = async (datas) => {
    setDisabled(true);
    const data = {
      ...datas,
      userId: currentUser._id,
      for_,
      city: cit,
      bed,
      bath,
      nearby: { Hospital, School, Playground },
      image: images,
    };
    console.log(data);
    const api = await axios.post(
      "https://rentifyserver.onrender.com/api/prop/create",
      data
    );
    if (api.status === 201) {
      // alert("Property added successfully")
      setDisabled(false);
    }
  };
  return (
    <div className="px-4 mt-2 w-full h-screen ">
      <p className="font-semibold text-xl py-3 border-b w-full">
        Add your Properties
      </p>
      <section className="bg-gray-50 pt-3 ">
        <div class="h-full ">
          <div class="w-full bg-white  rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-">
            <form
              className="px-5 overflow-auto py-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=" w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className=" w-80">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Property type
                  </label>
                  <TextInput
                    placeholder="office,villa,appartment"
                    className="w-full"
                    {...register("type", { required: "required !" })}
                  />
                  {errors.type && (
                    <p className="text-red-500">{errors.type.message}</p>
                  )}
                </div>
                <div className=" w-80">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Property for
                  </label>
                  <select
                    onChange={(e) => setFor(e.target.value)}
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                  >
                    <option value="rent" className="py-4">
                      Rent
                    </option>
                    <option value="sale" className="py-4">
                      Sale
                    </option>
                  </select>
                </div>
                <div className=" w-80">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Property Prize
                  </label>
                  <TextInput
                    placeholder="eg 10000"
                    className="w-full"
                    {...register("prize", {
                      required: "Prize is required!",
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Prize must be a number",
                      },
                    })}
                  />
                  {errors.prize && (
                    <p className="text-red-500">{errors.prize.message}</p>
                  )}
                </div>
                <div className=" w-80">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bed
                  </label>
                  <select
                    onChange={(e) => setBed(e.target.value)}
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                  >
                    <option value="1" className="py-4">
                      1
                    </option>
                    <option value="2" className="py-4">
                      2
                    </option>
                    <option value="3" className="py-4">
                      3
                    </option>
                    <option value="4" className="py-4">
                      4
                    </option>
                  </select>
                </div>
                <div className=" w-80">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Bath
                  </label>
                  <select
                    onChange={(e) => setBath(e.target.value)}
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                  >
                    <option value="1" className="py-4">
                      1
                    </option>
                    <option value="2" className="py-4">
                      2
                    </option>
                    <option value="3" className="py-4">
                      3
                    </option>
                    <option value="4" className="py-4">
                      4
                    </option>
                  </select>
                </div>
                <div className=" w-80">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Area
                  </label>
                  <TextInput
                    placeholder="35 sqft"
                    {...register("area", { required: "required !" })}
                  />
                  {errors.area && (
                    <p className="text-red-500">{errors.type.message}</p>
                  )}
                </div>
              </div>
              {/* discription */}
              <div className="mt-3">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <Textarea
                  rows={4}
                  {...register("discription", {
                    required: "Please enter the discription",
                  })}
                />
                {errors.discription && (
                  <p className="text-red-500">{errors.discription.message}</p>
                )}
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 ">
                <div className=" ">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    city
                  </label>
                  <select
                    name=""
                    onChange={(e) => setCity(e.target.value)}
                    id=""
                    className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                  >
                    {city.map((city) => (
                      <option value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pincode
                  </label>
                  <TextInput
                    placeholder="City"
                    {...register("pincode", {
                      required: "Pincode is required!",
                      minLength: {
                        value: 6,
                        message: "Pincode must be 6 digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "Pincode must be 6 digits",
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Pincode must be a number",
                      },
                    })}
                  />
                  {errors.pincode && (
                    <p className="text-red-500">{errors.pincode.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className=" font-semibold text-sm">Near by</p>
                <div className=" flex gap-20 mt-2 ">
                  <div className=" flex gap-2 items-center text-center ">
                    <div className="flex gap-1">
                      <CiHospital1 />
                      <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hospital
                      </label>
                    </div>

                    <Checkbox onChange={(e) => sethospital((prev) => !prev)} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1">
                      <MdOutlineSchool />
                      <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        School
                      </label>
                    </div>
                    <Checkbox onChange={(e) => setschool((prev) => !prev)} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1">
                      <FaCampground />
                      <label
                        for="title"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Playground
                      </label>
                    </div>
                    <Checkbox onChange={() => setplayground((prev) => !prev)} />
                  </div>
                </div>
              </div>
              <div>
                <p>Add image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                  ref={image}
                  // {...register("image", { required: "required !" })}
                />
                <div
                  className="w-full bg-gray-50 h-64 flex items-center justify-center mt-5"
                  onClick={() => image.current.click()}
                >
                  {}
                  {images ? (
                    <img
                      src={imageUrl}
                      alt=""
                      className=" object-cover h-64 w-full"
                    />
                  ) : (
                    <FaRegImages size={"50"} className="text-gray-200" />
                  )}
                </div>
                {/* {errors.image && (
                  <p className="text-red-500 mt-2">
                    Image is important for the post
                  </p>
                )} */}
              </div>
              <Button
                color="blue"
                className=" mt-5"
                type="submit"
                disabled={disabled}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
