/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Form({ cardSelected, handleNext }) {
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

  const [attachments, setAttachments] = useState([
    { type: 'financial_report_lastyear', label: 'صورت مالی 1401', file: null, url: null, disabled: formData.Lock_financial_report_lastyear },
    { type: 'audit_report_lastyear', label: 'گزارش حسابرسی 1401', file: null, url: null, disabled: formData.Lock_audit_report_lastyear },
    { type: 'statement_lastyear', label: 'اظهارنامه 1401', file: null, url: null, disabled: formData.Lock_statement_lastyear },
    { type: 'financial_report_yearold', label: 'صورت مالی 1402', file: null, url: null, disabled: formData.Lock_financial_report_yearold },
    { type: 'audit_report_yearold', label: 'گزارش حسابرسی 1402', file: null, url: null, disabled: formData.Lock_audit_report_yearold },
    { type: 'statement_yearold', label: 'اظهارنامه 1402', file: null, url: null, disabled: formData.statement_yearold },
    { type: 'alignment_6columns_thisyear', label: 'تراز 6ستونی به روز', file: null, url: null, disabled: formData.Lock_alignment_6columns_thisyear },
  ]);

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

  const validateCompanyName = (name) => {
    const lettersOnly = /^[A-Za-z\u0600-\u06FF\s]+$/;
    return lettersOnly.test(name);
  };

  const handleCompanyNameKeyDown = (e) => {
    if (!/^[A-Za-z\u0600-\u06FF\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setAttachments((prevAttachments) =>
        prevAttachments.map((attachment) =>
          attachment.type === type ? { ...attachment, file, url } : attachment
        )
      );
    }
  };

  const handleRemove = (type) => {
    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) =>
        attachment.type === type ? { ...attachment, file: null, url: null } : attachment
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.company_name) {
      setErrorMessage('لطفاً فیلد را وارد کنید.');
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

    attachments.forEach((attachment) => {
      if (attachment.file) {
        dataToPost.append(attachment.type, attachment.file);
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
        toast.success('اطلاعات ارسال شد');

        setTimeout(() => {
          handleNext();
        }, 3000);

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

        setAttachments(attachments.map((attachment) => ({ ...attachment, file: null, url: null })));
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
          const cardData = response.data.cart;
          setFormData(cardData);
          if (cardData.attachments) {
            setAttachments(cardData.attachments.map(att => ({ ...att, file: null, url: null })));
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">نام شرکت:</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            onKeyDown={handleCompanyNameKeyDown}
            disabled={formData.Lock_company_name}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">نوع شرکت:</label>
          <select
            name="company_kind"
            value={formData.company_kind}
            disabled={formData.Lock_company_kind}
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
            disabled={formData.Lock_nationalid}
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
            value={NumberFormat(formData.registration_number)}
            disabled={formData.Lock_registration_number}
            onChange={handleInputChange}
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
            disabled={formData.Lock_registered_capital}
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
            disabled={formData.Lock_personnel}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">آدرس شرکت:</label>
          <input
            type="text"
            name="company_address"
            disabled={formData.Lock_address}
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
            disabled={formData.Lock_email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">موضوع فعالیت شرکت:</label>
          <input
            name="activity_industry"
            disabled={formData.Lock_activity_industry}
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
          disabled={formData.Lock_amount_of_request}
          value={formData.amount_of_request}
          onChange={handleInputChange}
          className="w-full"
        />
        <span className="block text-gray-700 text-sm mt-4 text-center">
          {formatNumber(formData.amount_of_request)} ریال
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <label className="block text-gray-700 text-xl font-bold mb-8 mt-4 text-center">افزودن پیوست‌ها</label>
        <p className='text-xl text-red-600 mb-4'>حجم فایل می تواند 20 مگابایت باشد</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {attachments.map((attachment) => (
            <div key={attachment.type} className="bg-white shadow-lg rounded-lg mt-4 p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">{attachment.label}</h3>
              <div className="mb-4">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(attachment.type, e)}
                  className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200 mt-2"
                />
              </div>
              {attachment.file && (
                <div className="mt-4 space-y-2">
                  <div className="py-2 px-4 bg-gray-50 rounded-md shadow-sm">
                    <span className="text-gray-700 block mb-2">{attachment.file.name}</span>
                    <div className="flex gap-2">
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        فایل
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemove(attachment.type)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {errorMessage && <div className="text-red-500 text-sm mb-6 text-center">{errorMessage}</div>}

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'لطفا منتظر بمانید...' : 'درخواست بررسی اولیه'}
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  handleNext: PropTypes.func,
};
