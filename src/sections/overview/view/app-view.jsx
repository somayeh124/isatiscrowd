import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// import { getCookie } from 'src/api/cookie';
// import axios from 'axios';
// import { OnRun } from 'src/api/OnRun';
// import { useEffect } from 'react';
// import { useRouter } from 'src/routes/hooks';
import { useQuery } from '@tanstack/react-query';
import Sterpercrowd from 'src/components/sterpercrowd';
// import AppWidgetSummary from '../app-widget-summary';

export default function AppView() {
  // const id = getCookie('phn');
  // const symbol = getCookie('sym');

  // const router = useRouter();
  const data = [
    { name: 'محمدی' },

  ];

  // const newGetCard = async () => {
  //   const response = await axios.post(`${OnRun}/dara/static`, { cookie: id, symbol });
  //   return response.data;
  // };

  const { data: cardData, error, isLoading } = useQuery({
    // queryKey: ['newGetCard', id, symbol],
    // queryFn: newGetCard,
  });

  console.log('====================================');
  console.log(cardData, error, isLoading);
  console.log('====================================');

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Typography variant="h6">        خوش آمدید 👋
            {item.name}</Typography>
          </Grid>
         
        ))}
      </Grid>
      <Sterpercrowd/>
    </Container>
  );
}
