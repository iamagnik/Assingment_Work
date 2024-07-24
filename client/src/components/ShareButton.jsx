import React from 'react';

const ShareButton = ({ generateShareUrl }) => {
  return (
    <button
      onClick={generateShareUrl}
      className="share-button bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
    >
      Share
    </button>
  );
};

export default ShareButton;
