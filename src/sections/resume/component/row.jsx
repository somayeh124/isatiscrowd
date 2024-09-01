/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';

const Row = ({ index, list, item, setList }) => {
  const updateFile = (file, national_code) => {
    const updatedList = list.map((i) =>
      i.national_code === national_code ? { ...i, file } : i
    );
    setList(updatedList);
  };

  const handleFileRemove = (national_code) => {
    const updatedList = list.map((i) =>
      i.national_code === national_code ? { ...i, file: '' } : i
    );
    setList(updatedList);
  };

  return (
    <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <div className="flex items-center gap-4">
        <label className="text-gray-900 font-semibold">اسم:</label>
        <div className="text-gray-700 text-sm font-medium">{item.name}</div>
      </div>
      <div className="flex items-center gap-4">
        <label className="text-gray-900 font-semibold">کد ملی:</label>
        <div className="text-gray-700 text-sm font-medium">{item.national_code}</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="block text-gray-700 text-sm font-medium mb-2">فایل:</label>
        {typeof item.file === 'string' && item.file ? (
          <div className="flex gap-8">
            <a
              href={`${OnRun}/${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              مشاهده فایل
            </a>
            <button
              type="button"
              className="text-red-400 disabled:text-gray-200"
              onClick={() => handleFileRemove(item.national_code)}
              disabled={item.lock}
            >
              حذف
            </button>
          </div>
        ) : (
          <input
            name="file_upload"
            type="file"
            onChange={(e) =>
              updateFile(e.target.files[0], item.national_code)
            }
            disabled={item.lock}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
          />
        )}
      </div>
    </div>
  );
};

Row.propTypes = {
  index: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
};

export default Row;
