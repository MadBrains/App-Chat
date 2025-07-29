import React from 'react';
import {RU_PHONE_MASK} from "src/config/formPatterns";
import InputMask from "react-input-mask";
import {Button} from "src/ui/Button/Button";
import TextInput from "src/ui/TextInput/TextInput";

const ThirdStep:React.FC = () => {
    return (
        <>
            <InputMask mask={RU_PHONE_MASK} >
                <TextInput label='Новый номер телефона' />
            </InputMask>
            <Button sx={{mt:5}} variant='contained'>Сохранить</Button>
        </>

    );
}

export default ThirdStep;