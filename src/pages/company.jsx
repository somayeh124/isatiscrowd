import { Helmet } from 'react-helmet-async';

import { CompanyView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export default function CompanyPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>
      <CompanyView />
    </>
  );
}
