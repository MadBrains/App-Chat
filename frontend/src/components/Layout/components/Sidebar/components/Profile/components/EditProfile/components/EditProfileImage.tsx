import React from 'react';
import { styled } from '@mui/material/styles';
import ChangePhotoIcon from 'src/assets/icons/userEditing/ChangePhotoIcon';
import { InputBase } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { invisibleInput } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/styled';
import Avatar from 'src/components/common/Avatar/Avatar';
import { EditProfileForm } from 'src/components/Layout/components/Sidebar/components/Profile/components/EditProfile/EditProfile';

interface EditProfileImage {
  src?: string;
  shortUserName?: string;
  control: Control<EditProfileForm, any>;
  setFormImage: (url: string) => void;
}

const ChangePhotoContainer = styled('div')({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: '0'
});

const EditProfileImage: React.FC<EditProfileImage> = ({
  src,
  control,
  shortUserName,
  setFormImage
}) => {
  return (
    <Avatar
      size={84}
      src={src}
      alt='Profile Avatar'
      containerSx={{
        outline: '1px solid black',
        mr: 2.5,
        border: src ? '' : '2px solid white',
        '&:hover .photo-icon': {
          opacity: 1,
          backgroundColor: '#00000030'
        }
      }}
      imageStyle={{ border: '2px solid white', borderRadius: '100%' }}
      shortUserName={shortUserName}
    >
      <Controller
        control={control}
        name='image'
        render={({ field: { onChange, ...rest } }) => (
          <InputBase
            type='file'
            sx={invisibleInput}
            inputProps={{ accept: '.jpg, .jpeg, .png, .webp' }}
            {...rest}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e?.currentTarget?.files?.[0]) {
                const imageFromFile = URL.createObjectURL(e.currentTarget.files[0]);
                setFormImage(imageFromFile);
              }
              onChange(e);
            }}
          />
        )}
      />

      <ChangePhotoContainer className='photo-icon'>
        <ChangePhotoIcon />
      </ChangePhotoContainer>
    </Avatar>
  );
};

export default EditProfileImage;
