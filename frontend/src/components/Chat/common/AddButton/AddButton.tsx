import React from 'react';
import SvgPlusIcon from 'src/assets/icons/chat/PlusIcon';
import { AddChat, AddNewChatButton } from 'src/components/Chat/common/AddButton/styled';

interface AddButtonProps {
  text: string;
  onClick?: () => void;
  small?: boolean;
}
const AddButton: React.FC<AddButtonProps> = ({ text, onClick, small }) => {
  return (
    <AddChat onClick={onClick}>
      <AddNewChatButton small={small}>
        <SvgPlusIcon />
      </AddNewChatButton>
      {text}
    </AddChat>
  );
};

export default AddButton;
