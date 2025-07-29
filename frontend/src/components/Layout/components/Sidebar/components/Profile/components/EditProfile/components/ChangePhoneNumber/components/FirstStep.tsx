import React from 'react';
import {
    PhoneNumber
} from "src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/ChangePhoneNumber/styled";
import SwitchWithLabel from "src/components/Settings/EditRole/components/SwitchWithLabel";
import {Button} from "src/ui/Button/Button";
import {
    EnumStepsChangeNumber
} from "src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/ChangePhoneNumber/types";

interface FirstStepProps {
    changeStep:(step:EnumStepsChangeNumber) => void;
    phoneNumber?:string
}

const defaultNumber = '+7999-***-**-44'

const FirstStep:React.FC<FirstStepProps> = ({changeStep, phoneNumber}) => {
    return (
        <>
           <PhoneNumber>{phoneNumber ?? defaultNumber}</PhoneNumber>
            <SwitchWithLabel label='Нет доступа к номеру'/>
            <Button sx={{mt:5}} variant="contained" onClick={() => changeStep(EnumStepsChangeNumber.SECOND_STEP)}>Отправить СМС</Button>
        </>

    );
}

export default FirstStep;