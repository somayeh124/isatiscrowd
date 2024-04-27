import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { posts } from 'src/_mock/blog';


import { getCookie, setCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import PostCard from '../post-card';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function CompanyView() {

  const [personal,setPersonal] =useState(null)


  const id = getCookie("phn");
  const router = useRouter();

  const AccessCheck = () => {
    if (id) {
      axios({
        method: "POST",
        url: `${OnRun}/dara/access`,
        data: { cookie:id },
      }).then((response) => {
        console.log(response.data)
        if (response.data.replay) {
          setPersonal(response.data)
        }else{
          router.push("/login");
          setCookie('phu','',0)

        }
      });
    }
  };
  useEffect(AccessCheck,[id,router])



  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{marginTop:5}}>
        {personal?
          <Typography variant="h4">{personal['نام و نام خانوادگی']}</Typography>
          :null
        }

        <Button variant="contained" color="inherit" >
          خروج
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
