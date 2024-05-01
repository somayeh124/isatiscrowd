// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';
import { getCookie, setCookie } from 'src/api/cookie';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import AppWidgetSummary from '../app-widget-summary';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const id = getCookie('phn');
  const symbol = getCookie('sym');

  const [data, setData] = useState(null);

  const getCard = () => {
    axios
      .post(`${OnRun}/dara/static`, { cookie: id, symbol })
      .then((response) => {
        setData(response.data.dic);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  };

  const router = useRouter();


  const AccessCheck = () => {
    if (id) {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/access`,
        data: { cookie: id },
      }).then((response) => {
        if (!response.data.replay) {
          router.push('/login');
          setCookie('phu', '', 0);
        }
      });
    } else if (symbol) {
      router.push('/company');


    } else {
      router.push('/login');
      setCookie('phu', '', 0);

    }
  };

  useEffect(AccessCheck, [id, router, symbol]);
  useEffect(getCard, [id, symbol]);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        خوش آمدید 👋
      </Typography>
      {
        data ?
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="تعداد سهام"
                total={data.amount}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="کل سهام شرکت"
                total={data.number_shares}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="سرمایه شرکت"
                total={data.capital}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="تعداد سهام‌داران"
                total={data.Shareholders}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
              />
            </Grid>


          </Grid>
          : null
      }
    </Container>
  );
}
