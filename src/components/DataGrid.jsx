import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import DeleteButton from "./DeleteButton";
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

  //function to fetch json data from ENDPOINT
  const fetchApiData = async () => {
    try {
      const jsonData = await fetchData();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (err) {
      throw err;
    }
  };

  //useEffect hook to fetch adad
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

  //function to handle search
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

  //function to hanlde key press event
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //function to handle edit mode for certain row
  const handleEdit = (id) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, editing: true, originalData: { ...item } }
        : item
    );

    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to cancel edit mode for certain row
  const handleCancel = (id) => {
    const updatedData = data.map((item) =>
      item.id === id && item.editing
        ? { ...item.originalData, editing: false }
        : item
    );

    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to handle input change in editable row
  const handleInputChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to handle deletion of a certain row
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to handle saves for editable row
  const handleSave = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, editing: false } : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
  };

  //function to select all rows on current page
  const handleSelectAll = () => {
    const allIdsOnCurrentPage = currentItems.map((item) => item.id);
    const updatedSelectedRows =
      selectedRows.length === allIdsOnCurrentPage.length
        ? []
        : [...allIdsOnCurrentPage];
    setSelectedRows(updatedSelectedRows);
  };

  //function to select/deselect a certain row
  const handleRowSelect = (id) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((selectedId) => selectedId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelectedRows);
  };

  //function to delete selected row(s) on page
  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  return (
    <div className="py-4">
      <Toaster />
      <div className="flex justify-between items-center my-4 w-11/12 mx-auto">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
          onKeyDown={handleKeyPress}
        />
        <DeleteButton
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
          selectedRows={selectedRows}
          notifyDeleteMultiple={notifyDeleteMultiple}
        />
      </div>
      <div className="flex flex-col text-left">
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

        <Pagination
          selectedRows={selectedRows}
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          indexOfLastItem={indexOfLastItem}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default DataGrid;
