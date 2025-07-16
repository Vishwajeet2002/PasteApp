import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const paste = useSelector((state) => state.paste.paste);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = paste.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste deleted successfully!", { id: "delete-toast" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-2xl mx-auto block px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800"
        />
      </div>

      {filteredData.length > 0 ? (
        <div className="grid gap-6">
          {filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-4 sm:p-6 overflow-hidden"
            >
              <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2 break-words">
                {paste.title}
              </h2>

              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words text-sm sm:text-base mb-4 overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words w-full overflow-x-auto">
                  {paste.content}
                </pre>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                  className="btn-action bg-yellow-500 hover:bg-yellow-600"
                >
                  <FaEdit /> Edit
                </button>

                <Link to={`/paste/${paste._id}`}>
                  <button className="btn-action bg-blue-600 hover:bg-blue-700">
                    <FaEye /> View
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="btn-action bg-red-600 hover:bg-red-700"
                >
                  <FaTrash /> Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard!", { id: "copy-toast" });
                  }}
                  className="btn-action bg-green-600 hover:bg-green-700"
                >
                  <FaCopy /> Copy
                </button>

                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}/paste/${paste._id}`;
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Share link copied!", { id: "share-toast" });
                  }}
                  className="btn-action bg-indigo-600 hover:bg-indigo-700"
                >
                  <FaShareAlt /> Share
                </button>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                {new Date(paste.createAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
          No matching pastes found.
        </p>
      )}
    </div>
  );
};

export default Paste;
