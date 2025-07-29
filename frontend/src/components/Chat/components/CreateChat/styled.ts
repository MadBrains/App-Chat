import { styled } from '@mui/material/styles';
import { Button } from 'src/ui/Button/Button';

export const MainContainer = styled('div')({
  padding: '10px 25px',
  overflowY: 'hidden',
  height: '100%'
});

export const MemberContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:hover .controlButton': {
    opacity: 1
  }
});

export const MemberInfoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

export const MemberName = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '19px',
  marginLeft: '10px',
  width: '150px'
}));

export const MemberStatus = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '200',
  fontSize: '14px',
  lineHeight: '19px'
}));

export const ControlButton = styled(Button)<{
  isSelectedMembers: boolean | undefined;
  isAlreadyMember: boolean | undefined;
}>(({ theme, isSelectedMembers, isAlreadyMember }) => ({
  width: '101px',
  padding: '0px',
  height: '28px',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  // backgroundColor: isSelectedMembers ? 'theme.palette.secondary.light' : '',
  opacity: isSelectedMembers ? 1 : isAlreadyMember ? 1 : 0,
  transition: 'all 0.3s',
  '&.Mui-disabled': {
    color: 'black'
  }
}));

export const ControlContainer = styled('div')(({ theme }) => ({
  height: '60px',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: '0px -4px 8px 0px rgba(0,  0,  0, 0.57)',
  backgroundColor: theme.palette.neutral.light,
  borderRadius: '0 0 8px 8px',
  position: 'relative',
  bottom: '60px',
  zIndex: '1'
}));

export const MembersList = styled('div')({
  overflow: 'scroll',
  height: 'calc(100% - 80px)',
  '&::-webkit-scrollbar': {
    width: '0px'
  }
});

export const modalMembersSx = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 380,
  backgroundColor: 'background.paper',
  height: '650px',
  borderRadius: '8px'
};

export const modalCreateChatSx = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 380,
  backgroundColor: 'background.paper',
  height: '650px',
  borderRadius: '8px'
};

export const modalContentSx = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 20px',
  height: '100%'
};

export const CreateGroupTitle = styled('span')({
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '19px'
});

export const CreateGroupSubTitle = styled('span')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '19px',
  letterSpacing: '-3%',
  color: theme.palette.info.light
}));

export const PermissionTitle = styled('span')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '19px',
  letterSpacing: '-3%',
  color: theme.palette.info.light,
  paddingLeft: '16px'
}));

export const MainButton = styled('span')({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '19px'
});

export const MainButtonsSx = {
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '19px',
  letterSpacing: '0px'
};

export const InviteToChatIcon = styled('span')({
  marginRight: '7px'
});

export const CloseIcon = styled('span')({
  marginRight: '4px',
  position: 'relative',
  top: '2px'
});

export const groupTitleSx = {
  fontSize: '24px',
  fontWeight: '400',
  lineHeight: '33px'
};
