import React from 'react';

interface StepIndicatorProps {
  length: number;
  currentStep: number;
  mainColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  inactiveTextColor?: string;
}

const StepIndicator = ({
  length = 3,
  currentStep = 1,
  mainColor = '#FEF387',
  backgroundColor = '#FFFFFF',
  borderColor = '#F4F4F9',
  textColor = '#222',
  inactiveTextColor = '#BDBDBD',
}: StepIndicatorProps) => {
  const steps = Array.from({ length }, (_, i) => i + 1);

  return (
    <div className="relative w-full flex flex-row items-center justify-center text-center body-3">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* Step Circle */}
          <div
            className="relative flex items-center justify-center w-6 h-6"
          >
            <div
              className="flex items-center justify-center w-5 h-5 rounded-full"
              style={{
                backgroundColor:
                  currentStep >= step ? mainColor : backgroundColor,
                border:
                  currentStep >= step ? 'none' : `1px solid ${borderColor}`,
                color: currentStep >= step ? textColor : inactiveTextColor,
              }}
            >
              {step}
            </div>
          </div>

          {/* Connector Line (don't render after last step) */}
          {index < length - 1 && (
            <div
              className="relative w-4 h-0.5"
              style={{
                backgroundColor: currentStep > step ? mainColor : borderColor,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
