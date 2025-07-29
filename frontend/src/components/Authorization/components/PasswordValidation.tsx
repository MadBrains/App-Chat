import React, { useEffect, useMemo } from 'react';
import SvgCloseIcon from 'src/assets/icons/CloseIcon';
import { PasswordValidationContainer, IconBox } from 'src/components/Authorization/styled';
import { Control, useWatch } from 'react-hook-form';
import SvgCheck from 'src/assets/icons/Check';
import { Box } from 'src/ui/Box/Box';

interface PasswordValidationProps {
  control: Control<any>;
  setIsValidPassword: (isValidPassword: boolean) => void;
}

const typePasswordValidation = [
  {
    id: 'uppercaseLetter',
    title: 'Заглавная латинская буква',
    test: (password: string) => /[A-Z]/.test(password)
  },
  {
    id: 'lowercaseLetter',
    title: 'Строчная латинская буква',
    test: (password: string) => /[a-z]/.test(password) && password
  },
  {
    id: 'numberOfCharacters',
    title: 'От 6 до 20 знаков',
    test: (password: string) => password?.length >= 6 && password?.length <= 20
  },
  { id: 'figures', title: 'Цифра', test: (password: string) => /[0-9]/.test(password) },
  {
    id: 'specialCharacter',
    title: 'Специальный символ',
    test: (password: string) => /[!@#$%^&*]/.test(password)
  }
];

const PasswordValidation = ({ control, setIsValidPassword }: PasswordValidationProps) => {
  const password = useWatch({ control, name: 'password' });

  const field = useMemo(
    () =>
      typePasswordValidation.reduce((acc, value) => {
        acc[value.id] = value.test(password);
        return acc;
      }, {}),
    [password]
  );

  useEffect(() => {
    const isValidPassword = Object.values(field).includes(false);
    setIsValidPassword(!isValidPassword);
  }, [field]);

  return (
    <PasswordValidationContainer>
      {typePasswordValidation.map(el => (
        <Box
          key={el.id}
          sx={{ opacity: field[el.id] ? '0.2' : '1', fontSize: '14px', marginRight: '24px' }}
        >
          <IconBox>
            {field[el.id] ? (
              <SvgCheck width={13} height={13} viewBox={'0 0 24 24'} />
            ) : (
              <SvgCloseIcon />
            )}
          </IconBox>
          {el.title}
        </Box>
      ))}
    </PasswordValidationContainer>
  );
};

export default PasswordValidation;
