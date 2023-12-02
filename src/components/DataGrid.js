import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import {DeleteIcon, EditIcon} from "./Icons"

const DataGrid = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchApiData = async () => {
    try {
      const jsonData = await fetchData();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, editing: !item.editing } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleSave = (id) => {
    handleEdit(id);
  };

  const handleSelectAll = () => {
    const allIdsOnCurrentPage = currentItems.map((item) => item.id);
    const updatedSelectedRows =
      selectedRows.length === allIdsOnCurrentPage.length
        ? []
        : [...allIdsOnCurrentPage];
    setSelectedRows(updatedSelectedRows);
  };

  const handleRowSelect = (id) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((selectedId) => selectedId !== id)
      : [...selectedRows, id];
    setSelectedRows(updatedSelectedRows);
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Grid</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col text-left">
        <div>
          <table className="w-4/5 mx-auto bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border text-center border-gray-300 py-2 px-4 w-16">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === currentItems.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border border-gray-300 py-2 px-4 w-48">Name</th>
                <th className="border border-gray-300 py-2 px-4 w-64">Email</th>
                <th className="border border-gray-300 py-2 px-4 w-32">Role</th>
                <th className="border border-gray-300 py-2 px-4 w-48">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-300 ${
                    selectedRows.includes(item.id) ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleRowSelect(item.id)}
                    />
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.editing ? (
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleInputChange(item.id, "name", e.target.value)
                        }
                        className="border border-gray-300 w-full"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.editing ? (
                      <input
                        type="text"
                        value={item.email}
                        onChange={(e) =>
                          handleInputChange(item.id, "email", e.target.value)
                        }
                        className="border border-gray-300 w-full"
                      />
                    ) : (
                      item.email
                    )}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.editing ? (
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) =>
                          handleInputChange(item.id, "role", e.target.value)
                        }
                        className="border border-gray-300 w-full"
                      />
                    ) : (
                      item.role
                    )}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {item.editing ? (
                      <>
                        <button
                          onClick={() => handleSave(item.id)}
                          className="bg-green-500 text-white px-2 py-1 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="bg-gray-500 text-white px-2 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="bg-blue-500 text-white p-2 mr-2"
                        >
                          < EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white p-2"
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 w-4/5 mx-auto">
          <div className="flex">
            <button
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
              className={`px-2 py-1 bg-red-500 text-white rounded ${
                selectedRows.length === 0 ? "cursor-not-allowed" : ""
              }`}
            >
              Delete Selected
            </button>
            <div className="px-2 py-1">
              {` ${selectedRows.length} of ${filteredData.length} rows selected`}
            </div>
          </div>
          {/* <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span>{`Page ${currentPage} / ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= filteredData.length}
            >
              Next Page
            </button>
          </div> */}
          <div className="flex justify-end mt-4">
            <button
              className="px-2 py-1 border"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {`<`}
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 border ${
                    page === currentPage ? "bg-gray-300" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="px-2 py-1 border"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= filteredData.length}
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
