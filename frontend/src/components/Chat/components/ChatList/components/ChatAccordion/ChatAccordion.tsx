import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import React, { PropsWithChildren, useState } from 'react';
import ArchiveIcon from 'src/assets/icons/chat/ArchiveIcon';
import {
  AllCounterContainer,
  IconButton,
  IconContainer
} from 'src/components/Chat/components/ChatList/components/ChatAccordion/styles';
import { ChatWithMember, EnumChatType } from 'src/api/chat/types';
import { ToggleAccordionIconSlim } from 'src/assets/icons/chat';
import SvgAddPlusChat from 'src/assets/icons/chat/AddPlusChat';

interface ChatAccordionProps extends PropsWithChildren {
  handleAddChat: (open: boolean) => void;
  handleArchivedChat: (open: boolean) => void;
  title: string;
  hidden?: boolean;
  chatType?: EnumChatType;
  chatList?: Array<ChatWithMember>;
  allCounter?: number;
}

const ChatAccordion: React.FC<ChatAccordionProps> = ({
  children,
  handleAddChat,
  handleArchivedChat,
  title,
  hidden,
  chatType,
  chatList,
  allCounter
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const showArchivedIcon = chatList?.find(
    el => el?.self_member?.archived === true && el.chat_type === chatType
  );

  return (
    <>
      <Accordion
        disableGutters
        defaultExpanded
        sx={{ mb: '10px', display: hidden ? 'none' : '' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ paddingLeft: '25px' }}
        >
          <IconContainer className='accordion-expand'>
            <ToggleAccordionIconSlim />
          </IconContainer>
          <Typography variant='h5' component='span' flexGrow={1}>
            {title}
          </Typography>
          {expanded && !!showArchivedIcon && (
            <IconButton
              sx={{ padding: '0', margin: '6px', color: 'inherit' }}
              onClick={e => {
                e.stopPropagation();
                handleArchivedChat(true);
              }}
            >
              <ArchiveIcon />
            </IconButton>
          )}
          {expanded ? (
            <IconButton
              sx={{ color: 'inherit' }}
              size='small'
              onClick={e => {
                e.stopPropagation();
                handleAddChat(true);
              }}
            >
              <SvgAddPlusChat />
            </IconButton>
          ) : (
            <AllCounterContainer>{allCounter}</AllCounterContainer>
          )}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default ChatAccordion;
