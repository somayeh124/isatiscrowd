/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Attachment({
  title,
  onFileChange,
  onAttach,
  attachments = { first: [], second: [], third: [] },
  onRemove,
}) {
  const [files, setFiles] = useState({ first: [], second: [], third: [] });

  const handleFilesChange = (type) => (e) => {
    setFiles({ ...files, [type]: Array.from(e.target.files) });
    onFileChange(e);
  };

  const handleAddAttachment = (type) => () => {
    const newAttachments = files[type].map((file) => ({
      file,
      name: type, // استفاده از عنوان به جای نام مدرک
    }));
    onAttach(type, newAttachments);
    setFiles({ ...files, [type]: [] });
  };

  const handleRemove = (type, index) => () => onRemove(type, index);

  const renderAttachmentSection = (type, label) => (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{label}</h3>
      <input
        type="file"
        onChange={handleFilesChange(type)}
        multiple
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none mt-2"
      />
      <button
        type="button"
        onClick={handleAddAttachment(type)}
        className="bg-blue-600 text-white rounded-md p-2 text-sm mt-2"
      >
        پیوست
      </button>

      {Array.isArray(attachments[type]) && attachments[type].length > 0 && (
        <ul className="mt-4 space-y-2">
          {attachments[type].map((attachment, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md shadow-sm"
            >
              <span>{attachment.name}</span>
              <span>{attachment.file.name}</span>
              <button
                type="button"
                onClick={handleRemove(type, index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2 mt-4 text-center">{title}</label>
      <div className="grid grid-cols-2 gap-4 w-full ">
        {renderAttachmentSection('first', 'گزارشات و مستندات منتهی به سال 1402')}
        {renderAttachmentSection('second', 'گزارشات و مستندات منتهی به سال 1401')}
        {renderAttachmentSection('third', 'گزارشات و مستندات به روز')}
      </div>
    </div>
  );
}

export default Attachment;
