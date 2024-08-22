/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

import PropTypes from 'prop-types';



const CardList = ({setCardSelected, handleNext}) => {
  const [cards, setCards] = useState([]);
  const access = getCookie('access');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${OnRun}/api/cart/`, {
          headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${access}`,
          },
        });
        
        if (response.data.cart) {
          setCards(response.data.cart);
        }
        console.log(response.data.cart);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
  
    if (access) {
      fetchCards();
    }
  }, [access]);

  const handleCardClick = (id) => {
    setCardSelected(id)
    handleNext()
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">لیست کارت‌ها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={card.id}
              className="p-4 bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => handleCardClick(card.id)}
            >
              <h2 className="text-xl font-bold">{card.company_name}</h2>
              <p>{card.company_name || ''}</p>
              <p>وضعیت: {card.status === 'waiting' ? 'در انتظار' : 'مشخص شده'}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">هیچ کارتی موجود نیست</p>
        )}
        <div className="p-4 bg-blue-200 text-white shadow rounded-lg cursor-pointer hover:shadow-lg transition">
          <h2 className="text-xl font-bold">کارت جدید</h2>
        </div>
      </div>
    </div>
  );
};

export default CardList;

CardList.propTypes = {
  setCardSelected: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
