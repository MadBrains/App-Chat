import React from 'react';
import { Divider } from '@mui/material';
import { Typography } from 'src/ui/Typography/Typography';
import Member from 'src/components/Chat/components/CreateChat/components/Member';
import {
  ControlContainer,
  MainContainer,
  MembersList,
  modalMembersSx
} from 'src/components/Chat/components/CreateChat/styled';
import { Button } from 'src/ui/Button/Button';
import { Box } from 'src/ui/Box/Box';
import { useUserList } from 'src/api/user/hooks';
import { EnumActionWithChat } from 'src/api/chat/types';

interface InvitationMembersProps {
  handleClose: () => void;
  selectedMembers: number[];
  appendMember: (id: number) => void;
  prependMember: (id: number) => void;
  handleSubmit: () => void;
  submitText: string;
  closeModal?: () => void;
  alreadyMembers?: Array<number | undefined>;
  prependAlreadyMember?: (id: number) => void;
  isAdmin?: boolean;
  action: EnumActionWithChat;
}

const InvitationMembers: React.FC<InvitationMembersProps> = ({
  handleClose,
  handleSubmit,
  selectedMembers,
  prependMember,
  appendMember,
  submitText,
  closeModal,
  alreadyMembers,
  prependAlreadyMember,
  isAdmin,
  action
}) => {
  const users = useUserList();

  const createChat = () => {
    handleSubmit();
    closeModal && closeModal();
  };

  return (
    <Box sx={modalMembersSx}>
      <MainContainer>
        <Typography variant='h4'>Приглашение участников</Typography>
        <Divider sx={{ borderWidth: '1px', marginTop: '10px', marginBottom: '13px' }} />
        <MembersList>
          {users?.map(user => {
            return (
              <Member
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                src={user.avatar_url}
                isSelectedMembers={!!selectedMembers.find(memberId => memberId === user.id)}
                prependMember={prependMember}
                appendMember={appendMember}
                prependAlreadyMember={prependAlreadyMember}
                isAdmin={isAdmin}
                isAlreadyMember={
                  alreadyMembers && !!alreadyMembers.find(memberId => memberId === user.id)
                }
                action={action}
              />
            );
          })}
        </MembersList>
      </MainContainer>
      <ControlContainer>
        <Button
          variant='text'
          size='small'
          sx={{ marginLeft: '25px' }}
          onClick={() => handleClose()}
        >
          Назад
        </Button>
        <Button variant='text' size='small' sx={{ marginRight: '25px' }} onClick={createChat}>
          {submitText}
        </Button>
      </ControlContainer>
    </Box>
  );
};

export default InvitationMembers;
