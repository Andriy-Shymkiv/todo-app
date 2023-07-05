import { IconButton, Menu, MenuItem, styled, Typography } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '~/providers/AuthContext';

const StyledToggleButton = styled(IconButton, {
  name: 'StyledToggleButton',
})(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
}));

const StyledMenu = styled(Menu, {
  name: 'StyledMenu',
})({ '& .MuiMenu-paper': { width: 260, marginTop: 6 } });

const StyledMenuItem = styled(MenuItem, {
  name: 'StyledMenuItem',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const AppMenu: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleToggleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <>
      <StyledToggleButton onClick={handleToggleClick}>
        <MenuIcon />
      </StyledToggleButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(): void => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <StyledMenuItem onClick={handleLogout}>
          <LogoutIcon />
          <Typography variant='body1'>{'Logout'}</Typography>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};
