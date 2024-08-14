/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function Login() {
    const [nationalCode, setNationalCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('National Code:', nationalCode);
    }

    return (
        <div dir='rtl' className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-2xl rounded-lg flex overflow-hidden">
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="\public\assets\background\overlay_3.jpg" 
                        alt="Login Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">خوش آمدید</h1>
                    <p className="text-gray-600 text-center mb-6">کد ملی خود را وارد کنید</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationalCode">
                                کد ملی
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="nationalCode"
                                    name="nationalCode"
                                    value={nationalCode}
                                    onChange={(e) => setNationalCode(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="کد ملی"
                                    required
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10A8 8 0 110 10a8 8 0 0118 0zm-8 3a3 3 0 100-6 3 3 0 000 6zm-7 5a7 7 0 0114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                ثبت نام
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
