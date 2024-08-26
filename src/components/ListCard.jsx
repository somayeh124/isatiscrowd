/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { GiEmptyHourglass } from "react-icons/gi";
import { getCookie } from 'src/api/cookie';
import { FaCheckCircle, FaPlus } from 'react-icons/fa';     

import PropTypes from 'prop-types';

const CardList = ({ setCardSelected, handleNext }) => {
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
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    if (access) {
      fetchCards();
    }
  }, [access]);

  const handleCardClick = (id) => {
    setCardSelected(id);
    handleNext();
  };

  const handleNewCardClick = () => {
    setCardSelected(null);
    handleNext();
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`${OnRun}/api/cart/detail/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
      });

      // حذف کارت از لیست
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">لیست کارت‌ها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* کارت جدید به عنوان اولین کارت */}
        <div
          className="p-4 gap-8 shadow rounded-lg cursor-pointer hover:shadow-lg transition flex items-center justify-center"
          onClick={handleNewCardClick} // تغییر داده شد به handleNewCardClick
        >
          <FaPlus className="text-2xl mr-2" />
          <h2 className="text-xl font-bold">کارت جدید</h2>
        </div>

        {/* لیست کارت‌ها */}
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="p-4 bg-white shadow rounded-lg transition flex flex-col justify-between relative"
            >
              <div
                className="cursor-pointer hover:shadow-lg"
                onClick={() => handleCardClick(card.id)}
              >
                <h2 className="text-xl font-bold mb-2">{card.company_name}</h2>
                <p className="flex items-center">
                  {card.status === 'waiting' ? (
                    <GiEmptyHourglass className="text-yellow-500 mr-2" />
                  ) : (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  )}
                  وضعیت: {card.status === 'waiting' ? 'در انتظار' : 'مشخص شده'}
                </p>
              </div>

              {/* دکمه حذف */}
              <div className='flex'>
                <button
                  className="mt-2  bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  حذف
                </button>
                <button
                  className="mt-2  bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  ویرایش
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">هیچ کارتی موجود نیست</p>
        )}
      </div>
    </div>
  );
};

export default CardList;

CardList.propTypes = {
  setCardSelected: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
