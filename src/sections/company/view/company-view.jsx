import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import PostSearch from '../post-search';
import CompanyCard from '../ComapnyCard';
import CompanyCardSkeleton from '../ComapnyCardSkeleton';

// ----------------------------------------------------------------------

export default function CompanyView() {
  const [personal, setPersonal] = useState(null);
  const [company, setCompany] = useState(null);
  const [Searche, setSearche] = useState('');
  const [companyFiltered, setCompanyFiltered] = useState('');

  const id = getCookie('phn');
  const router = useRouter();

  const AccessCheck = () => {
    if (id) {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/access`,
        data: { cookie: id },
      }).then((response) => {
        if (response.data.replay) {
          setPersonal(response.data);
        } else {
          router.push('/login');
          setCookie('phu', '', 0);
        }
      });
    }
  };

  const exit = () => {
    router.push('/login');
    setCookie('phu', '', 0);
  };

  const get_conpany = () => {
    axios.post(`${OnRun}/dara/getcompany`, { cookie: id }).then((response) => {
      if (response.data.replay) {
        setCompany(response.data.df);
      }
    });
  };

  const Filter = () => {
    if (company) {
      setCompanyFiltered(company.filter((item) => item.fullname.includes(Searche)));
    }
  };

  useEffect(AccessCheck, [id, router]);
  useEffect(get_conpany, [id]);
  useEffect(Filter, [Searche, company]);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ marginTop: 5, fontFamily: 'IranSans', maxWidth: '100%' }}
      >
        {personal ? (
          <Typography sx={{ display: 'flex' }} color="#1a237e" variant="h4">
            سهامدار محترم {'  '}
            <Typography variant="h4" color="#283593" fontSize={35} fontStyle="bold" sx={{ px: 1 }}>
              {'  '}
              {personal['نام و نام خانوادگی']}
            </Typography>
            {'  '}
            خوش‌آمدید.
          </Typography>
        ) : null}

        <Button onClick={exit} variant="contained" color="inherit">
          خروج
        </Button>
      </Stack>
      {company ? (
        <Stack
          mb={3}
          direction="row"
          sx={{ paddingX: 10 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <PostSearch setSearche={setSearche} />
        </Stack>
      ) : null}

      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        {companyFiltered ? (
          companyFiltered.map(
            ({
              fullname,
              name,
              icon,
              allStockCompany,
              amount,
              symbol,
              allStockCompany_alpha,
              amount_alpha,
              type,
            }) => (
              <Grid
                key={fullname}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                sx={{ marginTop: 6, width: '100%' }}
              >
                <CompanyCard
                  fullname={fullname}
                  name={name}
                  icon={icon}
                  allStockCompany={allStockCompany}
                  amount={amount}
                  symbol={symbol}
                  allStockCompany_alpha={allStockCompany_alpha}
                  amount_alpha={amount_alpha}
                  type={type}
                />
              </Grid>
            )
          )
        ) : (
          <>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3} xl={3} sx={{ marginTop: 5 }}>
              <CompanyCardSkeleton />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
