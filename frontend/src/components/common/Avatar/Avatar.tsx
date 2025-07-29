import React, { PropsWithChildren } from 'react';
import { styled, Theme } from '@mui/material/styles';
import { Image } from 'src/ui/Image/Image';
import { Box } from 'src/ui/Box/Box';
import { SxProps } from '@mui/system';
import { Colors } from 'src/config/colors';

interface AvatarComponentProps {
  size: number;
}

const AvatarContainer = styled(Box)<AvatarComponentProps>(({ size }) => ({
  borderRadius: '100%',
  minWidth: size,
  height: size,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  // outline: 'none!important'
}));

const DefaultAvatar = styled('div')<AvatarComponentProps>(({ size }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: Colors.white,
  fontSize: size,
  lineHeight: `${size}px`,
}));

interface AvatarProps extends PropsWithChildren {
  size: number;
  src?: string;
  alt: string;
  containerSx?: SxProps<Theme>;
  imageStyle?: React.CSSProperties;
  shortUserName?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  containerSx,
  imageStyle,
  alt,
  children,
  shortUserName
}) => (
  <AvatarContainer size={size} sx={containerSx}>
    {src ? (
      <Image
        src={src}
        width={size}
        height={size}
        sizes={`${size}px`}
        alt={alt}
        style={imageStyle}
      />
    ) : (
      <DefaultAvatar size={Math.round(size * 0.4)}>{shortUserName || 'MB'}</DefaultAvatar>
    )}
    {children}
  </AvatarContainer>
);

export default Avatar;
