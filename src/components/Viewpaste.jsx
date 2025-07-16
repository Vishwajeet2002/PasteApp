import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCopy, FaShareAlt } from "react-icons/fa";

const ViewPaste = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    const savedPastes = JSON.parse(localStorage.getItem("paste")) || [];
    const found = savedPastes.find((p) => p._id === id);
    setPaste(found);
  }, [id]);

  const handleCopy = () => {
    if (paste?.content) {
      navigator.clipboard.writeText(paste.content);
      toast.success("📋 Content copied to clipboard!");
    }
  };

  const handleShare = () => {
    if (paste?._id) {
      const shareUrl = `${window.location.origin}/paste/${paste._id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("🔗 Link copied for sharing!");
    }
  };

  if (!paste) {
    return (
      <div className="text-center text-red-500 mt-16 text-lg font-semibold">
        Paste not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-tr from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-md transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          📝 Paste Viewer
        </h2>

        {/* Title */}
        <div className="mb-5">
          <label className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-2">
            Title
          </label>
          <input
            type="text"
            value={paste.title || "Untitled"}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>

        {/* Content */}
        <div className="mb-5">
          <label className="text-gray-600 dark:text-gray-300 text-sm font-medium block mb-2">
            Content
          </label>
          <textarea
            value={paste.content}
            disabled
            rows={12}
            className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white resize-none overflow-x-auto"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={handleCopy}
            className="btn-action bg-blue-600 hover:bg-blue-700"
          >
            <FaCopy /> Copy Content
          </button>
          <button
            onClick={handleShare}
            className="btn-action bg-green-600 hover:bg-green-700"
          >
            <FaShareAlt /> Share Link
          </button>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-6">
          Created at:{" "}
          {new Date(paste.createAt).toLocaleString() || "Unknown time"}
        </p>
      </div>
    </div>
  );
};

export default ViewPaste;
