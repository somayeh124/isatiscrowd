/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';

function Attachment({
  title,
  onFileChange,
  onAttach,
  attachments = { first: [], second: [], third: [] },
  onRemove,
}) {
  const handleFilesChange = (type, index) => (e) => {
    const newFiles = Array.from(e.target.files);
    const newAttachments = newFiles.map((file) => ({
      file,
      name: `${type}_file_${index + 1}`,
    }));
    onAttach(type, newAttachments);
    onFileChange(e);
  };

  const handleRemove = (type, index) => () => onRemove(type, index);

  const renderAttachmentSection = (type, label) => (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{label}</h3>
      {['صورت مالی حسابرسی شده', 'گزارش حسابرسی', 'گزارش بازرس'].map((fileLabel, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {fileLabel}:
          </label>
          <input
            type="file"
            onChange={handleFilesChange(type, index)}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200 mt-2"
          />
        </div>
      ))}
      {Array.isArray(attachments[type]) && attachments[type].length > 0 && (
        <ul className="mt-4 space-y-2">
          {attachments[type].map((attachment, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm"
            >
              <span className="text-gray-700">{attachment.name}</span>
              <span className="text-gray-500">{attachment.file.name}</span>
              <button
                type="button"
                onClick={handleRemove(type, index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
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
    <div className="flex flex-col items-center justify-center mb-8">
      <label className="block text-gray-700 text-xl font-bold mb-4 text-center">
        {title}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {renderAttachmentSection('first', 'گزارشات و مستندات منتهی به سال 1402')}
        {renderAttachmentSection('second', 'گزارشات و مستندات منتهی به سال 1401')}
        {renderAttachmentSection('third', 'گزارشات و مستندات به روز')}
      </div>
    </div>
  );
}

function Form() {
  const [formData, setFormData] = useState({
    company_name: '',
    company_kind: '',
    nationalid: '',
    registration_number: '',
    registered_capital: '',
    personnel: '',
    activity_industry: '',
    company_address: '',
    company_email: '',
    amount_of_request: 10000000000,
  });

  const [attachments, setAttachments] = useState({
    first: [],
    second: [],
    third: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyTypes = ['سهامی عام', 'سهامی خاص', 'مسئولیت محدود', 'تعاونی'];

  const formatNumber = (value) => value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'company_name') {
      const lettersOnly = value.replace(/[^a-zA-Z\s\u0600-\u06FF]/g, '');
      setFormData({ ...formData, [name]: lettersOnly });
    } else if (type === 'number') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else if (type === 'range') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAttach = (type, newAttachments) => {
    setAttachments((prevAttachments) => ({
      ...prevAttachments,
      [type]: [...prevAttachments[type], ...newAttachments],
    }));
  };

  const handleRemove = (type, index) => {
    setAttachments((prevAttachments) => ({
      ...prevAttachments,
      [type]: prevAttachments[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company_name) {
      setErrorMessage('لطفاً نام شرکت را وارد کنید.');
      return;
    }

    setErrorMessage('');

    const dataToPost = new FormData();
    dataToPost.append('company_name', formData.company_name);
    dataToPost.append('activity_industry', formData.activity_industry);
    dataToPost.append('registration_number', formData.registration_number);
    dataToPost.append('nationalid', formData.nationalid);
    dataToPost.append('registered_capital', formData.registered_capital);
    dataToPost.append('personnel', formData.personnel);
    dataToPost.append('company_kind', formData.company_kind);
    dataToPost.append('amount_of_request', formData.amount_of_request);
    dataToPost.append('code', '');

    // اضافه کردن فایل‌های پیوست به FormData
    attachments.first.forEach((file, index) => {
      dataToPost.append(`first_attachment_${index}`, file.file);
    });

    attachments.second.forEach((file, index) => {
      dataToPost.append(`second_attachment_${index}`, file.file);
    });

    attachments.third.forEach((file, index) => {
      dataToPost.append(`third_attachment_${index}`, file.file);
    });

    try {
      const response = await axios.post(`${OnRun}/api/cart/`, dataToPost, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200) {
        setSubmitted(true);
        console.log('اطلاعات با موفقیت ارسال شد:', formData);
      } else {
        console.error('ارسال اطلاعات با خطا مواجه شد:', response.statusText);
      }
    } catch (error) {
      console.error('خطا در ارتباط با سرور:', error);
    }
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">اطلاعات شرکت</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">نام شرکت:</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">نوع شرکت:</label>
          <select
            name="company_kind"
            value={formData.company_kind}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
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
          <label className="block text-gray-700 text-sm font-medium mb-2">شماره شناسه:</label>
          <input
            type="text"
            name="nationalid"
            value={formatNumber(formData.nationalid)}
            onChange={handleInputChange}
            maxLength={14}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">شماره ثبت:</label>
          <input
            type="text"
            name="registration_number"
            value={formatNumber(formData.registration_number)}
            onChange={handleInputChange}
            maxLength={12}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">سرمایه ثبتی (ریال):</label>
          <input
            type="text"
            name="registered_capital"
            value={formatNumber(formData.registered_capital)}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">تعداد کارکنان:</label>
          <input
            type="number"
            name="personnel"
            value={formData.personnel}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">آدرس شرکت:</label>
          <input
            type="text"
            name="company_address"
            value={formData.company_address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">ایمیل شرکت:</label>
          <input
            type="email"
            name="company_email"
            value={formData.company_email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">موضوع فعالیت شرکت:</label>
          <input
            name="activity_industry"
            value={formData.activity_industry}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>

      <div className="mt-8 w-1/2  flex flex-col justify-center items-center mx-auto">
        <label className="block text-gray-700 text-sm font-medium mb-4 text-center">
          میزان منابع درخواستی (ریال):
        </label>
        <input
          type="range"
          name="amount_of_request"
          min={10000000000}
          max={250000000000}
          step={10000000000}
          value={formData.amount_of_request}
          onChange={handleInputChange}
          className="w-full"
        />
        <span className="block text-gray-700 text-sm mt-4 text-center">
          {formData.amount_of_request.toLocaleString()} ریال
        </span>
      </div>

      <Attachment
        title="افزودن پیوست‌ها"
        onFileChange={() => {}}
        onAttach={handleAttach}
        attachments={attachments}
        onRemove={handleRemove}
      />

      {errorMessage && <div className="text-red-500 text-sm mb-6 text-center">{errorMessage}</div>}

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          درخواست بررسی اولیه
        </button>
      </div>

      {submitted && (
        <div className="mt-16 text-green-500 text-xl font-semibold text-center">
          اطلاعات ارسال شد
        </div>
      )}
    </form>
  );
}

export default Form;
