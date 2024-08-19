/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function AttachmentSection({
  title,
  attachmentName,
  onNameChange,
  onFileChange,
  onAttach,
  attachments,
  onRemove,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">{title}</label>
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="نام مدرک"
          value={attachmentName}
          className="block w-1/3 text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none"
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
          className="bg-blue-600 text-white rounded-md p-2 text-sm"
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
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    companyId: '',
    registrationNumber: '',
    capitalAmount: '',
    employeeCount: '',
    companyActivity: '',
    companyAddress: '', // افزودن فیلد آدرس شرکت
    companyEmail: '', // افزودن فیلد ایمیل شرکت
    requestedAmount: 10000000000,
  });

  const [recentAttachments, setRecentAttachments] = useState([]);
  const [oldAttachments, setOldAttachments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [attachmentNames, setAttachmentNames] = useState({
    recent: '',
    old: '',
    document: '',
  });
  const [files, setFiles] = useState({
    recent: [],
    old: [],
    document: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyTypes = ['سهامی عام', 'سهامی خاص', 'مسئولیت محدود', 'تعاونی'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilesChange = (type) => (e) => {
    setFiles({ ...files, [type]: Array.from(e.target.files) });
  };

  const handleAddAttachment = (type) => () => {
    const newAttachments = files[type].map((file) => ({
      file,
      name: attachmentNames[type] || 'بدون نام',
    }));
    if (type === 'recent') setRecentAttachments((prev) => [...prev, ...newAttachments]);
    if (type === 'old') setOldAttachments((prev) => [...prev, ...newAttachments]);
    if (type === 'document') setDocuments((prev) => [...prev, ...newAttachments]);

    setFiles({ ...files, [type]: [] });
    setAttachmentNames({ ...attachmentNames, [type]: '' });
  };

  const handleRemoveAttachment = (type) => (index) => {
    if (type === 'recent') setRecentAttachments(recentAttachments.filter((_, i) => i !== index));
    if (type === 'old') setOldAttachments(oldAttachments.filter((_, i) => i !== index));
    if (type === 'document') setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (recentAttachments.length === 0) {
      setErrorMessage('لطفاً تمام مدارک مورد نیاز را پیوست کنید.');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-3xl  mx-auto p-8 mt-2 "
    >
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">اطلاعات شرکت</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">نام شرکت:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">نوع شرکت:</label>
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">انتخاب کنید</option>
            {companyTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">شماره شناسه:</label>
          <input
            type="number"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">شماره ثبت:</label>
          <input
            type="number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            سرمایه ثبتی (ریال):
          </label>
          <input
            type="number"
            name="capitalAmount"
            value={formData.capitalAmount}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">تعداد کارکنان:</label>
          <input
            type="number"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">آدرس شرکت:</label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">ایمیل شرکت:</label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            موضوع فعالیت شرکت:
          </label>
          <input
            name="companyActivity"
            value={formData.companyActivity}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mt-4 w-1/2 flex flex-col justify-center items-center mx-auto">
  <label className="block text-gray-700 text-sm font-semibold mb-2 text-center">
    میزان منابع درخواستی (ریال):
  </label>
  <input
    type="range"
    name="requestedAmount"
    min={10000000000} // 10 میلیارد ریال
    max={250000000000} // 250 میلیارد ریال
    step={10000000000} // گام 10 میلیارد ریال
    value={formData.requestedAmount}
    onChange={handleChange}
    className="w-full"
  />
  <span className="block text-gray-700 text-sm mt-2 text-center">
    {formData.requestedAmount.toLocaleString()} ریال
  </span>
</div>

      <div className=" gap-4 mt-8  grid grid-cols-2 ">
        <AttachmentSection
          title="صورت مالی  1402,1401:"
          attachmentName={attachmentNames.recent}
          onNameChange={(e) => setAttachmentNames({ ...attachmentNames, recent: e.target.value })}
          onFileChange={handleFilesChange('recent')}
          onAttach={handleAddAttachment('recent')}
          attachments={recentAttachments}
          onRemove={handleRemoveAttachment('recent')}
        />
        <AttachmentSection
          title="گزارش حسابرسی :"
          attachmentName={attachmentNames.document}
          onNameChange={(e) => setAttachmentNames({ ...attachmentNames, document: e.target.value })}
          onFileChange={handleFilesChange('document')}
          onAttach={handleAddAttachment('document')}
          attachments={documents}
          onRemove={handleRemoveAttachment('document')}
        />
      </div>

      {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          ارسال
        </button>
      </div>

      {submitted && (
        <div className="mt-16 text-green-500 text-center font-semibold">اطلاعات ارسال شد</div>
      )}
    </form>
  );
}

export default Form;
