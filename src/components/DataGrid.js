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
      <h2>Data Grid</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
