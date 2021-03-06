import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import { Map } from '@esri/react-arcgis';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';
import PointGraphic from './PointGraphic';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        backgroundColor: '#fff',
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
    extendedIcon: {
        margin: theme.spacing(1),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function CardItem(props) {
    const classes = useStyles();
    const [fav, setFav] = useState(false);

    useEffect(() => {
        if (props.fav) {
            setFav(true);
        }
    }, []);


    const tran = props.detail;
    const a = tran.area.substring(0, 1);


    const load = ["No load", "Low load", "Normal load", "High load", "Over load"];
    const voltage = ["No voltage", "Under voltage", "Normal voltage", "Over voltage"];
    const color = ['#2196f3', '#ffc107', '#4caf50', '#ff5722', '#f44336'];

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const long = Number(tran.long);
    const lat = Number(tran.lat);

    return (
        <Card className={classes.card}>
        <Link to={'/detail/' + tran.id}>
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
            </Link>
            <CardActions>
                <IconButton aria-label="add to favorites" onClick={(e) => {
                    if (!fav) {
                        setFav(true);
                        props.onFavClick(tran);
                    } else {
                        setFav(false);
                        props.onUnFavClick(tran);
                    }
                }}>
                    <FavoriteIcon color={fav ? "secondary" : "disabled"} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    style={{ marginLeft: 'auto' }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider variant="middle" />
                <CardContent style={{ textAlign: 'center' }}>
                    <div className="table-container">
                        <table className="table is-striped is-narrow">
                            <tr className="th">
                                <th>Electrical Quantity</th>
                                <th>Phase-A</th>
                                <th>Phase-B</th>
                                <th>Phase-C</th>
                            </tr>
                            <tr>
                                <td>Voltage</td>
                                <td>230.71</td>
                                <td>230.99</td>
                                <td>230.88</td>
                            </tr>
                            <tr>
                                <td>Current</td>
                                <td>153.28</td>
                                <td>163.84</td>
                                <td>92.96</td>
                            </tr>
                            <tr>
                                <td>Power</td>
                                <td>31.07</td>
                                <td>33.38</td>
                                <td>18.31</td>
                            </tr>
                            <tr>
                                <td>Energy Acc.</td>
                                <td>1,568,240</td>
                                <td>1,776,650</td>
                                <td>887,573</td>
                            </tr>
                        </table>
                        <Typography variant="body2" gutterBottom>Updated on 20/03/2020 10:12:52</Typography>

                    </div>
                    <Map
                        style={{ width: '300px', height: '300px' }}
                        mapProperties={{ basemap: 'streets' }}
                        viewProperties={{
                            center: [Number(tran.Long), Number(tran.lat)],
                            zoom: 18
                        }}
                    >
                        <PointGraphic lat={tran.lat} long={tran.Long} />
                    </Map>
                    <Fab variant="extended" color="primary" className={classes.extendedIcon} size="medium"
                        onClick={() => window.open("http://map.google.com?q=" + tran.lat + "," + tran.Long, "_blank")} >
                        <NavigationIcon className={classes.extendedIcon} />
                        Navigate
                    </Fab>
                </CardContent>
            </Collapse>
        </Card >


    );
}