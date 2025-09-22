'use client';
import React, { useState, DragEvent } from 'react';

type UploadFormProps = {
  onSummary: (summary: string) => void;
  onClose?: () => void;
};

export default function UploadForm({ onSummary, onClose }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (activeTab === 'file' && file) formData.append('file', file);
    if (activeTab === 'url' && link) formData.append('link', link);

    const res = await fetch('/api/summarize', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    onSummary(data.summary || 'No summary generated.');
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-[420px]">
            {/* Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-md font-medium">Upload Content</h2>
                <button
                    onClick={() => {
                        setFile(null);
                        setLink('');
                        onClose?.();
                    }}
                    className="text-gray-400 hover:text-gray-600 text-lg"
                >
                    &times;
                </button>
            </div>

            {/* Tabs */}
            <div className="flex px-6 pt-4">
                <button
                    type="button"
                    onClick={() => setActiveTab('file')}
                    className={`w-1/2 py-2 text-sm font-medium rounded-t-md ${
                        activeTab === 'file'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('url')}
                    className={`w-1/2 py-2 text-sm font-medium rounded-t-md ${
                        activeTab === 'url'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                >
                    Add URL
                </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 flex flex-col gap-4">
                {activeTab === 'file' ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-indigo-500"
                    >
                        <label htmlFor="file-upload" className="block cursor-pointer">
                            <div className="text-2xl text-gray-400 mb-2">⬆️</div>
                            <p className="text-sm text-gray-600">
                                Drop files here or click to browse
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Supports: Text, PDF, Images, Videos (max 50MB)
                            </p>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.mp4"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        {file && (
                            <p className="text-xs text-gray-700 mt-2">Selected: {file.name}</p>
                        )}
                    </div>
                ) : (
                    <input
                        type="text"
                        placeholder="Paste a URL to summarize..."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                    />
                )}

                <button
                    type="submit"
                    disabled={
                        loading || (activeTab === 'file' && !file) || (activeTab === 'url' && !link)
                    }
                    className={`w-full py-2 text-sm rounded ${
                        loading
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {loading ? 'Summarizing...' : 'Submit'}
                </button>
            </form>
        </div>
  );
}