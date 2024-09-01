/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from '../component/row';
import { toast } from 'react-toastify';
import { getCookie } from 'src/api/cookie';
import axios from 'axios';
import { Divider } from '@mui/material';
import { OnRun } from 'src/api/OnRun';

const Attachement = ({ id }) => {
  const [resumeList, setResumeList] = useState([]);
  const [message, setMessage] = useState('');
  const fetchManagerData = async () => {
    try {
      const access = await getCookie('access');
      const response = await axios.get(`${OnRun}/api/resume/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.data && response.data.manager) {
        setResumeList(response.data.manager);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
      toast.error('خطا در دریافت اطلاعات.');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (let index = 0; index < resumeList.length; index += 1) {
        const element = resumeList[index];
        console.log('Data:', element);
        if (element.file) {
          formData.append(element.national_code, element.file);
        }
      }

      console.log(`/api/resume/${id}/`);
      const access = await getCookie('access');
      const response = await axios.post(`${OnRun}/api/resume/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
        maxBodyLength: Infinity,
      });

      setMessage('اطلاعات با موفقیت ارسال شد!');
      
    }catch (error) {
      console.error('خطا :', error);
      setMessage('خطا در ارسال اطلاعات.');
    }
  };

  useEffect(() => {
    fetchManagerData();
  }, []);

  return (
    <div>
       <div className='flex flex-col justify-center items-center self-center'>
        <button
          onClick={handleSubmit}
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
        </button></div>
      {resumeList && resumeList.map((item, index) => (
        <div key={index}>
          <Row
            index={index}
            list={resumeList}
            item={item}
            setList={setResumeList}
          />
          <Divider style={{ backgroundColor: 'gray', width: '100%', marginTop: '20px' }} />
        </div>
      ))}
      <div>
        {message && (
        <p style={{ marginTop: '20px', color: message.includes('خطا') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      </div>
    </div>
  );
};

Attachement.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Attachement;
