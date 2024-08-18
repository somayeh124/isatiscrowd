import React from 'react';

const data = [{ code: "123565" }];         

const TrackingCard = () => (
  <div className="max-w-sm mx-auto bg-white shadow-lg mt-20  rounded-lg overflow-hidden border-t-4">
    <div className="bg-blue-900 ">
      <h2 className="text-white text-lg text-center font-bold">کد پیگیری شما</h2>
    </div>
    <div className="p-4">
      <ul className="list-disc list-inside">
        <li className="text-xl font-semibold text-gray-800 text-center">{data[0].code}</li>
      </ul>
    </div>
  </div>
);

export default TrackingCard;
