/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import { usePathname, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { getCookie, setCookie } from 'src/api/cookie';
import SvgColor from 'src/components/svg-color';
import navConfig from './config-navigation';
import { NAV } from './config-layout';

export default function Nav({ openNav, onCloseNav }) {
  const router = useRouter();
  const cookie = getCookie('sym');

  const exit = () => {
    router.push('/login');
    setCookie('phu', '', 0);
  };

  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderAccount = <div />;

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2, color: 'white' }}>
      {navConfig.map((item) =>
        cookie === 'fevisa' ? (
          <NavItem key={item.title} item={item} />
        ) : (
          item.title !== 'پیشرفت پروژه' && <NavItem key={item.title} item={item} />
        )
      )}
      <ListItemButton
        onClick={exit}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'white',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          },
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <SvgColor src="/assets/icons/navbar/ic_exit.svg" sx={{ width: 1, height: 1, color: 'white' }} />
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
      <Logo sx={{ mt: 3, ml: 4 }} />

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
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            bgcolor: '#1f2937', // تغییر رنگ پس‌زمینه به رنگ تیره
            color: 'white', // تنظیم رنگ متن به سفید
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
              bgcolor: '#1f2937', // تغییر رنگ پس‌زمینه به رنگ تیره
              color: 'white', // تنظیم رنگ متن به سفید
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {renderContent}
        </Drawer>
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
        color: active ? 'primary.main' : 'white', // تغییر رنگ متن به سفید
        textTransform: 'capitalize',
        fontWeight: active ? 'bold' : 'medium',
        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
        },
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2, color: 'white' }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
