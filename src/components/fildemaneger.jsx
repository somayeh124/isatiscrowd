/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

const Fildemnager = () => {
  const types = [
    { type: false, title: 'حقیقی' },
    { type: true, title: 'حقوقی' },
  ];
  const obliged = [
    { type: true, title: 'بله' },
    { type: false, title: 'خیر' },
  ];

  return (
    <div>
      <form className='mt-8 max-w-5xl'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 ">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">نام و نام خانوادگی :</label>
            <input
              type="text"
              name="name"
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">نوع :</label>
            <select
              name="is_legal"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            >
              
              {types.map((typeObj, index) => (
                <option key={index} value={typeObj.type}>
                  {typeObj.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">موظف :</label>
            <select
              name="is_obliged"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            >
              
              {obliged.map((typeObj, index) => (
                <option key={index} value={typeObj.type}>
                  {typeObj.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">سمت :</label>
            <input
              type="text"
              name="position"
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کدملی :</label>
            <input
              type="text"
              name="national_code"
              maxLength={10}
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کد شناسه:</label>
            <input
              type="text"
              required
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              name="national_id"
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">شماره تلفن :</label>
            <input
              type="text"
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              required
              maxLength={11}
              name="phone"
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">نماینده :</label>
            <input
              type="text"
              required
              name="representative"
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Fildemnager;
