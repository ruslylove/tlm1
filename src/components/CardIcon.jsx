import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Avatar from '@material-ui/core/Avatar';



import { Typography, Button } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        maxWidth: 180,
        backgroundColor: '#fff8e1',
    },
    media: {
        height: 100,
        width: 100,
        padding: 'auto',
        margin: '20px auto auto auto',

    },
    font: {
        fontFamily: 'Prompt',
    }
});



function CardIcon(props) {
    const classes = useStyles();

    function handleClick() {
        props.onClick(props.id);
    }


    return <div>
        <Card className={classes.root}>
            <CardActionArea onClick={handleClick} style={{ textAlign: 'center' }}>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="Menu Item"
                />
                <CardContent>
                    <Typography className={classes.font} gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>;
}

export default CardIcon;