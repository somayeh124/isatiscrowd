import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Sterpercrowd from 'src/components/sterpercrowd';
import { useEffect, useState } from 'react';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';

export default function AppView() {
    const access = getCookie('access');
  
    const getProfile = () => {
      axios.get(`${OnRun}/profile`,{"Content-Type": "application/json", "Accept": "application/json","Authorization": `Bearer ${access}`})
      .then(response=>{
        setProfileData(response.data);
      })
    }
  
    const [profileData, setProfileData] = useState(null);
  
    useEffect(getProfile, [access]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">{profileData.name} </Typography>
          خوش آمدید 👋
        </Grid>
      </Grid>
      <Sterpercrowd />
    </Container>
  );
}
