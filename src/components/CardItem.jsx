import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import tr5 from '../images/5.jpg';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';









const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    manu: {
        marginTop: 10,
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',

        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function CardItem(props) {
    const classes = useStyles();
    const tran = props.detail;
    const a = tran.area.substring(0, 1);

    const load = ["No load", "Low load", "Normal load", "High load", "Over load"];
    const voltage = ["No voltage", "Under voltage", "Normal voltage", "Over voltage"];
    const color = ['#2196f3', '#ffc107', '#4caf50', '#ff5722', '#f44336'];


    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {a}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={tran.id}
                    subheader="Installed on September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {tran.id}
                    </Typography>
                    <div className={classes.chip} >
                        <Chip color="primary" label={tran.area} avatar={<Avatar>{a}</Avatar>} />
                        <Chip variant="outlined" label={tran.rating + " kVA"} />
                        <Chip variant="outlined" label={tran.voltage + " kV"} />


                    </div>
                    <div className={classes.chip} >
                        <Chip color="secondary" style={{ backgroundColor: color[tran.voltage_status] }} label={voltage[tran.voltage_status]} />
                        <Chip color="secondary" style={{ backgroundColor: color[tran.load_status] }} label={load[tran.load_status]} />
                    </div>


                    <Typography className={classes.manu} variant="body2" color="textSecondary" component="p">
                        ผู้ผลิต: {tran.manufacturer}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button size="small" color="primary">
                    Time-series
          </Button>
                <Button size="small" color="primary">
                    Location
          </Button>
            </CardActions>
        </Card>


    );
}