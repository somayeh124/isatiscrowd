import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import AccordionUsage from "./accordion";


const Sterpercrowd = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['مرحله اول', 'مرحله دوم', 'مرحله سوم'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <div>محتوای مرحله اول</div>;
      case 1:
        return <AccordionUsage />;
      case 2:
        return <div>محتوای مرحله سوم</div>;
      default:
        return <div>مرحله‌ای یافت نشد</div>;
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
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          قبلی
        </Button>
        <Button
          disabled={activeStep === steps.length - 1}
          onClick={handleNext}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default Sterpercrowd;
