/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import FileSharehold from './fildesharehold';


const Step5 = ({ cardSelected }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchMessage', cardSelected],
    queryFn: () => fetchManager(cardSelected),
  });
  
  console.log("sharehold")
  const fetchManager = async (cardSelected) => {
    const access = await getCookie('access');
    if (cardSelected) {
      const response = await axios.get(`${OnRun}/api/shareholder/${cardSelected}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setField(response.data.data)
      return response.data;
    }
    return null;
  };
  const singleFile = {
    name: '',
    national_code: '',
    national_id: '',

  };

  const [field, setField] = useState([singleFile]);
  const [message, setMessage] = useState(''); 

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

  const handlePost = async () => {
    const access = await getCookie('access');

    try {
      const response = await axios.post(`${OnRun}/api/shareholder/${cardSelected}/`, { managers:field }, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("res",response.data);
      setMessage('اطلاعات با موفقیت ارسال شد!'); 
    } catch (error) {
      console.error('خطا :', error);
      setMessage('خطا در ارسال اطلاعات.'); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center self-center">
      {field.map((item, index) => (
        <>
          <FileSharehold index={index} field={field} setField={setField} />
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
        <button onClick={handlePost} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          ارسال
        </button>
      </div>
      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}  
    </div>
  );
};

export default Step5;
