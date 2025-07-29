import React, { useEffect, useState } from 'react';
import { EnumStepsChangeNumber } from './types';
import FirstStep from './components/FirstStep';
import { StepInfo } from './styled';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';

const steps = {
  firstStep: 'Для подтверждения операции мы пришлём СМС с кодом на номер',
  secondStep: 'Введите код из СМС в поле ниже',
  thirdStep: 'Введите новый номер телефона'
};

interface ChangePhoneNumberProps {
  phoneNumber?: string;
  setDrawerDescription: (desc?: string) => void;
}
const ChangePhoneNumber: React.FC<ChangePhoneNumberProps> = ({
  phoneNumber,
  setDrawerDescription
}) => {
  const [currentStep, setCurrentStep] = useState(EnumStepsChangeNumber.FIRST_STEP);

  const changeStep = (step: EnumStepsChangeNumber) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    setDrawerDescription(steps[currentStep]);
    return () => {
      setDrawerDescription('');
    };
  }, [currentStep, setDrawerDescription]);

  return (
    <>
      {currentStep === EnumStepsChangeNumber.FIRST_STEP && (
        <FirstStep phoneNumber={phoneNumber} changeStep={changeStep} />
      )}
      {currentStep === EnumStepsChangeNumber.SECOND_STEP && (
        <SecondStep onChangeStep={changeStep} />
      )}
      {currentStep === EnumStepsChangeNumber.THIRD_STEP && <ThirdStep />}
    </>
  );
};

export default ChangePhoneNumber;
