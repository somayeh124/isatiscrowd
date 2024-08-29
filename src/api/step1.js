/* eslint-disable import/order */
/* eslint-disable no-restricted-syntax */
import { toast, ToastContainer } from 'react-toastify';
import api from './apiClient';
import { getCookie } from './cookie';



export const getStep1 = async (id) => {
  let response
  if (id) {
  
    const access = await getCookie('access');
    
    response = await api.get(`/api/cart/detail/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
  }else{
    response = {
      "data":
      {"cart": {
          "company_name": "",
          "Lock_company_name": false,
          "activity_industry": "",
          "Lock_activity_industry": false,
          "registration_number": "",
          "Lock_registration_number": false,
          "nationalid": "",
          "Lock_nationalid": false,
          "registered_capital": "",
          "Lock_registered_capital": false,
          "personnel": null,
          "Lock_personnel": false,
          "company_kind": "",
          "Lock_company_kind": false,
          "amount_of_request": "10000000000",
          "Lock_amount_of_request": false,
          "code": null,
          "email": "",
          "Lock_email": false,
          "address": "",
          "Lock_address": false,
          "financial_report_thisyear": null,
          "Lock_financial_report_thisyear": false,
          "financial_report_lastyear": null,
          "Lock_financial_report_lastyear": false,
          "financial_report_yearold": null,
          "Lock_financial_report_yearold": false,
          "audit_report_thisyear": null,
          "Lock_audit_report_thisyear": false,
          "audit_report_lastyear": null,
          "Lock_audit_report_lastyear": false,
          "audit_report_yearold": null,
          "Lock_audit_report_yearold": false,
          "statement_thisyear": null,
          "Lock_statement_thisyear": false,
          "statement_lastyear": null,
          "Lock_statement_lastyear": false,
          "statement_yearold": null,
          "Lock_statement_yearold": false,
          "alignment_6columns_thisyear": null,
          "Lock_alignment_6columns_thisyear": false,
          "alignment_6columns_lastyear": null,
          "Lock_alignment_6columns_lastyear": false,
          "alignment_6columns_yearold": null,
          "Lock_alignment_6columns_yearold": false,
          "massage": "",
      }}
  }
  }
  return response

};


 export const createCart = async (data,handleNext) => {
  
  const formData = new FormData();
  formData.append('company_name', data.company_name || "");
  formData.append('activity_industry', data.activity_industry || "");
  formData.append('registration_number', data.registration_number || "");
  formData.append('nationalid', data.nationalid || "");
  formData.append('registered_capital', data.registered_capital || "");
  formData.append('personnel', data.personnel || "");
  formData.append('company_kind', data.company_kind || "");
  formData.append('amount_of_request', data.amount_of_request || "");
  formData.append('address', data.address || "");
  formData.append('email', data.company_email || "");

  if (data.alignment_6columns_thisyear) {
    formData.append('alignment_6columns_thisyear', data.alignment_6columns_thisyear);
  }
  if (data.financial_report_lastyear) {
    formData.append('financial_report_lastyear', data.financial_report_lastyear);
  }
  if (data.audit_report_lastyear) {
    formData.append('audit_report_lastyear', data.audit_report_lastyear);
  }
  if (data.statement_lastyear) {
    formData.append('statement_lastyear', data.statement_lastyear);
  }
  if (data.financial_report_yearold) {
    formData.append('financial_report_yearold', data.financial_report_yearold);
  }
  if (data.audit_report_yearold) {
    formData.append('audit_report_yearold', data.audit_report_yearold);
  }
  if (data.statement_yearold) {
    formData.append('statement_yearold', data.statement_yearold);
  }


  const access = await getCookie('access');
  const response = await api.post(`/api/cart/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${access}`,
    },
    maxBodyLength: Infinity 
  });
  
  if (response.status === 200 || response.status === 201) {
    toast.success('اطلاعات با موفقیت ارسال شد.');

            handleNext();
          
  };

  return response;
}

export const updateCart = async (data,handleNext,id) => {
  
  const formData = new FormData();
  formData.append('company_name', data.company_name || "");
  formData.append('activity_industry', data.activity_industry || "");
  formData.append('registration_number', data.registration_number || "");
  formData.append('nationalid', data.nationalid || "");
  formData.append('registered_capital', data.registered_capital || "");
  formData.append('personnel', data.personnel || "");
  formData.append('company_kind', data.company_kind || "");
  formData.append('amount_of_request', data.amount_of_request || "");
  formData.append('address', data.address || "");
  formData.append('email', data.email || "");

  if (data.alignment_6columns_thisyear && typeof(data.alignment_6columns_thisyear)!=='string') {
    formData.append('alignment_6columns_thisyear', data.alignment_6columns_thisyear);
  }
  if (data.financial_report_lastyear && typeof(data.financial_report_lastyear)!=='string') {
    formData.append('financial_report_lastyear', data.financial_report_lastyear);
  }
  if (data.audit_report_lastyear&& typeof(data.audit_report_lastyear)!=='string') {
    formData.append('audit_report_lastyear', data.audit_report_lastyear);
  }
  if (data.statement_lastyear&& typeof(data.statement_lastyear)!=='string') {
    formData.append('statement_lastyear', data.statement_lastyear);
  }
  if (data.financial_report_yearold&& typeof(data.financial_report_yearold)!=='string') {
    formData.append('financial_report_yearold', data.financial_report_yearold);
  }
  if (data.audit_report_yearold&& typeof(data.audit_report_yearold)!=='string') {
    formData.append('audit_report_yearold', data.audit_report_yearold);
  }
  if (data.statement_yearold&& typeof(data.statement_yearold)!=='string') {
    formData.append('statement_yearold', data.statement_yearold);
  }


  const access = await getCookie('access');
  const response = await api.patch(`/api/cart/detail/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${access}`,
    },
    maxBodyLength: Infinity 
  });
  
  if (response.status === 200 || response.status === 201) {
    toast.success('اطلاعات با موفقیت ارسال شد.'); 
            handleNext();
  };

  return response;
}

