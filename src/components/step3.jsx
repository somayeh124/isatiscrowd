/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Divider } from '@mui/material';
import Fildemnager from './fildemaneger';

const Step3 = ({ cardSelected }) => {
  const singleFile = {
    name: '',
    position: '',
    national_code: '',
    national_id: '',
    phone: '',
    representative: '',
    is_legal: false,
    is_obliged: false,
  };
  
  const [field, setField] = useState([singleFile]);
  
  console.log(field);
  

  const handleAdd = () => {
    const perve = [...field];
    perve.push(singleFile);
    setField(perve);
  };

  const handleRemove = () => {
    if (field.length > 1) {
      const perve = [...field];
      perve.pop(singleFile); 
      setField(perve);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center self-center">
      {field.map((item, index) => (
        <>
          <Fildemnager index={index} field={field} setField={setField} />
          <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
        </>
      ))}
      <div className='flex gap-8'>
        <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <FaPlus style={{ marginLeft: '5px' }} />
          افزودن
        </button>
        <button onClick={handleRemove} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <FaMinus style={{ marginRight: '5px' }} />
          حذف
        </button>
      </div>
    </div>
  );
};

export default Step3;
