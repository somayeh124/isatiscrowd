/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ index, list, item, setList }) => {
  const updateFile = (file, national_code) => {
    const listCloned = list.filter(j => national_code!==j.national_code);
    listCloned.push({national_code,file });
    setList(listCloned);
  };
console.log(list);

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
        <label className="text-gray-900 font-semibold  text-sm mb-2 sm:mb-0">فایل پیوست:</label>
        <input
          name="statement_yearold"
          type="file"
          onChange={(e) => updateFile(e.target.files[0], item.national_code)}
          className="shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
        />
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
