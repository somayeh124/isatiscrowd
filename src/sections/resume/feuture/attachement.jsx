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

      if (response.status === 200 || response.status === 201) {
        toast.success('اطلاعات با موفقیت ارسال شد.');
      }
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error);
      toast.error('خطا در ارسال اطلاعات.');
    }
  };

  useEffect(() => {
    fetchManagerData(); 
  }, []);

  return (
    <>
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
        <button onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          ارسال
        </button>
      </div>
    </>
  );
};

Attachement.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Attachement;
