// ✅ FINAL VERSION: Home.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateTopPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const allPastes = useSelector((state) => state.paste.paste);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = allPastes.find((p) => p._id === pasteId);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Please enter both title and content.");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateTopPaste(paste));
      toast.success("Paste updated successfully!", { id: "paste-success" });
    } else {
      dispatch(addToPaste(paste));
      toast.success("Paste created successfully!", { id: "paste-success" });
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <input
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full md:w-2/3 px-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-800"
        />
        <button
          onClick={createPaste}
          className="w-full md:w-auto px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition font-semibold"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div>
        <textarea
          value={value}
          placeholder="Enter the content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={18}
          className="w-full px-4 py-4 rounded-2xl border border-gray-300 shadow-sm text-gray-800 resize-none"
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
