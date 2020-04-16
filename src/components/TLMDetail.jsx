import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import tr5 from '../images/5.jpg';
import { Map } from '@esri/react-arcgis';
import { Scene } from '@esri/react-arcgis';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: 300
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        width: 256,
        height: 256,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


function TLMDetail(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container className={classes.root}>
                <Grid item xs={4}>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="transformer" src={tr5} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={4}>
                    <Map className={classes.img} style={{ width: '256px', height: '200px' }}
                        mapProperties={{ basemap: 'topo-vector' }}
                        viewProperties={{
                            center: [100.523708, 13.671469],
                            zoom: 18
                        }}
                    />
                </Grid>
                Hello world + {props.id}
            </Grid>
        </Paper>
    );
}

export default TLMDetail;