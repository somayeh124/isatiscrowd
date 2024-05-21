import {
  Avatar,
  Button,
  CardActions,
  Container,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { useRouter } from 'src/routes/hooks';
import { setCookie } from 'src/api/cookie';

const CompanyCard = ({
  fullname,
  name,
  icon,
  allStockCompany,
  amount,
  symbol,
  allStockCompany_alpha,
  amount_alpha,
  type,
}) => {
  const router = useRouter();
  // console.log('CompanyCard', CompanyCard);

  const ToDashboard = () => {
    if (amount >= 0) {
      setCookie('sym', symbol, 1);
      router.push('/');
    }
  };
  return (
    <Container sx={{ position: 'relative' }}>
      <Avatar
        alt={name}
        src={`/img/${icon}`}
        sx={{
          width: 100,
          height: 100,
          position: 'absolute',
          top: -50,
          zIndex: 3,
          bgcolor: '#ffff',
          left: '50%',
        }}
      />
      <Card sx={{ minWidth: 280, height: 385 }}>
        <CardContent sx={{ justifyContent: 'center', marginTop: 5 }}>
          <Typography variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="h6" component="h4">
            {fullname}
          </Typography>
          <Typography variant="body1" component="h4">
            نوع شرکت:{' '}
            {type === 'NoBourse'
              ? type.replace('NoBourse', 'غیربورسی')
              : type.replace('Bourse', 'بورسی')}
          </Typography>
          <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          <ListItem sx={{ textAlign: 'start' }}>
            <ListItemText
              sx={{ marginLeft: 0.5 }}
              primary={<Typography variant="subtitle1">تعداد سهم </Typography>}
              secondary={amount.toLocaleString()}
            />
            <ListItemText
              primary={<Typography variant="subtitle1">تعداد کل‌ سهام شرکت</Typography>}
              secondary={Math.floor(allStockCompany).toLocaleString()}
            />

            {/* <ListItemText
              primary={<Typography variant="subtitle1">نوع شرکت</Typography>}
              secondary={type}
            /> */}
          </ListItem>
          <ListItem sx={{ mt: -1 , textAlign: 'start' }}>
            <ListItemText
            sx={{ ml:1 }}
              primary={
                <Typography variant="subtitle1" fontSize={11}>
                  {amount_alpha}
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontSize={11}>
                  {allStockCompany_alpha}
                </Typography>
              }
            />
          </ListItem>
        </CardContent>
        <CardActions>
          <Button
            disabled={amount <= 0}
            onClick={ToDashboard}
            size="medium"
            variant="text"
            color="info"
          >
            ورود
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

CompanyCard.propTypes = {
  fullname: PropTypes.any.isRequired, // یا PropTypes.object یا هر نوع دیگری که مناسب است
  name: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  allStockCompany: PropTypes.any.isRequired,
  amount: PropTypes.any.isRequired,
  symbol: PropTypes.any.isRequired,
  allStockCompany_alpha: PropTypes.any.isRequired,
  amount_alpha: PropTypes.any.isRequired,
  type: PropTypes.any.isRequired,
};

export default CompanyCard;
