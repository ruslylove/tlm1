import React, { useState } from "react";


// resources
import LineChart from "../components/LineChart";
import sd102 from "../variables/sd102.js";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import AppsIcon from '@material-ui/icons/Apps';
import Grid from '@material-ui/core/Grid';
import transformer from '../variables/transformerStub';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { fontSize } from '@material-ui/system';
import FormHelperText from '@material-ui/core/FormHelperText';
import { grey } from '@material-ui/core/colors';
import Paper from "@material-ui/core/Paper";




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '10px',
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
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(10)
  }
}));

function getValue(data) {
  var v = [[], [], []];
  var i = [[], [], []];
  var s = [[], [], []];
  var p = [[], [], []];
  var q = [[], [], []];
  var t = [];
  var time = [];

  data.map((item, index) => {
    time = [...time, item.recorded_date];
    v[0] = [...v[0], Number(item.V_A)];
    v[1] = [...v[1], Number(item.V_B)];
    v[2] = [...v[2], Number(item.V_C)];

    i[0] = [...i[0], Number(item.I_A)];
    i[1] = [...i[1], Number(item.I_B)];
    i[2] = [...i[2], Number(item.I_C)];

    s[0] = [...s[0], Number(item.S_A)];
    s[1] = [...s[1], Number(item.S_B)];
    s[2] = [...s[2], Number(item.S_C)];

    p[0] = [...p[0], Number(item.P_A)];
    p[1] = [...p[1], Number(item.P_B)];
    p[2] = [...p[2], Number(item.P_C)];

    q[0] = [...q[0], Number(item.Q_A)];
    q[1] = [...q[1], Number(item.Q_B)];
    q[2] = [...q[2], Number(item.Q_C)];

    t = [...t, Number(item.ambient_temp)];
    return null;
  });
  return [v, i, s, p, q, t, time];
}

var [v, i, s, p, q, t, time] = getValue(sd102);

const len = sd102.length;

export default function ChartPanel() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedV: true,
    checkedI: true,
    checkedS: false,
    checkedP: false,
    checkedQ: false,
    checkedT: false
  });

  const [age, setAge] = React.useState('');

  const handleTChange = (event) => {
    setAge(event.target.value);
  };

  const handleCBChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [period, setPeriod] = useState(100);

  /*   const handleChange = event => {
    event.preventDefault();
    setPeriod(event.target.value);
  }; */

  const handleChange = (event, newValue) => {
    setPeriod(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }


  const columns = [
    { label: "Time", name: "recorded_date", },
    {
      label: "Va [V]", name: "V_A",
      options: {
        filter: true,
        setCellProps: (value) => (
          { style: { backgroundColor: grey[50] } }
        )
      },
    },
    {
      label: "Vb [V]", name: "V_B",
      options: {
        filter: true,
        setCellProps: (value) => (
          { style: { backgroundColor: grey[50] } }
        )
      },
    },
    {
      label: "Vc [V]", name: "V_C",
      options: {
        filter: true,
        setCellProps: (value) => (
          { style: { backgroundColor: grey[50] } }
        )
      },
    },
    { label: "Ia [A]", name: "I_A" },
    { label: "Ib [A]", name: "I_B" },
    { label: "Ic [A]", name: "I_C", },
    {
      label: "Pa [kW]", name: "P_A",
      options: {
        filter: true,
        setCellProps: (value) => (
          { style: { backgroundColor: grey[50] } }
        )
      },
    },
    {
      label: "Pb [kW]", name: "P_B", options: {
        filter: true,
        setCellProps: (value) => (
          { style: { backgroundColor: grey[50] } }
        )
      },
    },
    {
      label: "Pc [kW]", name: "P_C", options: {
        filter: true,
        setCellProps: (value) => (
          { style: { backgroundColor: grey[50] } }
        )
      },
    },
    { label: "Ea [kWh]", name: "ENERGY_A", },
    { label: "Eb [kWh]", name: "ENERGY_B", },
    { label: "Ec [kWh]", name: "ENERGY_C", },

  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'scrollMaxHeight',
    selectableRows: false,
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      <Typography variant="h4" className={classes.title}>ค่าบันทึกของหม้อแปลง TLM</Typography>
      <Grid container direction="column" spacing={2} justified="center">
        <Grid item xs={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">TLM ID</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              onChange={handleTChange}
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
            data={sd102.slice(sd102.length - 20, sd102.length)}
            columns={columns}
            options={options}
          />
        </Grid>

        <Grid item xs={6}>
          <Paper>
            <FormControl className={classes.formControl}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedV}
                      onChange={handleCBChange}
                      name="checkedV"
                      color="primary"
                    />
                  }
                  label="V"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedI}
                      onChange={handleCBChange}
                      name="checkedI"
                      color="primary"
                    />
                  }
                  label="I"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedS}
                      onChange={handleCBChange}
                      name="checkedS"
                      color="primary"
                    />
                  }
                  label="S"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedP}
                      onChange={handleCBChange}
                      name="checkedP"
                      color="primary"
                    />
                  }
                  label="P"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedQ}
                      onChange={handleCBChange}
                      name="checkedQ"
                      color="primary"
                    />
                  }
                  label="Q"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedT}
                      onChange={handleCBChange}
                      name="checkedT"
                      color="primary"
                    />
                  }
                  label="Temperature"
                />
              </FormGroup>
              <Typography id="discrete-slider" variant="subtitle1" gutterBottom>
                History values <em>(last {period} points)</em>
              </Typography>
              <Slider
                defaultValue={100}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={450}
                value={period}
                onChange={handleChange}
              />
            </FormControl>
          </Paper>
        </Grid>



        {state.checkedV && (
          <Grid item xs={12} >
            <LineChart
              time={time.slice(len - period, len - 1)}
              value={v.map(item => {
                return item.slice(len - period, len - 1);
              })}
              label={["Va", "Vb", "Vc"]}
              yLabel={["Voltage [V]"]}
              threshold={{ name: "over voltage threshold", value: 240 }}
              value={v.map(item => {
                return item.slice(len - period, len - 1);
              })}
              label={["Va", "Vb", "Vc"]}
              yLabel={["Voltage [V]"]}
              threshold={{ name: "over voltage threshold", value: 240 }}
            />
          </Grid>
        )}
        {state.checkedI && (
          <Grid item xs={12} >

            <LineChart
              time={time.slice(len - period, len - 1)}
              value={i.map(item => {
                return item.slice(len - period, len - 1);
              })}
              label={["Ia", "Ib", "Ic"]}
              yLabel={["Current [A]"]}
            />
          </Grid>
        )}
        {state.checkedS && (
          <Grid item xs={12} >
            <LineChart
              time={time.slice(len - period, len - 1)}
              value={s.map(item => {
                return item.slice(len - period, len - 1);
              })}
              label={["Sa", "Sb", "Sc"]}
              yLabel={["Apparent Power [kVA]"]}
              total
              threshold={{ name: "Power Rating", value: 500 }}
            />
          </Grid>
        )}
        {state.checkedP && (
          <Grid item xs={12} >
            <LineChart
              time={time.slice(len - period, len - 1)}
              value={p.map(item => {
                return item.slice(len - period, len - 1);
              })}
              label={["Pa", "Pb", "Pc"]}
              yLabel={["Active Power [kW]"]}
              total
            />
          </Grid>
        )}
        {state.checkedQ && (
          <Grid item xs={12} >
            <LineChart
              time={time.slice(len - period, len - 1)}
              value={q.map(item => {
                return item.slice(len - period, len - 1);
              })}
              label={["Qa", "Qb", "Qc"]}
              yLabel={["Reactive Power [kVAR]"]}
              total
            />
          </Grid>
        )}
        {state.checkedT && (
          <Grid item xs={12} >
            <LineChart
              time={time.slice(len - period, len - 1)}
              value={[t.slice(len - period, len - 1)]}
              label={["temperature"]}
              yLabel={["Temperature [Celcius]"]}
            />
          </Grid>
        )}
      </Grid>
    </Container>

  );
}
