/* eslint-disable import/named */
import { Helmet } from 'react-helmet-async';

import { Profile } from 'src/sections/profile/view';
// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>پروفایل </title>
      </Helmet>
      <Profile />
    </>
  );
}
