import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TLMDetail from './TLMDetail';
import Button from '@material-ui/core/Button'
import AppsIcon from '@material-ui/icons/Apps';
import Grid from '@material-ui/core/Grid';
import transformer from '../stubs/transformerStub';
import Typography from "@material-ui/core/Typography"
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { fontSize } from '@material-ui/system';
import chartData from "../sd102";
import TimeSeries from "./TimeSeries";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppHomeButton from './AppHomeButton';
import FabMenuButtons from './FabMenuButtons';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '10px',
        height: '1000',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        paddingBottom: '5px',
        fontFamily: 'Prompt',

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));


function TLMUnit(props) {

    const classes = useStyles();
    let history = useHistory();

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };





    const columns = [
        { label: "Time", name: "recorded_date", },
        { label: "Va [V]", name: "V_A" },
        { label: "Vb [V]", name: "V_B" },
        { label: "Vc [V]", name: "V_C", },
        { label: "Ia [A]", name: "I_A" },
        { label: "Ib [A]", name: "I_B" },
        { label: "Ic [A]", name: "I_C", },
        { label: "Pa [kW]", name: "P_A", },
        { label: "Pb [kW]", name: "P_B", },
        { label: "Pc [kW]", name: "P_C", },
        { label: "Ea [kWh]", name: "ENERGY_A", },
        { label: "Eb [kWh]", name: "ENERGY_B", },
        { label: "Ec [kWh]", name: "ENERGY_C", },

    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        selectableRows: false,
    };

    function getValue() {

        var v = [['Time', 'Va', 'Vb', 'Vc']];
        var i = [['Time', 'Ia', 'Ib', 'Ic']];
        var s = [['Time', 'Sa', 'Sb', 'Sc']];
        var p = [['Time', 'Pa', 'Pb', 'Pc']];
        var q = [['Time', 'Qa', 'Qb', 'Qc']];
        var t = [['Time', 'Tempterature']];

        chartData.slice(0, 100).map((item, index) => {
            v = [...v, [item.recorded_date, Number(item.V_A), Number(item.V_B), Number(item.V_C)]];
            i = [...i, [item.recorded_date, Number(item.I_A), Number(item.I_B), Number(item.I_C)]];
            s = [...s, [item.recorded_date, Number(item.S_A), Number(item.S_B), Number(item.S_C)]];
            p = [...p, [item.recorded_date, Number(item.P_A), Number(item.P_B), Number(item.P_C)]];
            q = [...q, [item.recorded_date, Number(item.Q_A), Number(item.Q_B), Number(item.Q_C)]];
            t = [...t, [item.recorded_date, Number(item.ambient_temp)]];

        })
        return [v, i, s, p, q, t];
    }

    var [v, i, s, p, q, t] = getValue();

    //console.log(value);

    function handleClick() {
        history.push("/home");
    }


    return (<div className={classes.root}>
        <Container className={classes.root} maxWidth="lg">
            <Typography variant="h4" className={classes.title}>รายละเอียดหม้อแปลง TLM</Typography>
            <Grid container direction="column" spacing={2} justified="center"
            > <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">TLM ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>SD101</MenuItem>
                            <MenuItem value={20}>SD102</MenuItem>
                            <MenuItem value={30}>SD103</MenuItem>
                        </Select>
                        <FormHelperText>เลือกหมายเลข TLM</FormHelperText>
                    </FormControl>
                </Grid>


                <Grid item xs={12} style={{ height: '800' }}>
                    <MUIDataTable
                        title={null}
                        data={chartData.slice(chartData.length - 20, chartData.length)}
                        columns={columns}
                        options={options}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TimeSeries data={v} title="Voltage" subtitle="last 100 entries" yAxis="Volts" />
                </Grid>
                <Grid item xs={12} >
                    <TimeSeries data={i} title="Current" subtitle="last 100 entries" yAxis="Amps" />
                </Grid>
                <Grid item xs={12} >
                    <TimeSeries data={s} title="Apparant Power" subtitle="last 100 entries" yAxis="kVAR" />
                </Grid>
                <Grid item xs={12} >
                    <TimeSeries data={p} title="Active Power" subtitle="last 100 entries" yAxis="kW" />
                </Grid>
                <Grid item xs={12} >
                    <TimeSeries data={q} title="Reactive Power" subtitle="last 100 entries" yAxis="kVA" />
                </Grid>
                <Grid item xs={12} >
                    <TimeSeries data={t} title="Temperature" subtitle="last 100 entries" yAxis="Celcius" />
                </Grid>

                <Grid item xs={12}>
                    <AppHomeButton />
                </Grid>
                <Grid item xs={12} alignContent='flex-end' >
                    <span style={{ position: 'fixed', right: '30px', bottom: '2rem' }}>
                        <FabMenuButtons onClick={handleClick} />
                    </span>
                </Grid>
            </Grid>
        </Container>
    </div>
    );
}

export default TLMUnit;