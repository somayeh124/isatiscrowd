/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
// import { getCookie } from 'src/api/cookie';
// import axios from 'axios';
// import { OnRun } from 'src/api/OnRun';
// import { useQuery } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa';
import Fildemnager from './fildemaneger';


// eslint-disable-next-line react/prop-types
// const fetchManager = async (cardSelected) => {
//     const access = await getCookie('access');
//     if (cardSelected) {
//       const response = await axios.get(`${OnRun}/api/manager/${cardSelected}/`, {
//           headers: {
//             Authorization: `Bearer ${access}`,
//           },
//         });
//         return response.data.message;
//     }
//     return null
//   };

const Step3 = ({ cardSelected }) => {
    // const { data, error, isLoading } = useQuery({
    //     queryKey: ['fetchMessage', cardSelected],
    //     queryFn: () => fetchManager(cardSelected),
        
    //   });

    const singleFile = {
        name:'',
        position:'',
        national_code:'',
        national_id:'',
        phone:'',
        representative:'',
        is_legal:false,
        is_obliged:false
    }
  const [field, setField] = useState([
    singleFile
  ]);

  const handleAdd = () => {
    const perve = [...field];
    perve.push(singleFile);

    setField(perve);
  };
  return (
    <div className='flex flex-col justify-center items-center self-center'>
      {field.map((item, index) => (
        <Fildemnager key={index} data={item} setField={setField}/>
      ))}
       <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center' }}>
        <FaPlus style={{ marginLeft: '5px' }} />
        افزودن
      </button>
    </div>
  );
}

export default Step3;
