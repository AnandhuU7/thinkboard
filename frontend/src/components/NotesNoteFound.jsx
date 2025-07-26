import React from "react";

const NotesNoteFound = () => (
  <div className="flex flex-col items-center justify-center py-10">
    <svg
      className="w-16 h-16 text-gray-400 mb-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17v-2a4 4 0 014-4h3m4 4v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7"
      />
    </svg>
    <h2 className="text-xl font-semibold text-gray-700 mb-2">No Notes Found</h2>
    <p className="text-gray-500">You don't have any notes yet. Create one to get started!</p>
  </div>
);

export default NotesNoteFound;
