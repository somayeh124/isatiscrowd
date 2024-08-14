/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardActions, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const requests = [
  {
    id: 1,
    title: 'طرح سرمایه پذیر1',
    trackingCode: '123456789',
    createdDate: '14/04/1402',
    handledDate: '13/05/1403',
    status: 'در حال بررسی',
    expert: 'کارشناس الف',
  },
  {
    id: 2,
    title: 'طرح سرمایه گذار2',
    trackingCode: '987654321',
    createdDate: '14/04/1402',
    handledDate: '13/05/1403',
    status: 'تکمیل شده',
    expert: 'کارشناس ب',
  },
  {
    id: 3,
    title: 'طرح3سرمایه پذیر',
    trackingCode: '987654321',
    createdDate: '14/04/1402',
    handledDate: '13/05/1403',
    status: 'تکمیل شده',
    expert: 'کارشناس ب',
  },
];

export default function RequestView() {
  const getStatusIcon = (status) => {
    if (status === 'تکمیل شده') {
      return <CheckCircleIcon sx={{ color: 'green', marginLeft: '8px' }} />;
    }
    return <HourglassEmptyIcon sx={{ color: 'orange', marginLeft: '8px' }} />;
  };

  const getCardColor = (title) => {
    if (title.includes('سرمایه پذیر')) {
      return '#90caf9'; // رنگ آبی پررنگ‌تر
    }
    if (title.includes('سرمایه گذار')) {
      return '#a5d6a7'; // رنگ سبز پررنگ‌تر
    }
  
  };
  
  return (
    <div style={{ padding: '24px' }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}
      >
        درخواست‌ها
      </Typography>
      {requests.map((request) => (
        <div key={request.id} className="flex justify-center mb-16">
          <Card
            sx={{
              width: '500px',
              padding: '16px',
              borderRadius: '14px',
              border: '8px solid', // عرض و نوع border
              borderColor: getCardColor(request.title), // تنظیم رنگ border
              // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              // backgroundColor: '#fff', // اگر نیاز به تغییر رنگ پس‌زمینه ندارید، این خط را غیرفعال کنید
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  marginBottom: '16px',
                }}
              >
                {`عنوان: ${request.title}`}
              </Typography>
              <Typography variant="h6" color="primary">
                {`کد پیگیری: ${request.trackingCode}`}
              </Typography>
              <Typography sx={{ color: 'gray', marginTop: '8px' }}>
                {`تاریخ ایجاد: ${request.createdDate}`}
              </Typography>
              <Typography sx={{ color: 'gray', marginTop: '8px' }}>
                {`تاریخ رسیدگی: ${request.handledDate}`}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: request.status === 'تکمیل شده' ? 'green' : 'orange',
                  marginTop: '8px',
                }}
              >
                {getStatusIcon(request.status)}
                {`وضعیت: ${request.status}`}
              </Typography>
              <Typography sx={{ marginTop: '8px' }}>{`کارشناس: ${request.expert}`}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg">
                مشاهده
              </button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
