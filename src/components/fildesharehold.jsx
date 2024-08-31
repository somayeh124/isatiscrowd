/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

const FileSharehold = () => {
console.log("1111")
  // const handleChange = (input, value)=>{
  //   const pervRow = field[index]
  //   const newRow = {...pervRow, [input]:value}
  //   const updateField = [...field]
  //   updateField[index] = newRow
  //   setField(updateField)
  // }
  

  return (
    <div>
      <form className='mt-8 max-w-5xl'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 ">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">نام و نام خانوادگی :</label>
            <input
              type="text"
              name="name"
              // value={field[index].name}
              // onChange={(e)=>handleChange('name',e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کدملی :</label>
            <input
              type="text"
              name="national_code"
              // value={field[index].national_code}
              // onChange={(e)=>handleChange('national_code',e.target.value)}
              maxLength={10}
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">درصد سهام :</label>
            <input
              type="text"
              required
              // value={field[index].percent}
              // onChange={(e)=>handleChange('percent',e.target.value)}
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              name="percent"
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">کد شناسه:</label>
            <input
              type="text"
              required
              // value={field[index].national_id}
              // onChange={(e)=>handleChange('national_id',e.target.value)}
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              name="national_id"
              className="shadow appearance-none border rounded w-full py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

   </div>
      </form>
    </div>
  );
};

export default FileSharehold;
