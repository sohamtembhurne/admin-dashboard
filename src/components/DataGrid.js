import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import DataTable from "./DataTable";
import { DeleteIcon, SearchIcon } from "./Icons";
import Toaster, { notifyDeleteMultiple } from "./Toaster";

const DataGrid = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  // useEffect(() => {
  //   const filtered = data.filter(
  //     (item) =>
  //       item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.role.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // }, [searchTerm, data]);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  const handleSearch = () => {
    const filtered = data.filter(
      (item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleEdit = (id) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, editing: true, originalData: { ...item } }
        : item
    );

    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleCancel = (id) => {
    const updatedData = data.map((item) =>
      item.id === id && item.editing
        ? { ...item.originalData, editing: false }
        : item
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
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, editing: false } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
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

  return (
    <div className="py-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Data Grid</h2>
      <div className="flex justify-between mb-4 w-11/12 mx-auto">
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="search-icon px-4 py-2 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
          >
            <SearchIcon />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              handleDeleteSelected();
              notifyDeleteMultiple(selectedRows.length);
            }}
            disabled={selectedRows.length === 0}
            className={`p-3  rounded ${
              selectedRows.length === 0
                ? "cursor-not-allowed bg-gray-300"
                : "bg-red-500 text-white"
            }`}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col text-left">
        <div>
          <DataTable
            selectedRows={selectedRows}
            currentItems={currentItems}
            handleSelectAll={handleSelectAll}
            handleRowSelect={handleRowSelect}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
          />
        </div>

        <div className="flex justify-between items-center mt-4 w-11/12 mx-auto">
          <div className="flex">
            <div className="px-2 py-1 text-gray-500">
              {` ${selectedRows.length} of ${filteredData.length} row(s) selected`}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="first-page px-2 py-1 border cursor-pointer hover:bg-blue-100 hover:text-blue-400"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {`<<`}
            </button>
            <button
              className="previous-page px-2 py-1 border cursor-pointer hover:bg-blue-100 hover:text-blue-400"
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
                  className={`px-2 py-1 mx-1 border ${
                    page === currentPage ? "bg-blue-100 text-blue-500" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="next-page px-2 py-1 border cursor-pointer hover:bg-blue-100 hover:text-blue-400"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= filteredData.length}
            >
              {`>`}
            </button>
            <button
              className="last-page px-2 py-1 border cursor-pointer hover:bg-blue-100 hover:text-blue-400"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              {`>>`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
