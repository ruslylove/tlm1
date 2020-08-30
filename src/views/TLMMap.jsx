import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardItem from '../components/CardItem';
import transformer from '../variables/transformerStub';
import { blueGrey } from '@material-ui/core/colors';
import PieStatus from '../components/PieStatus';
import { Map } from '@esri/react-arcgis';
import { WebMap, WebScene } from '@esri/react-arcgis';
import AppHomeButton from '../components/AppHomeButton';
import FabHomeButton from '../components/FabHomeButton';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        paddingTop: 10,
    },
    card: {
        maxWidth: 300,
    },
    media: {
        height: 140,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        paddingBottom: '30px',
        fontFamily: 'Prompt',

    },
});

const load = ["No load", "Low load", "Normal load", "High load", "Over load"];
const voltage = ["No voltage", "Under voltage", "Normal voltage", "Over voltage"];

var l_statuses = Array(5).fill(0);
var v_statuses = Array(4).fill(0);

var loadData = [];
var voltData = [];

transformer.map((val) => {
    l_statuses[val.load_status]++;
    v_statuses[val.voltage_status]++;
});

l_statuses.map((val, index) => {
    loadData = [...loadData, { type: load[index], count: val }];
});

v_statuses.map((val, index) => {
    voltData = [...voltData, { type: voltage[index], count: val }];
});

const lcolor = ['#2196f3', '#ffeb3b', '#4caf50', '#ff9800', '#f44336'];
const vcolor = ['#2196f3', '#ffeb3b', '#4caf50', '#f44336'];





export default function TLMMap(props) {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h4" className={classes.title}>แผนที่พิกัตตำแหน่งหม้อแปลง TLM</Typography>
            <Grid container spacing={3} alignItems="center" alignContent='center' justify="center">

                <Grid item  >
                    <WebMap id="e737e5e31a1e4ea8a9e4b06ef35d6f10" class="full-screen-map" style={{ width: '1024px', height: '600px' }} />

                </Grid>
                <Grid item xs={12} style={{ position: 'sticky', bottom: 80 }} >
                    <FabHomeButton />
                </Grid>



            </Grid>
        </Container>
    );
}