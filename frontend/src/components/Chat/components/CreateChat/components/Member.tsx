import React from 'react';
import { ControlButton, MemberContainer } from 'src/components/Chat/components/CreateChat/styled';
import MemberInfo from 'src/components/Chat/components/CreateChat/components/MemberInfo';
import { EnumActionWithChat } from 'src/api/chat/types';

interface MemberProps {
  id: number;
  first_name?: string;
  last_name?: string;
  online?: boolean;
  src?: string;
  isSelectedMembers?: boolean;
  appendMember: (id: number) => void;
  prependMember: (id: number) => void;
  prependAlreadyMember?: (id: number) => void;
  isAdmin?: boolean;
  isAlreadyMember?: boolean;
  action: EnumActionWithChat;
}

const Member: React.FC<MemberProps> = ({
  id,
  last_name,
  first_name,
  online,
  src,
  isSelectedMembers,
  prependMember,
  appendMember,
  prependAlreadyMember,
  isAdmin,
  isAlreadyMember,
  action
}) => {
  const name = [first_name || '', last_name || ''].join(' ');
  const memberHandler = () => {
    if (action === EnumActionWithChat.EDIT_CHAT) {
      if (isAdmin && isAlreadyMember) {
        return 'Исключить';
      } else if (isAlreadyMember) {
        return 'Уже в чате';
      }
      return isSelectedMembers ? 'Отмена' : 'Пригласить';
    } else {
      return isSelectedMembers ? 'Исключить' : 'Пригласить';
    }
  };
  const invitationHandler = () => {
    if (action === EnumActionWithChat.EDIT_CHAT) {
      if (isAdmin && isAlreadyMember && prependAlreadyMember) {
        prependAlreadyMember(id);
      }
    }
    if (!isAlreadyMember) {
      isSelectedMembers ? prependMember(id) : appendMember(id);
    }
  };
  return (
    <MemberContainer>
      <MemberInfo id={id} name={name} online={online} src={src} />
      <ControlButton
        disabled={!isAdmin && isAlreadyMember}
        className='controlButton'
        variant='contained'
        color={isSelectedMembers ? 'secondary' : isAlreadyMember ? 'secondary' : 'primary'}
        isSelectedMembers={isSelectedMembers}
        isAlreadyMember={isAlreadyMember}
        onClick={invitationHandler}
      >
        {memberHandler()}
      </ControlButton>
    </MemberContainer>
  );
};

export default Member;
