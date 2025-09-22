'use client'
import UploadForm from "./components/UploadForm";
import { useState } from "react";


export default function Home() {
  const [showAttachModal, setShowAttachModal] = useState(false)
  const [summary, setSummary] = useState("");
  return (
    <div className="flex h-screen bg-[#f5f6fa] text-gray-800 font-sans relative">

      {/* Sidebar */}
      <div className="w-70 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">Chronos</h1>
          </div>
        </div>

        <div className="p-4 w-65">
          <button className="w-full bg-[#0e0e2c] text-white py-2 rounded-md font-medium hover:opacity-90 transition">
            💬 New Chat
          </button>
        </div>

        <div className="px-4 text-sm text-gray-500 uppercase tracking-wide">
          Workspace
        </div>
        <div className="p-4 text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md mx-2 mt-2">
          📂 Untitled Chat
        </div>

        {/* Footer user name */}
        <div className="mt-auto p-4 text-gray-600 flex items-center space-x-2 text-xl border-t border-gray-200">
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center  justify-center text-xs uppercase">
            D
          </div>
          <span>text</span>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-start relative px-6 py-8">

        {/* Language Dropdown */}
        <div className="absolute top-4 right-6">
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none">
            <option>Spanish</option>
            <option>English</option>
            <option>French</option>
          </select>
        </div>


        

        {/* <UploadForm onSummary={setSummary} /> */}

        {showAttachModal && (
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[420px]">
              <UploadForm
                onSummary={(summary) => {
                  setSummary(summary);
                  setShowAttachModal(false);
                }}
                onClose={() => setShowAttachModal(false)}
              />
            </div>
          </div>
        )}

        {summary && (
          <div className="my-4 p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Summary</h2>
            <div>{summary}</div>
          </div>
        )}

        {/* Center Welcome Message */}
        <div className="text-center">
          <div className="text-4xl font-semibold mb-2 flex justify-center items-center space-x-2">
            <span>🧠</span>
            <span>Chronos</span>
          </div>
          <p className="text-lg g-1 text-gray-500">Your AI-powered memory vault.</p>
          <p className="mt-2 gap-1 text-sm text-gray-400">
            I hate being idle, what shall we discover today?<br />
            <span className="text-gray-500">Ask me anything, I will respond to everything</span>
          </p>
        </div>

        {/* Input Box */}
        <div className="absolute bottom-10 w-full max-w-3xl px-4">
          <div className="flex items-center border text-xl border-gray-300 rounded-lg shadow-sm bg-white px-4 py-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 focus:outline-none text-sm"
            />
            <button className="ml-2 text-gray-500 hover:text-gray-800">
              ⬆️
            </button>
          </div>
          <div className="flex justify-between text-sm  text-gray-400 mt-2 px-2">
            <span>⚙️ Settings</span>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAttachModal(true)}
              >
                Attach
              </button>
              <span>🧠 Your Memory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
