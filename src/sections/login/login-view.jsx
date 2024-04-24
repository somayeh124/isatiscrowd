import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Container } from '@mui/material';
import { OnRun } from 'src/api/OnRun';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);
  const [encrypted_response, setEncrypted_response] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const applyCptcha = () => {
    // router.push('/dashboard');
    setStep(2)
  };


  const getCaptcha = () => {
    axios
      .post(`${OnRun}/captcha`)
      .then((response) => {
        setEncrypted_response(response.data.encrypted_response);
        setCaptchaImage(response.data.image);
      })
      .catch((err) => {
        console.log("error captcha", err);
      });
  };


  const applyNationalCode = () => {
    if (captchaInput.length === 0) {
      setErrMsg("کد تصویر صحیح نیست");
    } else if (UserInput.nationalCode.length !== 10) {
      setErrMsg("مقدار کد ملی را به صورت صحیح وارد کنید");
    } else {
      axios({
        method: "POST",
        url: OnRun + "/dara/applynationalcode",
        data: { UserInput: UserInput, captchaCode: CaptchaCode },
      }).then((response) => {
        if (response.data.replay) {
          if (response.data.status === "NotFund") {
            setErrMsg("متاسفانه کد ملی وارد شده یافت نشد");
          } else if (response.data.status === "RegisterDara") {
            Navigate("register", {
              state: { nationalCode: UserInput["nationalCode"] },
            });
          } else {
            setStatus(response.data.status);
          }
        } else {
          setErrMsg(response.data.msg);
        }
      });
    }
  };

  useEffect(getCaptcha,[])

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField value={nationalCode} onChange={(e) => setNationalCode(e.target.value)} label="شماره ملی" />
        {
          step === 1 ?
            <Container>

              <TextField value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} label="کپچا" />
            </Container>
            :
            <TextField value={otp} onChange={(e) => setOtp(e.target.value)} label="کد تایید" />
        }
      </Stack>



      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={applyCptcha}
      >
        تایید
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <ToastContainer />
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">درگاه سهامداران</Typography>



          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ورود
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
