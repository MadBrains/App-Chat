import React from 'react';
import { RightsButton } from 'src/components/Settings/EditRole/rightsButton';
import NextIcon from 'src/assets/icons/userEditing/NextIcon';
import { styled } from '@mui/material/styles';
import { EnumRights } from 'src/components/Settings/EditRole/types';

const ButtonText = styled('span')({
  flex: '1'
});

interface EditRightsButtonProps {
  title?: string;
  onClick: (rightType: EnumRights) => void;
  rightType: EnumRights;
}
export const EditRightsButton: React.FC<EditRightsButtonProps> = ({
  title,
  onClick,
  rightType
}) => {
  return (
    <RightsButton onClick={() => onClick(rightType)} endIcon={<NextIcon />}>
      <ButtonText>{title}</ButtonText>
    </RightsButton>
  );
};

export default EditRightsButton;
