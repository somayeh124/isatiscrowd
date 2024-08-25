/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// تابع Attachment
function Attachment({ title, onFileChange, onAttach, attachments, onRemove }) {
  console.log('====================================');
  console.log(attachments);
  console.log('====================================');
  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const newAttachment = {
        file,
        name: file.name,
        url: `${OnRun}/${file.name}`,  
      };
      onAttach(type, newAttachment);
      onFileChange(e);
    }
  };

  const handleRemove = (type) => onRemove(type);

  const renderAttachmentSection = (type, label, attachment) => (
    <div className="p-4 bg-white rounded-lg">
      <h3 className="text-base font-semibold text-gray-800 mb-4">{label}</h3>
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => handleFileChange(type, e)}
          className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200 mt-2"
        />
      </div>
      {attachment && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-700">{attachment.name}</span>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleRemove(type)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                حذف
              </button>
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                مشاهده
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <label className="block text-gray-700 text-xl font-bold mb-8 mt-4 text-center">{title}</label>
      <p>حداکثر حجم فایل می تواند 20 مگابایت باشد</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white shadow-lg rounded-lg mt-4">
          <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
            گزارشات و مستندات منتهی به سال 1401
          </h2>
          {renderAttachmentSection(
            'financial_report_lastyear',
            'صورت مالی',
            attachments.financial_report_lastyear
          )}
          {renderAttachmentSection(
            'audit_report_lastyear',
            'گزارش حسابرسی',
            attachments.audit_report_lastyear
          )}
          {renderAttachmentSection(
            'statement_lastyear',
            'اظهارنامه',
            attachments.statement_lastyear
          )}

        </div>
        <div className="bg-white shadow-lg rounded-lg mt-4">
          <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
            گزارشات و مستندات منتهی به سال 1402
          </h2>
          {renderAttachmentSection(
            'financial_report_yearold',
            'صورت مالی',
            attachments.financial_report_yearold
          )}
          {renderAttachmentSection(
            'audit_report_yearold',
            'گزارش حسابرسی',
            attachments.audit_report_yearold
          )}
          {renderAttachmentSection('statement_yearold', 'اظهارنامه', attachments.statement_yearold)}
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg mt-4">
        <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
          گزارشات و مستندات به روز
        </h2>
        {renderAttachmentSection(
          'alignment_6columns_thisyear',
          'تراز 6ستونی',
          attachments.alignment_6columns_thisyear
        )}
      </div>
    </div>
  );
}

function Form({ cardSelected }) {
  const access = getCookie('access');
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
    status: '',
  });

  const [attachments, setAttachments] = useState({
    financial_report_lastyear: null,
    financial_report_yearold: null,
    audit_report_thisyear: null,
    audit_report_lastyear: null,
    audit_report_yearold: null,
    statement_lastyear: null,
    statement_yearold: null,
    alignment_6columns_thisyear: null,

  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyTypes = [
    { type: 'special stock', title: 'خاص سهامی' },
    { type: 'common stock', title: 'عام سهامی' },
  ];

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const NumberFormat = (value) => String(value).replace(/\D/g, '');
  const cleanNumber = (value) => String(value).replace(/,/g, '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = cleanNumber(value);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleFormattedInputChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = cleanNumber(value);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const validateCompanyName = (name) => {
    const lettersOnly = /^[A-Za-z\u0600-\u06FF\s]+$/;
    return lettersOnly.test(name);
  };

  const handleCompanyNameKeyDown = (e) => {
    if (!/^[A-Za-z\u0600-\u06FF\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleAttach = (type, newAttachment) => {
    console.log('Attachment URL:', newAttachment.url); // اضافه کردن این خط برای لاگ گرفتن از URL پیوست‌ها
    setAttachments((prevAttachments) => ({
      ...prevAttachments,
      [type]: newAttachment,
    }));
  };

  const handleRemove = (type) => {
    setAttachments((prevAttachments) => ({
      ...prevAttachments,
      [type]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.company_name) {
      setErrorMessage('لطفاً  فیلد را وارد کنید.');
      setLoading(false);
      return;
    }
    if (!formData.nationalid) {
      toast('لطفاً شماره شناسه را وارد کنید و یکتا باشد.');
      setLoading(false);
      return;
    }
    if (!formData.registration_number) {
      toast('لطفاً شماره ثبت را وارد کنید و یکتا باشد');
      setLoading(false);
      return;
    }

    if (!validateCompanyName(formData.company_name)) {
      setErrorMessage('نام شرکت باید فقط شامل حروف باشد.');
      setLoading(false);
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
    dataToPost.append('status', formData.status);
    dataToPost.append('address', formData.company_address);
    dataToPost.append('email', formData.company_email);

    Object.keys(attachments).forEach((key) => {
      if (attachments[key] && attachments[key].file) {
        dataToPost.append(key, attachments[key].file);
      }
    });

    try {
      const response = await axios.post(`${OnRun}/api/cart/`, dataToPost, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        toast.success('اطلاعات با موفقیت ارسال شد.');

        setFormData({
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
          status: '',
        });

        setAttachments({
          financial_report_lastyear: null,
          financial_report_yearold: null,
          audit_report_lastyear: null,
          audit_report_yearold: null,
          statement_thisyear: null,
          statement_lastyear: null,
          statement_yearold: null,
          alignment_6columns_thisyear: null,

        });
      } else {
        console.error('ارسال اطلاعات با خطا مواجه شد:', response.statusText);
        toast.error('ارسال اطلاعات با خطا مواجه شد.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errors = error.response.data.error;
        Object.keys(errors).forEach((key) => {
          toast.error(`${key}: ${errors[key].join(', ')}`);
        });
      } else {
        console.error('خطا در ارتباط با سرور:', error);
        toast.error('خطا در ارتباط با سرور.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        if (cardSelected) {
          const response = await axios.get(`${OnRun}/api/cart/detail/${cardSelected}/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${access}`,
            },
          });
          setFormData(response.data.cart);
          setAttachments(response.data.cart);
          console.log('pivast', response.data.attachment)
          if (response.data.cart) {
            setFormData(response.data.cart);
          }
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    if (access) {
      fetchCards();
    }
  }, [cardSelected]);

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg"
    >
      <ToastContainer />
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">اطلاعات شرکت</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">نام شرکت:</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            onKeyDown={handleCompanyNameKeyDown}
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
            {companyTypes.map((typeObj, index) => (
              <option key={index} value={typeObj.type}>
                {typeObj.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">شماره شناسه:</label>
          <input
            type="text"
            name="nationalid"
            value={NumberFormat(formData.nationalid)}
            onChange={handleFormattedInputChange}
            maxLength={14}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">شماره ثبت:</label>
          <input
            type="text"
            name="registration_number"
            value={NumberFormat(formData.registration_number)}
            onChange={handleFormattedInputChange}
            maxLength={12}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            سرمایه ثبتی (ریال):
          </label>
          <input
            type="text"
            name="registered_capital"
            value={formatNumber(formData.registered_capital)}
            onChange={handleFormattedInputChange}
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

      <div className="mt-8 w-1/2 flex flex-col justify-center items-center mx-auto">
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
          {formatNumber(formData.amount_of_request)} ریال
        </span>
      </div>

      <Attachment
        title="افزودن پیوست‌ها"
        onFileChange={() => { }}
        onAttach={handleAttach}
        attachments={attachments}
        onRemove={handleRemove}
      />

      {errorMessage && <div className="text-red-500 text-sm mb-6 text-center">{errorMessage}</div>}

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'لطفا منتظر بمانید...' : 'درخواست بررسی اولیه'}
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
