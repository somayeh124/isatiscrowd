/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Attachment from './attache';

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
    companyAddress: '', // فیلد آدرس شرکت
    companyEmail: '', // فیلد ایمیل شرکت
    requestedAmount: 10000000000, // مقدار منابع درخواستی
  });

  const [attachments, setAttachments] = useState({
    first: [],
    second: [],
    third: []
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyTypes = ['سهامی عام', 'سهامی خاص', 'مسئولیت محدود', 'تعاونی'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAttach = (type, newAttachments) => {
    // افزودن پیوست‌های جدید به لیست موجود برای هر بخش (first, second, third)
    setAttachments((prevAttachments) => ({
      ...prevAttachments,
      [type]: [...prevAttachments[type], ...newAttachments],
    }));
  };

  const handleRemove = (type, index) => {
    // حذف پیوست از لیست
    setAttachments((prevAttachments) => ({
      ...prevAttachments,
      [type]: prevAttachments[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // اعتبارسنجی فقط برای فیلد نام شرکت
    if (!formData.companyName) {
      setErrorMessage('لطفاً نام شرکت را وارد کنید.');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);
    console.log('Form Data:', formData);
    console.log('Attachments:', attachments);
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 mt-2"
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
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">آدرس شرکت:</label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">ایمیل شرکت:</label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6 ">
          <label className="block text-gray-700 text-sm font-semibold mb-2">موضوع فعالیت شرکت:</label>
          <input
            name="companyActivity"
            value={formData.companyActivity}
            onChange={handleChange}
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

      {/* استفاده از کامپوننت Attachment */}
      <Attachment
        title="افزودن پیوست‌ها"
        onFileChange={() => {}}
        onAttach={handleAttach}
        attachments={attachments}
        onRemove={handleRemove}
      />

      {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          درخواست بررسی اولیه
        </button>
      </div>

      {submitted && (
        <div className="mt-16 text-green-500 text-center font-semibold">اطلاعات ارسال شد</div>
      )}
    </form>
  );
}

export default Form;
