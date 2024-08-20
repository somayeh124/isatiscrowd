import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './form';

const Sterpercrowd = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['مرحله اول', 'مرحله دوم', 'مرحله سوم'];

  const handleNext = () => {
    if (activeStep === 1) {
      // چک کنید که تمام چک‌باکس‌ها تیک خورده‌اند
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
        return <div>  <Form/> </div>;
      // case 1:
      //   return <AccordionUsage />;
      // case 2:
      //   return <div><TrackingCard/></div>;
      default:
        return <div className='flex items-center justify-center self-center mt-8 text-lg'>  منتظر بررسی اطلاعات باشید</div>;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {renderStepContent(activeStep)}
      </div>
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
      <ToastContainer />
    </div>
  );
};

export default Sterpercrowd;
