/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { OnRun } from 'src/api/OnRun';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1, createCart, updateCart } from 'src/api/step1';
import { Message } from './massage';

export default function Form({ cardSelected, handleNext }) {
  const { data, error, isLoading, isPending, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cardSelected],
    queryFn: () => getStep1(cardSelected),
  });

  const mutation = useMutation({ mutationFn: () => createCart(localData, handleNext) });
  const mutationUpdate = useMutation({
    mutationFn: () => updateCart(localData, handleNext, cardSelected),
  });

  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {
    if (isSuccess && data) {
      setLocalData(data.data.cart);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.warning(error);
    }
  }, [isError]);

  const companyTypes = [
    { type: '8', title: ' سهامی خاص' },
    { type: '1', title: 'سهامی عام ' },
    { type: '3', title: 'تضامنی' },
    { type: '2', title: 'با مسئولیت محدود' },
    { type: '4', title: 'مختلط(سهامی عام و سهامی خاص) ' },
    { type: '6', title: ' تعاونی' },
    { type: '7', title: ' دانش بنیان ' },
    { type: '5', title: ' نسبی  ' },
  ];

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const cleanNumber = (value) => String(value).replace(/,/g, '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = cleanNumber(value);
    setLocalData({ ...localData, [name]: cleanedValue });
  };

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const handleCompanyNameKeyDown = (e) => {
    if (!/^[A-Za-z\u0600-\u06FF\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleNumberInput = (e) => {
    if (
      !/^[0-9]*$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardSelected) {
      mutation.mutateAsync();
    } else {
      mutationUpdate.mutateAsync();
    }
    console.log('localData after fetching:', data.data.cart);
  };
  if (isLoading) {
    return <p>loading ....</p>;
  }
  if (isError) {
    return <p>error ....</p>;
  }
  if (!data) {
    return <p>data ....</p>;
  }
  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-8 mt-8 bg-white rounded-lg shadow-lg"
    >
      <div className="bg-gray-50 rounded-md mb-10 mt-6">
        <Message cardSelected={cardSelected} />
      </div>
      <ToastContainer />
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">اطلاعات شرکت</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2 ">نام شرکت:</label>
          <input
            type="text"
            name="company_name"
            value={localData.company_name}
            disabled={localData.Lock_company_name}
            onChange={handleInputChange}
            onKeyDown={handleCompanyNameKeyDown}
            required
            className="shadow appearance-none disabled:bg-gray-200  border rounded w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">نوع شرکت:</label>
          <select
            name="company_kind"
            value={localData.company_kind}
            disabled={localData.Lock_company_kind}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
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
            disabled={localData.Lock_nationalid}
            value={localData.nationalid}
            onChange={handleInputChange}
            onKeyDown={handleNumberInput}
            maxLength={14}
            className="shadow appearance-none border disabled:bg-gray-200 text-black rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">شماره ثبت:</label>
          <input
            type="text"
            name="registration_number"
            value={localData.registration_number}
            disabled={localData.Lock_registration_number}
            onChange={handleInputChange}
            onKeyDown={handleNumberInput}
            maxLength={12}
            className="shadow appearance-none border rounded w-full py-3 px-4 disabled:bg-gray-200 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            سرمایه ثبتی (ریال):
          </label>
          <input
            type="text"
            name="registered_capital"
            value={formatNumber(localData.registered_capital)}
            disabled={localData.Lock_registered_capital}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 disabled:bg-gray-200 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">تعداد کارکنان:</label>
          <input
            type="number"
            name="personnel"
            value={localData.personnel}
            disabled={localData.Lock_personnel}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 disabled:bg-gray-200 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block disabled:bg-gray-200 text-black text-sm font-medium mb-2">
            آدرس شرکت:
          </label>
          <input
            type="text"
            name="address"
            value={localData.address}
            disabled={localData.Lock_address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 disabled:bg-gray-200 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">ایمیل شرکت:</label>
          <input
            type="email"
            name="email"
            value={localData.email}
            disabled={localData.Lock_email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 disabled:bg-gray-200 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">موضوع فعالیت شرکت:</label>
          <input
            name="activity_industry"
            value={localData.activity_industry}
            disabled={localData.Lock_activity_industry}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 disabled:bg-gray-200 text-black leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>
      <div className="mt-8 w-1/2 flex flex-col justify-center items-center mx-auto">
        <label className="block disabled:bg-gray-200 text-black text-sm font-medium mb-4 text-center">
          میزان منابع درخواستی (ریال):
        </label>
        <input
          type="range"
          name="amount_of_request"
          min={10000000000}
          max={250000000000}
          step={10000000000}
          value={localData.amount_of_request}
          disabled={localData.Lock_amount_of_request}
          onChange={handleInputChange}
          className="w-full"
        />
        <span className="block text-gray-700 text-sm mt-4 text-center">
          {formatNumber(localData.amount_of_request)} ریال
        </span>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <label className="block text-gray-700 text-xl font-bold mb-8 mt-4 text-center">
          افزودن
        </label>
        <p className="text-xl text-red-600 mb-4"> حجم فایل می تواند 20 مگابایت باشد</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
            <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
              گزارشات و مستندات منتهی به سال 1402
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">صورت مالی:</label>
              {typeof localData.financial_report_lastyear === 'string' ? (
                <div className="flex gap-8">
                  <a
                    href={`${OnRun}/${localData.financial_report_lastyear}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    1402 صورت مالی فایل
                  </a>
                  <button
                    type="button"
                    className="text-red-400"
                    onClick={() => handleFileRemove('financial_report_lastyear')}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                <input
                  name="financial_report_lastyear"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, financial_report_lastyear: e.target.files[0] })
                  }
                  disabled={localData.Lock_financial_report_lastyear}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">حسابرسی گزارش:</label>
              {typeof localData.audit_report_lastyear === 'string' ? (
                  <div className="flex gap-8">
                  <a
                    href={
                      localData.Lock_financial_report_yearold
                        ? null
                        : `${OnRun}/${localData.financial_report_yearold}`
                    }
                    onClick={(e) => {
                      if (localData.Lock_financial_report_yearold) {
                        e.preventDefault(); 
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${
                      localData.Lock_financial_report_yearold
                        ? 'text-gray-400 '
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    فایل                     1402 گزارش حسابرسی

                    </a>
                  <button
                    type="button"
                    className="text-red-400 disabled:text-gray-200 "
                    onClick={() => handleFileRemove('financial_report_yearold')}
                    disabled={localData.Lock_financial_report_yearold}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                <input
                  name="audit_report_lastyear"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, audit_report_lastyear: e.target.files[0] })
                  }
                  disabled={localData.Lock_audit_report_lastyear}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">اظهارنامه:</label>
              {typeof localData.statement_lastyear === 'string' ? (
                <div className="flex gap-8">
                <a
                  href={
                    localData.Lock_financial_report_yearold
                      ? null
                      : `${OnRun}/${localData.financial_report_yearold}`
                  }
                  onClick={(e) => {
                    if (localData.Lock_financial_report_yearold) {
                      e.preventDefault(); 
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    localData.Lock_financial_report_yearold
                      ? 'text-gray-400 '
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                                     1401 فایل صورت مالی
                 </a>
                <button
                  type="button"
                  className="text-red-400 disabled:text-gray-200 "
                  onClick={() => handleFileRemove('financial_report_yearold')}
                  disabled={localData.Lock_financial_report_yearold}
                >
                  حذف
                </button>
              </div>
              ) : (
                <input
                  name="statement_lastyear"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, statement_lastyear: e.target.files[0] })
                  }
                  disabled={localData.Lock_statement_lastyear}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
            <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
              گزارشات و مستندات منتهی به سال 1401
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">صورت مالی:</label>
              {typeof localData.financial_report_yearold === 'string' ? (
               <div className="flex gap-8">
               <a
                 href={
                   localData.Lock_financial_report_yearold
                     ? null
                     : `${OnRun}/${localData.financial_report_yearold}`
                 }
                 onClick={(e) => {
                   if (localData.Lock_financial_report_yearold) {
                     e.preventDefault(); 
                   }
                 }}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`text-sm font-medium ${
                   localData.Lock_financial_report_yearold
                     ? 'text-gray-400 '
                     : 'text-blue-600 hover:text-blue-800'
                 }`}
               >
                                    1401 فایل صورت مالی
                                    </a>
               <button
                 type="button"
                 className="text-red-400 disabled:text-gray-200 "
                 onClick={() => handleFileRemove('financial_report_yearold')}
                 disabled={localData.Lock_financial_report_yearold}
               >
                 حذف
               </button>
             </div>
              ) : (
                <input
                  name="financial_report_yearold"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, financial_report_yearold: e.target.files[0] })
                  }
                  disabled={localData.Lock_financial_report_yearold}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">حسابرسی گزارش:</label>
              {typeof localData.audit_report_yearold === 'string' ? (
                <div className="flex gap-8">
                <a
                  href={
                    localData.Lock_audit_report_yearold
                      ? null
                      : `${OnRun}/${localData.audit_report_yearold}`
                  }
                  onClick={(e) => {
                    if (localData.Lock_audit_report_yearold) {
                      e.preventDefault(); 
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    localData.Lock_audit_report_yearold
                      ? 'text-gray-400 '
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
            1401 فایل گزارش حسابرسی

               </a>
                <button
                  type="button"
                  className="text-red-400 disabled:text-gray-200 "
                  onClick={() => handleFileRemove('audit_report_yearold')}
                  disabled={localData.Lock_audit_report_yearold}
                >
                  حذف
                </button>
              </div>
              ) : (
                <input
                  name="audit_report_yearold"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, audit_report_yearold: e.target.files[0] })
                  }
                  disabled={localData.Lock_audit_report_yearold}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">اظهارنامه:</label>
              {typeof localData.statement_yearold === 'string' ? (
                <div className="flex gap-8">
                <a
                  href={
                    localData.Lock_statement_yearold
                      ? null
                      : `${OnRun}/${localData.statement_yearold}`
                  }
                  onClick={(e) => {
                    if (localData.Lock_statement_yearold) {
                      e.preventDefault(); 
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    localData.Lock_statement_yearold
                      ? 'text-gray-400 '
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  1401 فایل اظهارنامه
                  </a>
                <button
                  type="button"
                  className="text-red-400 disabled:text-gray-200 "
                  onClick={() => handleFileRemove('statement_yearold')}
                  disabled={localData.Lock_statement_yearold}
                >
                  حذف
                </button>
              </div>
              ) : (
                <input
                  name="statement_yearold"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, statement_yearold: e.target.files[0] })
                  }
                  disabled={localData.Lock_statement_yearold}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
            <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
              گزارشات و مستندات به روز
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">تراز6ستونی:</label>
              {typeof localData.alignment_6columns_thisyear === 'string' ? (
                <div className="flex gap-8">
                  <a
                    href={
                      localData.Lock_alignment_6columns_thisyear
                        ? null
                        : `${OnRun}/${localData.alignment_6columns_thisyear}`
                    }
                    onClick={(e) => {
                      if (localData.Lock_alignment_6columns_thisyear) {
                        e.preventDefault(); 
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${
                      localData.Lock_alignment_6columns_thisyear
                        ? 'text-gray-400 '
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    فایل
                  </a>
                  <button
                    type="button"
                    className="text-red-400 disabled:text-gray-200 "
                    onClick={() => handleFileRemove('alignment_6columns_thisyear')}
                    disabled={localData.Lock_alignment_6columns_thisyear}
                  >
                    حذف
                  </button>
                </div>
              ) : (
                <input
                  name="alignment_6columns_thisyear"
                  type="file"
                  onChange={(e) =>
                    setLocalData({ ...localData, alignment_6columns_thisyear: e.target.files[0] })
                  }
                  disabled={localData.Lock_alignment_6columns_thisyear}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'در حال بارگذاری...' : 'درخواست بررسی اولیه'}
        </button>
      </div>
    </form>
  );
}
