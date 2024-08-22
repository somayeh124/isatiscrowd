/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { OnRun } from "src/api/OnRun";
import { getCookie } from "src/api/cookie";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const access = getCookie('access');
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${OnRun}/api/cart/`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access}`,
          },
        });  
        
        if (response.data.message) {
          setCards(response.data.cart);
        }
        console.log(response.data.cart);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
  
    fetchCards();
  }, []);

  // const handleCardClick = (id) => {
  //   navigate(`api/cart/detail/${id}`);
  // };

  // const handleNewCard = () => {
  //   navigate("/api/cart/");
  // };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">لیست کارت‌ها</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-4 bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition"
            // onClick={() => handleCardClick(card.id)}
          >
            <h2 className="text-xl font-bold">{card.company_name}</h2>
            <p>{card.company_name || ""}</p>
            <p>وضعیت: {card.status === "waiting" ? "در انتظار" : "مشخص شده"}</p>
          </div>
        ))}
        <div
          className="p-4 bg-blue-200 text-white shadow rounded-lg cursor-pointer hover:shadow-lg transition"
          // onClick={handleNewCard}
        >
          <h2 className="text-xl font-bold">کارت جدید</h2>
        </div>
      </div>
    </div>
  );
};

export default CardList;
