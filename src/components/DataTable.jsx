import React from "react";
import { motion } from "framer-motion";
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "./Icons";
import { notifyDelete, notifyEdit } from "./Toaster";

//Input component
const InputField = ({ value, onChange, className }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className={`w-full py-1 rounded-md text-center ${className}`}
  />
);

//Action component
const ActionButton = ({ onClick, className, children }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

//Table Header Component
const DataTableheader = ({ selectedRows, currentItems, handleSelectAll }) => (
  <tr className="bg-gray-200">
    <th className="text-center py-2 px-4 w-16">
      <input
        type="checkbox"
        checked={selectedRows.length === currentItems.length}
        onChange={handleSelectAll}
        className="h-5 w-5"
      />
    </th>
    <th className="py-4 px-4 border-r-2 w-48">Name</th>
    <th className="py-4 px-4 border-r-2 w-64">Email</th>
    <th className="py-4 px-4 border-r-2 w-32">Role</th>
    <th className="py-4 px-4 border-r-2 w-48">Actions</th>
  </tr>
);

//Table Row Component
const DataTableRow = ({
  item,
  selectedRows,
  handleRowSelect,
  handleInputChange,
  handleSave,
  handleEdit,
  handleCancel,
  handleDelete,
}) => (
  <motion.tr
    key={item.id}
    initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
    animate={{ opacity: 1, y: 0, scaleY: 1 }}
    exit={{ opacity: 0, y: 10, scaleY: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`border-b cursor-pointer hover:bg-purple-100 ${
      selectedRows.includes(item.id) ? "bg-gray-100 hover:bg-gray-100" : ""
    } ${item.editing ? "bg-sky-50" : ""}`}
  >
    <td className="text-center">
      <input
        className="h-5 w-5 accent-purple-500"
        type="checkbox"
        checked={selectedRows.includes(item.id)}
        onChange={() => handleRowSelect(item.id)}
      />
    </td>
    <td
      onClick={() => !item.editing && handleRowSelect(item.id)}
      className="py-3 px-4"
    >
      {item.editing ? (
        <InputField
          value={item.name}
          onChange={(e) => handleInputChange(item.id, "name", e.target.value)}
        />
      ) : (
        item.name
      )}
    </td>
    <td
      onClick={() => !item.editing && handleRowSelect(item.id)}
      className="py-3 px-4 h-12"
    >
      {item.editing ? (
        <InputField
          value={item.email}
          onChange={(e) => handleInputChange(item.id, "email", e.target.value)}
        />
      ) : (
        item.email
      )}
    </td>
    <td
      onClick={() => !item.editing && handleRowSelect(item.id)}
      className="py-3 px-4 h-12"
    >
      {item.editing ? (
        <InputField
          value={item.role}
          onChange={(e) => handleInputChange(item.id, "role", e.target.value)}
        />
      ) : (
        item.role
      )}
    </td>
    <td className="py-3 px-4 h-12">
      {item.editing ? (
        <>
          <ActionButton
            onClick={() => {
              handleSave(item.id);
              notifyEdit();
            }}
            className="saveButton text-green-500 p-2 rounded-md mr-2 hover:bg-green-600 hover:text-white"
          >
            <SaveIcon />
          </ActionButton>
          <ActionButton
            onClick={() => handleCancel(item.id)}
            className="cancelButton p-2 rounded-md mr-2 hover:bg-red-500 hover:text-white"
          >
            <CancelIcon />
          </ActionButton>
        </>
      ) : (
        <>
          <ActionButton
            onClick={() => handleEdit(item.id)}
            className="editButton text-blue-500 p-2 rounded-md mr-2 hover:bg-blue-600 hover:text-white"
          >
            <EditIcon />
          </ActionButton>
          <ActionButton
            onClick={() => {
              handleDelete(item.id);
              notifyDelete();
            }}
            className="deleteButton text-red-500 p-2 rounded-md hover:bg-red-600 hover:text-white"
          >
            <DeleteIcon />
          </ActionButton>
        </>
      )}
    </td>
  </motion.tr>
);

const DataTable = ({
  selectedRows,
  currentItems,
  handleSelectAll,
  handleRowSelect,
  handleInputChange,
  handleSave,
  handleEdit,
  handleCancel,
  handleDelete,
}) => {
  return (
    <div>
      <table className="w-11/12 mx-auto bg-white border rounded-lg">
        <thead>
          <DataTableheader
            selectedRows={selectedRows}
            currentItems={currentItems}
            handleSelectAll={handleSelectAll}
          />
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <DataTableRow
              key={item.id}
              item={item}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleEdit={handleEdit}
              handleCancel={handleCancel}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
