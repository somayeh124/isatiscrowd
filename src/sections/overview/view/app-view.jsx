import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// import { getCookie, setCookie } from 'src/api/cookie';
// import axios from 'axios';
// import { OnRun } from 'src/api/OnRun';
// import { useEffect } from 'react';
// import { useRouter } from 'src/routes/hooks';
// import { useQuery } from '@tanstack/react-query';
import Sterpercrowd from 'src/components/sterpercrowd';

export default function AppView() {
  // const id = getCookie('phn');
  // const symbol = getCookie('sym');
  // const router = useRouter();

  // const AccessCheck = () => {
  //   if (id) {
  //     axios.post(`${OnRun}/`, { cookie: id }).then((response) => {
  //       if (!response.data.replay) {
  //         router.push('/login');
  //         setCookie('phu', '', 0);
  //       }
  //     });
  //   } else {
  //     router.push('/login');
  //     setCookie('phu', '', 0);
  //   }
  // };

  // const newGetCard = async () => {
  //   const response = await axios.post(`${OnRun}/dara/static`, { cookie: id, symbol });
  //   return response.data;
  // };

  // const { data: cardData, error, isLoading } = useQuery({
  //   queryKey: ['newGetCard', id, symbol],
  //   queryFn: newGetCard,
  // });

  // useEffect(AccessCheck, [id, router, symbol]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">آقای محمدی</Typography>
          خوش آمدید 👋
        </Grid>
      </Grid>
      <Sterpercrowd />
    </Container>
  );
}
