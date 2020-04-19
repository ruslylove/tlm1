import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardItem from './CardItem';
import transformer from '../stubs/transformerStub';
import { blueGrey } from '@material-ui/core/colors';
import PieStatus from './PieStatus';
import AppHomeButton from './AppHomeButton';




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





export default function TLMCard(props) {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h4" className={classes.title}>ข้อมูล และสถิติหม้อแปลง TLM</Typography>
            <Grid container spacing={3} alignItems="center" alignContent='center' justify="center">

                <Grid item xs={12} sm={6} >
                    <PieStatus chartData={loadData} field="count" title="สถานะโหลด" scheme={lcolor} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <PieStatus chartData={voltData} field="count" title="สถานะแรงดัน" scheme={vcolor} />
                </Grid>
                <Grid item xs={12} >
                    <AppHomeButton />
                </Grid>



            </Grid>
        </Container>
    );
}