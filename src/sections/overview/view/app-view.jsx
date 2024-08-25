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
      <Sterpercrowd />
    </Container>
  );
}
