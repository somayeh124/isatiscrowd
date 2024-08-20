/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'سمیه',
    lastName: '',
    fatherName: '',
    nationalId: '',
    sheba: '',
    address: '',
    job: '',
    gender: '',
    maritalStatus: '',
    birthDate: '',
    mobile: '',
    bankBranchName: '',
    province: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${OnRun}/information`);       
        const { data } = response.data;

        setProfileData({
          firstName: data.firstName.trim(),
          lastName: data.privatePerson.lastName,
          fatherName: data.privatePerson.fatherName.trim(),
          nationalId: data.privatePerson.shNumber.trim(),
          sheba: data.accounts[0].sheba.trim(),
          address: data.addresses[0].remnantAddress.trim(),
          job: data.jobInfo.job.title.trim(),
          gender: data.privatePerson.gender,
          maritalStatus: 'مجرد', 
          mobile: data.mobile,
          bankBranchName: data.accounts[0].branchName.trim(),
          province: data.addresses[0].province.name.trim(),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">پروفایل کاربر</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">نام:</label>
          <input
            type="text"
            value={profileData.firstName}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">نام خانوادگی:</label>
          <input
            type="text"
            value={profileData.lastName}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">نام پدر:</label>
          <input
            type="text"
            value={profileData.fatherName}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">کد ملی:</label>
          <input
            type="text"
            value={profileData.nationalId}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">شماره شبا:</label>
          <input
            type="text"
            value={profileData.sheba}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">نام شعبه بانک:</label>
          <input
            type="text"
            value={profileData.bankBranchName}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">استان:</label>
          <input
            type="text"
            value={profileData.province}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">آدرس:</label>
          <input
            type="text"
            value={profileData.address}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">شغل:</label>
          <input
            type="text"
            value={profileData.job}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">جنسیت:</label>
          <input
            type="text"
            value={profileData.gender }
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">وضعیت تاهل:</label>
          <input
            type="text"
            value={profileData.maritalStatus}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
   
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">شماره موبایل:</label>
          <input
            type="text"
            value={profileData.mobile}
            readOnly
            className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
