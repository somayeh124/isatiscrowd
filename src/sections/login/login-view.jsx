import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { getCookie, setCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);
  const [encrypted_response, setEncrypted_response] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const getCaptcha = () => {
    axios
      .get(`${OnRun}/api/captcha/`)
      .then((response) => {
        setEncrypted_response(response.data.captcha.encrypted_response);
        setCaptchaImage(response.data.captcha.image);
        console.log("Fdhdghdh")
      })
      .catch((err) => {
        console.log('error captcha', err);
      });
  };

  const applyNationalCode = () => {
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length !== 10) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      axios({
        method: 'POST',
        url: `${OnRun}/api/otp/`,
        data: {
          UserInput: { captcha: captchaInput, nationalCode },
          captchaCode: encrypted_response,
        },
      }).then((response) => {
        if (response.data.replay) {
          if (response.data.status === 'NotFund') {
            toast.warning('متاسفانه کد ملی وارد شده یافت نشد');
          } else if (response.data.status === 'RegisterDara') {
            toast.warning('متاسفانه کد ملی وارد شده یافت نشد');
          } else {
            setStep(2);
          }
        } else {
          toast.warning(response.data.msg);
        }
      });
    }
  };

  const handleCode = () => {
    if (otp.length !== 5) {
      toast.warning('کد صحیح نیست');
    } else {
      axios({
        method: 'POST',
        url: `${OnRun}/api/otp/`,
        data: { nationalCode, Code: otp },
      }).then((response) => {
        if (response.data.replay) {
          setCookie('phn', response.data.cookie, 1);
          router.push('/');
        } else {
          toast.warning(response.data.msg);
        }
      });
    }
  };

  const id = getCookie('phu');
  const AccessCheck = () => {
    if (id) {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/access`,
        data: { cookie: id },
      }).then((response) => {
        if (response.data.replay) {
          router.push('/');
        }
      });
    }
  };

  useEffect(getCaptcha, []);
  useEffect(AccessCheck, [id, router]);

  const renderForm = (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <TextField
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          label="شماره ملی"
          
        />

        {step === 1 ? (
          <>
            <TextField
              onChange={(e) => setCaptchaInput(e.target.value)}
              label="کپچا"
            value={captchaInput}
            />
            <Button onClick={getCaptcha}>
              <img src={`data:image/png;base64,${captchaImage}`} alt="captcha" />
            </Button>
            <Box sx={{ mb: 3 }} />
          </>
        ) : (
          <TextField value={otp} onChange={(e) => setOtp(e.target.value)} label="کد تایید" />
        )}
      </Stack>

      {step === 1 ? (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          onClick={applyNationalCode}
        >
          تایید
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleCode}
        >
          تایید
        </LoadingButton>
      )}
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
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            ایساتیس کراد
          </Typography>
          <Typography
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
            variant="h6"
          >
            {' '}
            درگاه سرمایه پذیران ایساتیس کراد{' '}
          </Typography>
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
