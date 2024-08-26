/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha } from '@mui/material/styles';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import Scrollbar from 'src/components/scrollbar';
import { getCookie, setCookie } from 'src/api/cookie';
import SvgColor from 'src/components/svg-color';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import navConfig from './config-navigation';
import { NAV } from './config-layout';

export default function Nav({ openNav, onCloseNav }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const access = getCookie('access');
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  const handleLogout = () => {
    setCookie('access', '', { expires: new Date(0) });
    navigate('/login');
  };

  const [profileData, setProfileData] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${OnRun}/api/information/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    if (access && !profileData) {
      getProfile();
    }
  }, [access]);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <img className="w-28 h-28 mx-auto" src="/assets/crowdlogo.png" alt="Logo" />
      <Box className="bg-white text-black p-4 m-4 rounded-md">
        <Grid item xs={12}>
          {profileData &&
          profileData.acc &&
          profileData.acc.private_person &&
          profileData.acc.private_person.length > 0 ? (
            <div className="flex justify-center">
              <Typography variant="h6">{profileData.acc.private_person[0].firstName}</Typography>
              <Typography variant="h6" sx={{ ml: 1 }}>
                {profileData.acc.private_person[0].lastName}
              </Typography>
            </div>
          ) : (
            <Typography variant="h6">در حال بارگذاری...</Typography>
          )}
          خوش آمدید 👋
        </Grid>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2, color: 'white' }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
      <ListItemButton
        onClick={handleLogout}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'red',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          },
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <SvgColor
            src="/assets/icons/navbar/ic_exit.svg"
            sx={{ width: 1, height: 1, color: 'red' }}
          />
        </Box>
        <Box component="span">خروج</Box>
      </ListItemButton>
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        bgcolor: 'background.default',
        boxShadow: 2,
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            bgcolor: '#4B5563',
            color: 'white',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <>
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1201,
              padding: 1,
              borderRadius: '50%',
              '& .MuiSvgIcon-root': {
                fontSize: 36,
                color: 'text.primary',
              },
            }}
          >
            {mobileMenuOpen ? <CloseIcon style={{color:'white',marginRight:'200px'}} /> : <MenuIcon />}
          </IconButton>

          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                width: NAV.WIDTH,
                bgcolor: '#4B5563',
                color: 'white',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                position: 'relative',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1202,
              }}
            >
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  padding: 1,
                  borderRadius: '50%',
                  boxShadow: 3,
                  '& .MuiSvgIcon-root': {
                    fontSize: 36,
                    color: 'text.primary',
                  },
                }}
               />
            </Box>
            {renderContent}
          </Drawer>
        </>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: active ? 'primary.main' : 'white',
        textTransform: 'capitalize',
        fontWeight: active ? 'bold' : 'medium',
        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
        },
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Typography component="span">{item.title}</Typography>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
