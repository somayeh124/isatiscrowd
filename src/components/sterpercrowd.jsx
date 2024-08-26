import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getCookie } from 'src/api/cookie';
import Form from './form';
import CardList from './ListCard';

const Sterpercrowd = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardSelected, setCardSelected] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // اضافه کردن حالت برای بررسی احراز هویت
  const navigate = useNavigate(); // Initialize useNavigate
  const access = getCookie('access');

  useEffect(() => {
    if (!access) {
      navigate('/login'); // Redirect to login page if no access token
    } else {
      setIsCheckingAuth(false); // اگر توکن وجود دارد، بررسی احراز هویت تمام شده است
    }
  }, [access, navigate]); // Run this effect when access or navigate changes

  const steps = ['مرحله اول', 'مرحله دوم', 'مرحله سوم'];

  const handleNext = () => {
    if (activeStep === 1) {
      const checkedContracts = JSON.parse(localStorage.getItem('checkedContracts')) || {};
      const allChecked = Object.values(checkedContracts).every(Boolean);

      if (!allChecked) {
        toast.error('لطفاً همه قراردادها را مطالعه کنید.');
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      alert('اتمام');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CardList setCardSelected={setCardSelected} handleNext={handleNext} />;
      case 1:
        return <Form cardSelected={cardSelected} handleNext={handleNext} />;
      // case 2:
      //   return <div><TrackingCard/></div>;
      default:
        return <div className='flex items-center justify-center self-center mt-8 text-lg'>منتظر بررسی اطلاعات باشید</div>;
    }
  };

  if (isCheckingAuth) {
    return null; // در حالی که در حال بررسی احراز هویت هستید، هیچ محتوایی را رندر نکنید
  }

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            '&:hover': {
              backgroundColor: '#90caf9',
            }
          }}
        >
          قبلی
        </Button>
        <Button
          onClick={handleNext}
          sx={{
            '&:hover': {
              backgroundColor: '#90caf9',
            }
          }}
        >
          {activeStep === steps.length - 1 ? 'اتمام' : 'بعدی'}
        </Button>
      </div>
      <div>
        {renderStepContent(activeStep)}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sterpercrowd;
