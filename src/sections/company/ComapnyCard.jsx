import { Avatar, Button, CardActions, Container, ListItem, ListItemText, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { useRouter } from 'src/routes/hooks';
import { setCookie } from "src/api/cookie";




const CompanyCard = ({ fullname, name, icon, allStockCompany, amount, symbol }) => {
  const router = useRouter();

    const ToDashboard = ()=>{
        if (amount>0) {
          setCookie("sym", symbol, 1);
          router.push("/");
        }
    }
    return (
        <Container sx={{ position: 'relative' }}>
            <Avatar alt={name} src={`/img/${icon}`} sx={{ width: 100, height: 100, position: 'absolute', top: -50, zIndex: 3, bgcolor: "#fff", left: "50%" }} />
            <Card sx={{ minWidth: 275, height: 270 }} >
                <CardContent sx={{ justifyContent: "center", marginTop: 5 }}>
                    <Typography variant="h4" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="h6" component="h4">
                        {fullname}
                    </Typography>
                    <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                    <ListItem>
                        <ListItemText
                            primary="تعداد سهم"
                            secondary={(amount).toLocaleString()}
                        />
                        <ListItemText
                            primary="سهام شرکت"
                            secondary={Math.floor(allStockCompany).toLocaleString()}
                        />
                    </ListItem>
                </CardContent>
                <CardActions>
                    <Button disabled={amount<=0} onClick={ToDashboard} size="small">مشاهده</Button>
                </CardActions>

            </Card>
        </Container>
    )
}

CompanyCard.propTypes = {
    fullname: PropTypes.any.isRequired, // یا PropTypes.object یا هر نوع دیگری که مناسب است
    name: PropTypes.any.isRequired,
    icon: PropTypes.any.isRequired,
    allStockCompany: PropTypes.any.isRequired,
    amount: PropTypes.any.isRequired,
    symbol: PropTypes.any.isRequired,
};


export default CompanyCard