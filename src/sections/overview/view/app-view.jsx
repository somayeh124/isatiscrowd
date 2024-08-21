/* eslint-disable react-hooks/exhaustive-deps */
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

  const [profileData, setProfileData] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(`${OnRun}/api/information/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    if (access) {
      getProfile();
    }
  }, [access]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {profileData && profileData.acc && profileData.acc.private_person && (
          <Grid item xs={12} sm={6} md={3}>
            <div className="flex">
              <Typography variant="h6">{profileData.acc.private_person[0].firstName}</Typography>
              <Typography variant="h6" sx={{ ml: 1 }}>{profileData.acc.private_person[0].lastName}</Typography>
            </div>
            خوش آمدید 👋
          </Grid>
        )}
      </Grid>
      <Sterpercrowd />
    </Container>
  );
}
