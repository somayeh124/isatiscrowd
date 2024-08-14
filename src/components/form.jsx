/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function AttachmentSection({ title, attachmentName, onNameChange, onFileChange, onAttach, attachments, onRemove }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">{title}</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="نام مدرک"
          value={attachmentName}
          className="block w-1/4 text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none"
          onChange={onNameChange}
        />
        <input
          type="file"
          onChange={onFileChange}
          multiple
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
        <button
          type="button"
          onClick={onAttach}
          className="bg-blue-600 text-white rounded-md p-3"
        >
          پیوست
        </button>
      </div>
      {attachments.length > 0 && (
        <ul className="mt-4 space-y-2">
          {attachments.map((attachment, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md shadow-sm"
            >
              <span>{attachment.name}</span>
              <span>{attachment.file.name}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
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
}

function Form() {
  // state برای نگهداری اطلاعات فرم
  const [companyName, setCompanyName] = useState(''); // نام شرکت
  const [companyId, setCompanyId] = useState(''); // شناسه شرکت
  const [registrationNumber, setRegistrationNumber] = useState(''); // شماره ثبت شرکت
  const [recentAttachments, setRecentAttachments] = useState([]); // پیوست‌های صورت مالی سال‌های اخیر
  const [oldAttachments, setOldAttachments] = useState([]); // پیوست‌های صورت مالی سال‌های قبل
  const [documents, setDocuments] = useState([]); // مدارک
  const [recentAttachmentName, setRecentAttachmentName] = useState(''); // نام پیوست‌های اخیر
  const [oldAttachmentName, setOldAttachmentName] = useState(''); // نام پیوست‌های قدیمی
  const [documentName, setDocumentName] = useState(''); // نام مدارک
  const [recentFiles, setRecentFiles] = useState([]); // فایل‌های صورت مالی سال‌های اخیر
  const [oldFiles, setOldFiles] = useState([]); // فایل‌های صورت مالی سال‌های قبل
  const [documentFiles, setDocumentFiles] = useState([]); // فایل‌های مدارک
  const [submitted, setSubmitted] = useState(false); // وضعیت ارسال فرم
  const [errorMessage, setErrorMessage] = useState(''); // پیام خطا

  const handleFilesChange = (setFiles) => (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleAddAttachment = (files, attachmentName, setAttachments, setAttachmentName, setFiles) => () => {
    const newAttachments = files.map((file) => ({
      file,
      name: attachmentName || 'بدون نام',
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
    setFiles([]);
    setAttachmentName('');
  };

  const handleRemoveAttachment = (attachments, setAttachments) => (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (recentAttachments.length === 0 || oldAttachments.length === 0 || documents.length === 0) {
      setErrorMessage('لطفاً تمام مدارک مورد نیاز را پیوست کنید.');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);

    setCompanyName('');
    setCompanyId('');
    setRegistrationNumber('');
    setRecentAttachments([]);
    setOldAttachments([]);
    setDocuments([]);
    setRecentAttachmentName('');
    setOldAttachmentName('');
    setDocumentName('');
    setRecentFiles([]);
    setOldFiles([]);
    setDocumentFiles([]);
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 mt-12 bg-white rounded-xl shadow-md"
    >
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">اطلاعات شرکت</h1>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">نام شرکت:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">شماره شناسه:</label>
        <input
          type="number"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">شماره ثبت:</label>
        <input
          type="number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <AttachmentSection
        title="صورت مالی چندسال اخیر:"
        attachmentName={recentAttachmentName}
        onNameChange={(e) => setRecentAttachmentName(e.target.value)}
        onFileChange={handleFilesChange(setRecentFiles)}
        onAttach={handleAddAttachment(recentFiles, recentAttachmentName, setRecentAttachments, setRecentAttachmentName, setRecentFiles)}
        attachments={recentAttachments}
        onRemove={handleRemoveAttachment(recentAttachments, setRecentAttachments)}
      />

      <AttachmentSection
        title="صورت مالی سال‌های قبل:"
        attachmentName={oldAttachmentName}
        onNameChange={(e) => setOldAttachmentName(e.target.value)}
        onFileChange={handleFilesChange(setOldFiles)}
        onAttach={handleAddAttachment(oldFiles, oldAttachmentName, setOldAttachments, setOldAttachmentName, setOldFiles)}
        attachments={oldAttachments}
        onRemove={handleRemoveAttachment(oldAttachments, setOldAttachments)}
      />

      <AttachmentSection
        title="مدارک:"
        attachmentName={documentName}
        onNameChange={(e) => setDocumentName(e.target.value)}
        onFileChange={handleFilesChange(setDocumentFiles)}
        onAttach={handleAddAttachment(documentFiles, documentName, setDocuments, setDocumentName, setDocumentFiles)}
        attachments={documents}
        onRemove={handleRemoveAttachment(documents, setDocuments)}
      />

      {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
        >
          ارسال
        </button>
      </div>
      
      {submitted && <div className="mt-6 text-green-500 text-center font-semibold">اطلاعات ارسال شد</div>}
    </form>
  );
}

export default Form;
