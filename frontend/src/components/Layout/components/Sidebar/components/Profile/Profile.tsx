import React, { useState } from 'react';
import { profileBoxSx } from 'src/components/Layout/components/Sidebar/components/Profile/styled';
import { Box } from 'src/ui/Box/Box';
import SidebarItem from 'src/components/Layout/components/Sidebar/components/SidebarItem/SidebarItem';
import { Button } from 'src/ui/Button/Button';
import EditProfile from './components/EditProfile/EditProfile';
import { useSelector } from 'src/redux/store';
import { shallowEqual } from 'react-redux';
import { parseUserNameForAvatar } from 'src/utils/helpers/parseUserNameForAvatar';
import Avatar from 'src/components/common/Avatar/Avatar';

interface ProfileProps {
  onCloseSidebar: () => void;
  isOpenSidebar?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isOpenSidebar, onCloseSidebar }) => {
  const profile = useSelector(store => store.profile, shallowEqual);
  const [isOpenProfileDrawer, setIsOpenProfileDrawer] = useState(false);
  const [online, setOnline] = useState<boolean>(true);

  const handleOpenProfileDrawer = () => {
    onCloseSidebar();
    setIsOpenProfileDrawer(true);
  };
  const handleCloseProfileDrawer = () => setIsOpenProfileDrawer(false);

  if (!profile.id) return null;

  return (
    <Box>
      <Button variant='text' sx={profileBoxSx} onClick={handleOpenProfileDrawer}>
        <Avatar
          src={profile?.avatar_url}
          size={26}
          alt='Profile avatar'
          containerSx={{
            outline: '1px solid black',
            border: profile?.avatar_url ? '' : '1px solid white',
            mr: isOpenSidebar ? '14px' : '0'
          }}
          imageStyle={{ border: '2px solid white', borderRadius: '100%' }}
          shortUserName={parseUserNameForAvatar({
            firstName: profile?.first_name,
            middleName: profile.middle_name,
            lastName: profile?.last_name
          })}
        />
        {isOpenSidebar && <SidebarItem isOpenSidebar={isOpenSidebar}>Профиль</SidebarItem>}
      </Button>
      {/*      <Box sx={onlineSwitchSx}>
        <SwitchWithLabel
          open={isOpenSidebar}
          control={
            <OnlineSwitch
              checked={online}
              disabled
              onChange={() => setOnline(prevState => !prevState)}
              sx={{ mr: '13px' }}
            />
          }
          label='Онлайн'
        />
      </Box>*/}
      <EditProfile
        open={isOpenProfileDrawer}
        profile={profile}
        onClose={handleCloseProfileDrawer}
      />
    </Box>
  );
};

export default Profile;
