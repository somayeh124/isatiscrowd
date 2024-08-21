/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

const Profile = () => {
  const access = getCookie('access');

  const [profileData, setProfileData] = useState(null);

  const getProfile = () => {
    axios
      .get(`${OnRun}/api/information/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  };

  useEffect(getProfile, [access]);

  return profileData ? (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">پروفایل کاربر</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileField label="نام" value={profileData.acc.private_person[0].firstName} />
        <ProfileField label="نام خانوادگی" value={profileData.acc.private_person[0].lastName} />
        <ProfileField label="نام پدر" value={profileData.acc.private_person[0].fatherName} />
        <ProfileField label="کد ملی" value={profileData.acc.private_person[0].shNumber} />
        <ProfileField label="شماره شبا" value={profileData.acc.accounts[0].sheba} />
        <ProfileField label="نام شعبه بانک" value={profileData.acc.accounts[0].bank} />
        <ProfileField label="شغل" value={profileData.acc.job_info[0].job} />
        <ProfileField label="جنسیت" value={profileData.acc.private_person[0].gender === 'Male' ? 'مرد' : profileData.acc.private_person[0].gender === 'Female' ? 'زن' : ''} />
        {/* <ProfileField label="محل تولد" value={profileData.acc.private_person[0].placeOfBirth} /> */}
        <ProfileField label="شماره موبایل" value={profileData.acc.mobile} />

        <div className="col-span-1 md:col-span-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">آدرس</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProfileField label="استان" value={profileData.acc.addresses[0].province} />
            <ProfileField label="شهر" value={profileData.acc.addresses[0].city} />
            <ProfileField label="خیابان " value={profileData.acc.addresses[0].remnantAddress} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center mt-10"> لطفا صبر کنید</div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-2">{label}:</label>
    <input
      type="text"
      value={value}
      readOnly
      className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
    />
  </div>
);

export default Profile;
