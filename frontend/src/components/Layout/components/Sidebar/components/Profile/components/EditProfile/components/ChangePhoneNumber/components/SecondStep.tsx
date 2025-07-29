import React from 'react';
import TextInput from "src/ui/TextInput/TextInput";
import {
    EnumStepsChangeNumber
} from "src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/components/ChangePhoneNumber/types";

interface SecondStepProps {
    onChangeStep:(step:EnumStepsChangeNumber) => void
}
const SecondStep:React.FC<SecondStepProps> = ({onChangeStep}) =>  {
    return (
        <TextInput label='Код из СМС' onKeyDown={(event) => {
            if (event.keyCode === 13) onChangeStep(EnumStepsChangeNumber.THIRD_STEP)
        }}/>
    );
}

export default SecondStep;
