/* eslint-disable react/prop-types */

import React from 'react';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import { useQuery } from '@tanstack/react-query';

const fetchMessage = async (cardSelected) => {
  const access = await getCookie('access');
  if (cardSelected) {
    const response = await axios.get(`${OnRun}/api/message/${cardSelected}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return response.data.message;
  }
  return null
};

export const Message = ({ cardSelected }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchMessage', cardSelected],
    queryFn: () => fetchMessage(cardSelected),
    
  });
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطایی رخ داده است</p>;

  if (!data || !cardSelected) {
    return null
  }
  return (
    <div>
      <p>متن پیام:<p className='text-black text-lg'>{data?.message}</p> </p>
    </div>
  );
};

export default Message;
