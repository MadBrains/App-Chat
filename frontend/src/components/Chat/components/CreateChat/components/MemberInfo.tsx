import React from 'react';
import OnlineBudge from 'src/components/common/OnlineBudge/OnlineBudge';
import Avatar from 'src/components/common/Avatar/Avatar';
import { MemberInfoContainer, MemberName } from 'src/components/Chat/components/CreateChat/styled';

interface MemberInfoProps {
  id: number;
  name: string;
  online?: boolean;
  src?: string;
}

const MemberInfo: React.FC<MemberInfoProps> = ({ id, online, src, name }) => {
  return (
    <MemberInfoContainer>
      <OnlineBudge online={online}>
        <Avatar src={src} alt='userAvatar' size={36} />
      </OnlineBudge>
      <MemberName>{name}</MemberName>
    </MemberInfoContainer>
  );
};

export default MemberInfo;
