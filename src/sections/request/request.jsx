/* eslint-disable import/named */
import { Helmet } from 'react-helmet-async';

import { RequestView } from 'src/sections/request/view';

// ----------------------------------------------------------------------

export default function RequestPage() {
  return (
    <>
      <Helmet>
        <title>مشاهده طرح ها</title>
      </Helmet>
      <RequestView />
    </>
  );
}
