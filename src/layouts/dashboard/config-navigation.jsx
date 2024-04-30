import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'میزکار',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'برگه سهام',
    path: '/getstock',
    icon: icon('ic_sheet'),
  },
  {
    title: 'معاملات',
    path: '/trades',
    icon: icon('ic_trade'),
  },
  // {
  //   title: 'پیشرفت پروژه',
  //   path: '/commingsoon',
  //   icon: icon('ic_upgrade'),
  // },
  // {
  //   title: 'مشاهده آنلاین',
  //   path: '/commingsoon',
  //   icon: icon('ic_visioneye'),
  // },
  {
    title: 'خروج',
    path: '/login',
    icon: icon('ic_exit'),
  },
];

export default navConfig;
