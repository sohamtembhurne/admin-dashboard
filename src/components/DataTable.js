// TableComponent.js
import React from "react";
import { CancelIcon, DeleteIcon, EditIcon, SaveIcon } from "./Icons";

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
      <table className="w-11/12 mx-auto bg-[#4dcd874f] border rounded-lg">
        <thead>
          <tr className="bg-[#1f5236] text-white">
            <th className="text-center py-2 px-4 w-16">
              <input
                type="checkbox"
                checked={selectedRows.length === currentItems.length}
                onChange={handleSelectAll}
                className="h-5 w-5"
              />
            </th>
            <th className="py-4 px-4 border-r-2 w-48">Name</th>
            <th className="py-4 px-4 w-64">Email</th>
            <th className="py-4 px-4 w-32">Role</th>
            <th className="py-4 px-4 w-48">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr
              key={item.id}
              className={`border-b cursor-pointer ${
                selectedRows.includes(item.id) ? "bg-gray-200" : ""
              } ${item.editing ? "border-l border-l-red-400 bg-yellow-50" : ""}`}
            >
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleRowSelect(item.id)}
                  className="h-5 w-5"
                />
              </td>
              <td className="py-3 px-4">
                {item.editing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(item.id, "name", e.target.value)
                    }
                    className="w-full rounded-md text-center"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="py-3 px-4 h-12">
                {item.editing ? (
                  <input
                    type="text"
                    value={item.email}
                    onChange={(e) =>
                      handleInputChange(item.id, "email", e.target.value)
                    }
                    className="w-full rounded-md text-center"
                  />
                ) : (
                  item.email
                )}
              </td>
              <td className="py-3 px-4 h-12">
                {item.editing ? (
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) =>
                      handleInputChange(item.id, "role", e.target.value)
                    }
                    className="w-full rounded-md text-center "
                  />
                ) : (
                  item.role
                )}
              </td>
              <td className="py-3 px-4 h-12">
                {item.editing ? (
                  <>
                    <button
                      onClick={() => handleSave(item.id)}
                      className="text-green-500 p-2 rounded-md mr-2 hover:bg-green-600 hover:text-white"
                    >
                      <SaveIcon />
                    </button>
                    <button
                      onClick={() => handleCancel(item.id)}
                      className="p-2 rounded-md mr-2 hover:bg-red-500 hover:text-white"
                    >
                      <CancelIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-500 p-2 rounded-md mr-2 hover:bg-blue-600 hover:text-white"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 p-2 rounded-md hover:bg-red-600 hover:text-white"
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
  );
};

export default DataTable;
