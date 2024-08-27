/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1 ,createCart} from 'src/api/step1';


export default function Form({ cardSelected, handleNext }) {

  const { data, error, isLoading, isError,isSuccess} = useQuery(
    {
      queryKey: ['cartDetail', cardSelected],
      queryFn: () => getStep1(cardSelected)
    }
  );

  
  
  const mutation = useMutation({mutationFn:createCart});


  const [localData, setLocalData] = useState(() => data || {});
  
  useEffect(() => {

    if (isSuccess && data) {
      setLocalData(data.data.cart);
      setAttachments(data.data.cart)
    }
  }, [isSuccess, data]);
  




  useEffect(()=>{
    if (isError) {
      toast.warning(error)
    }
  },[isError])


  const access = getCookie('access');


  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attachments, setAttachments] = useState({});

const handleFileChange = (type, event) => {
  const file = event.target.files[0];
  if (file) {
    setAttachments((prev) => ({ ...prev, [type]: file }));
  }
};

const handleRemove = (type) => {
  setAttachments((prev) => {
    const updated = { ...prev };
    delete updated[type];
    return updated;
  });
};


  const companyTypes = [
    { type: 'special stock', title: 'خاص سهامی' },
    { type: 'common stock', title: 'عام سهامی' },
  ];

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const cleanNumber = (value) => String(value).replace(/,/g, '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = cleanNumber(value);
    setLocalData({ ...localData, [name]: cleanedValue });
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutateAsync(localData)
    // setLoading(true);

    // if (!localData.company_name) {
    //   setErrorMessage('لطفاً فیلد را وارد کنید.');
    //   setLoading(false);
    //   return;
    // }

    // if (!validateCompanyName(localData.company_name)) {
    //   setErrorMessage('نام شرکت باید فقط شامل حروف باشد.');
    //   setLoading(false);
    //   return;
    // }

    // setErrorMessage('');

    // const dataToPost = new FormData();
    // dataToPost.append('company_name', localData.company_name);
    // dataToPost.append('activity_industry', localData.activity_industry || '');
    // dataToPost.append('registration_number', localData.registration_number || '');
    // dataToPost.append('nationalid', localData.nationalid || '');
    // dataToPost.append('registered_capital', localData.registered_capital || '');
    // dataToPost.append('personnel', localData.personnel || '');
    // dataToPost.append('company_kind', localData.company_kind || '');
    // dataToPost.append('amount_of_request', localData.amount_of_request || 10000000000);
    // dataToPost.append('status', localData.status || '');
    // dataToPost.append('address', localData.company_address || '');
    // dataToPost.append('email', localData.company_email || '');

 

    //   const response = await axios.post(`${OnRun}/api/cart/`, dataToPost, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${access}`,
    //     },
    //   });

    //   if (response.status === 200 || response.status === 201) {
    //     toast.success('اطلاعات ارسال شد');

    //     setTimeout(() => {
    //       handleNext();
    //     }, 3000);


       
    //   } 
    
  };
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
            <div className="flex gap-4">
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
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                فایل
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return(
      <p>loading ....</p>
    )
  }
  if (isError) {
    
    return(
      <p>error ....</p>
    )
  }
  if (!data) {
    return(
      <p>data ....</p>
    )
  }
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
            value={localData.company_name}
            disabled={localData.Lock_company_name}
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
            value={localData.company_kind}
            disabled={localData.Lock_company_kind}
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
            disabled={localData.Lock_nationalid}
            value={localData.nationalid}
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
            value={localData.registration_number}
            disabled={localData.Lock_registration_number}
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
            value={formatNumber(localData.registered_capital)}
            disabled={localData.Lock_registered_capital}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
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
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">آدرس شرکت:</label>
          <input
            type="text"
            name="company_address"
            value={localData.company_address}
            disabled={localData.Lock_company_address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">ایمیل شرکت:</label>
          <input
            type="email"
            name="company_email"
            value={localData.company_email}
            disabled={localData.Lock_company_email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">موضوع فعالیت شرکت:</label>
          <input
            name="activity_industry"
            value={localData.activity_industry}
            disabled={localData.Lock_activity_industry}
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
      <label className="block text-gray-700 text-xl font-bold mb-8 mt-4 text-center">افزودن</label>
      <p className='text-xl text-red-600 mb-4'> حجم فایل می تواند 20 مگابایت باشد</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
          <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
          گزارشات و مستندات منتهی به سال 1402
          </h2>
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2"> صورت مالی :</label>
          <input
            name="financial_report_lastyear"
            type='file'
            onChange={(e) => setLocalData({ ...localData, financial_report_lastyear: e.target.files[0] })}
            disabled={localData.Lock_financial_report_lastyear}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">  حسابرسی گزارش:</label>
          <input
            name="audit_report_lastyear"
            type='file'
            onChange={(e) => setLocalData({ ...localData, audit_report_lastyear: e.target.files[0] })}
            disabled={localData.Lock_audit_report_lastyear}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">   اظهارنامه:</label>
          <input
            name="statement_lastyear"
            type='file'
            onChange={(e) => setLocalData({ ...localData, statement_lastyear: e.target.files[0] })}
            disabled={localData.Lock_statement_lastyear}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
          <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
          گزارشات و مستندات منتهی به سال 1401
          </h2>
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2"> صورت مالی :</label>
          <input
            name="financial_report_yearold"
            type='file'
            onChange={(e) => setLocalData({ ...localData, financial_report_yearold: e.target.files[0] })}
            disabled={localData.Lock_financial_report_yearold}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">  حسابرسی گزارش:</label>
          <input
            name="audit_report_yearold"
            type='file'
            onChange={(e) => setLocalData({ ...localData, audit_report_yearold: e.target.files[0] })}
            disabled={localData.Lock_audit_report_yearold}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">   اظهارنامه:</label>
          <input
            name="statement_yearold"
            type='file'
            onChange={(e) => setLocalData({ ...localData, statement_yearold: e.target.files[0] })}
            disabled={localData.Lock_statement_yearold}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
         
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
          <h2 className="flex flex-col text-center mt-2 text-gray-700 text-xl font-bold">
          گزارشات و مستندات به روز
          </h2>
          <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">تراز6ستونی  :</label>
          <input
          type='file'
          name="alignment_6columns_thisyear"
          disabled={localData.Lock_alignment_6columns_thisyear}
          onChange={(e) => setLocalData({ ...localData, alignment_6columns_thisyear: e.target.files[0] })}
        //  value={localData.alignment_6columns_thisyear}
         className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
         </div>
         
        </div>
    </div>



      {errorMessage && <div className="text-red-500 text-sm mb-6 text-center">{errorMessage}</div>}

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'لطفا منتظر بمانید...' : 'درخواست بررسی اولیه'}
        </button>
      </div>
    </form>
  );
}
