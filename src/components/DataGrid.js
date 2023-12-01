import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

const DataGrid = () => {
  const [data, setData] = useState([]);

  const fetchApiData = async () => {
    try {
      const jsonData = await fetchData();
      setData(jsonData);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Grid</h2>
      <table className="w-4/5 mx-auto bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">ID</th>
            <th className="border border-gray-300 py-2 px-4">Name</th>
            <th className="border border-gray-300 py-2 px-4">Email</th>
            <th className="border border-gray-300 py-2 px-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="border border-gray-300 py-2 px-4">{item.id}</td>
              <td className="border border-gray-300 py-2 px-4">{item.name}</td>
              <td className="border border-gray-300 py-2 px-4">{item.email}</td>
              <td className="border border-gray-300 py-2 px-4">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
