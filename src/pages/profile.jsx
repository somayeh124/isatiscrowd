/* eslint-disable react/button-has-type */
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
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
     <div className='flex justify-between'>
     <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">پروفایل کاربر</h1>
      <button className='bg-[#662f90] p-4 text-white rounded-md'> به روزرسانی اطلاعات</button>

     </div>
      <div className=" gap-6"><div className="col-span-1 md:col-span-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">اطلاعات فردی</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          <ProfileField label="نام" value={profileData?.acc?.private_person?.[0]?.firstName || ''} />
<ProfileField label="نام خانوادگی" value={profileData?.acc?.private_person?.[0]?.lastName || ''} />
<ProfileField label="نام پدر" value={profileData?.acc?.private_person?.[0]?.fatherName || ''} />
<ProfileField label="جنسیت" value={profileData?.acc?.private_person?.[0]?.gender === 'Male' ? 'مرد' : profileData?.acc?.private_person?.[0]?.gender === 'Female' ? 'زن' : ''} />
<ProfileField label="کد ملی" value={profileData?.acc?.private_person?.[0]?.shNumber || ''} />
<ProfileField label="سریال شناسنامه" value={profileData?.acc?.private_person?.[0]?.serial || ''} />
<ProfileField label="محل تولد " value={profileData?.acc?.private_person?.[0]?.placeOfBirth || ''} />
<ProfileField label="محل صدور " value={profileData?.acc?.private_person?.[0]?.placeOfIssue || ''} />
<ProfileField label=" ایمیل" value={profileData?.acc?.addresses?.[0]?.email || ''} />
<ProfileField label=" فکس" value={profileData?.acc?.addresses?.[0]?.fax || ''} />
<ProfileField label="شماره موبایل" value={profileData?.acc?.mobile || ''} />

          </div>
        </div>
      
        <div className="col-span-1 md:col-span-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-4">اطلاعات بانکی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        <ProfileField label="  بانک" value={profileData.acc.accounts[0].bank||""} />
        <ProfileField label="  شعبه بانک" value={profileData.acc.accounts[0].branchName||""} />
        <ProfileField label="شماره شبا" value={profileData.acc.accounts[0].sheba||""} />
          </div>
        </div>
        <div className="col-span-1 md:col-span-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-4">اطلاعات شغلی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4">
          <ProfileField label="شغل" value={profileData.acc.job_info[0].job||""} />
          <ProfileField label="نوع شغل" value={profileData.acc.job_info[0].position||""} />
            <ProfileField label="محل کار" value={profileData.acc.job_info[0].companyAddress||""} />
            <ProfileField label="شماره تلفن محل کار" value={profileData.acc.job_info[0].companyPhone||""} />
            <ProfileField label="ایمیل محل کار " value={profileData.acc.job_info[0].companyEmail||""} />
            <ProfileField label="کدپستی محل کار " value={profileData.acc.job_info[0].companyPostalCode||""} />
          </div>
        </div>
    
        <div className="col-span-1 md:col-span-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-4">آدرس</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 2xl:grid-cols-6 gap-4">
            <ProfileField label="استان" value={profileData.acc.addresses[0].province} />
            <ProfileField label="شهر" value={profileData.acc.addresses[0].city} />
            <ProfileField label="خیابان " value={profileData.acc.addresses[0].remnantAddress} />
            <ProfileField label="کوچه " value={profileData.acc.addresses[0].alley} />
            <ProfileField label="کدپستی " value={profileData.acc.addresses[0].postalCode} />

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
