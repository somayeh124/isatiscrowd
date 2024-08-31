/* eslint-disable no-duplicate-case */
import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getCookie } from 'src/api/cookie';
import ResumePage from 'src/sections/resume/Page/ResumePage';
import CardList from './ListCard';
import Form from './form';
import Step3 from './step3';
// import Step5 from './Step5';
import FileSharehold from './fildesharehold';


const Sterpercrowd = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardSelected, setCardSelected] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate(); 
  const access = getCookie('access');

  useEffect(() => {
    if (!access) {
      navigate('/login'); 
    } else {
      setIsCheckingAuth(false); 
    }
  }, [access, navigate]); 

  const steps = ['مرحله اول', 'مرحله دوم', 'مرحله سوم','مرحله چهارم','مرحله پنجم'];

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
      setActiveStep(0);  
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  console.log(cardSelected);
  

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CardList setCardSelected={setCardSelected} handleNext={handleNext} />;
      case 1:
        return <Form cardSelected={cardSelected} handleNext={handleNext} />;
      case 2:
        return <Step3 cardSelected={cardSelected}/>;
        case 3:
          return <ResumePage id={cardSelected} />;
          case 3:
        return <FileSharehold/>;
      default:
        return <div>{null}</div>
    }
  };

  if (isCheckingAuth) {
    return null;
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
