import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = async () => {
      try {
        const api = await axios.get(`http://localhost:3000/api/prop/get`);
        setData(api.data.prop);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  });
  return (
    <main className=" px-28 w-screen">
      <div>
        {/* filters */}
        <div className="flex justify-between items-center px-4 py-2">
          <p className="font-semibold text-xl">All properties</p>
          <div className="flex gap-4">
            <button className="btn">All</button>
            <button className="btn">For sale</button>
            <button className="btn">For rent</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-20 w-full mt-5">
        {Array.isArray(data) &&
          data.map((item) => <Card data={item} key={item._id} />)}
      </div>
    </main>
  );
}
