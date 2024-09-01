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
import Fildemnager from './fildemaneger';

const Step3 = ({ cardSelected }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchMessage', cardSelected],
    queryFn: () => fetchManager(cardSelected),
  });

  const fetchManager = async (cardSelected) => {
    const access = await getCookie('access');
    if (cardSelected) {
      const response = await axios.get(`${OnRun}/api/manager/${cardSelected}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.data.data && response.data.data.length > 0) {
        setField(response.data.data);
      }
      return response.data;
    }
    return null;
  };
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
      const response = await axios.post(
        `${OnRun}/api/manager/${cardSelected}/`,
        { managers: field },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('اطلاعات با موفقیت ارسال شد!');
    } catch (error) {
      console.error('خطا :', error);
      setMessage('خطا در ارسال اطلاعات.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center self-center">
      <div className="flex gap-8 mt-4">
        <button
          onClick={handleAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          <FaPlus style={{ marginLeft: '5px' }} />
          افزودن
        </button>
        <button
          onClick={handlePost}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          ارسال
        </button>
      </div>
      {field.map((item, index) => (
        <div className='flex'>
        <div>
        <div className='mt-8'>
          <button
          onClick={handleRemove}
          className='bg-red-500'
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 10px',
            color: 'white',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          حذف
        </button>
          </div>
            <Fildemnager index={index} field={field} setField={setField} />
            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />        
          </div>
        </div>
      ))}

      {message && (
        <p style={{ marginTop: '20px', color: message.includes('خطا') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Step3;
