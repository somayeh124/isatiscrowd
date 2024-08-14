import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [

  {
    title: 'ایجاد درخواست',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'مشاهده درخواست',
    path: '/request',
    icon: icon('ic_sheet'),
  },



  // {
  //   title: 'مشاهده آنلاین',
  //   path: '/commingsoon',
  //   icon: icon('ic_visioneye'),
  // },
];

export default navConfig;
