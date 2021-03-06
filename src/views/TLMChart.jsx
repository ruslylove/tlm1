import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import transformer from '../variables/transformerStub';
import FabHomeButton from '../components/FabHomeButton';
import PieChart from '../components/PieChart'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";




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

const load_tag = ["tag is-dark", "tag is-info", "tag is-success", "tag is-warning", "tag is-danger"];
const voltage_tag = ["tag is-dark", "tag is-warning", "tag is-success", "tag is-danger"];

//const columns = ["id", "area", "manufacturer", "rating", "voltage", "load_status", "voltage_status"];


const options = {
    filterType: 'dropdown',
    //responsive: 'scrollMaxHeight',
    selectableRows: false,
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 50, 100],
};



export default function TLMChart(props) {
    const classes = useStyles();
    var [data, setData] = useState([]);
    var [title, setTitle] = useState('');
    let history = useHistory();

    var getMuiTheme = (color) => createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    backgroundColor: color
                }
            }
        }
    })

    const columns = [
        {
            label: "รหัส", name: "id",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return <button onClick={(e) => handleIdClick(e, value)} class="button is-dark is-small is-outlined">{value}</button>;
                },
            }
        },
        { label: "เขตพื้นที่", name: "area" },
        { label: "ผู้ผลิต", name: "manufacturer" },
        { label: "Rating [kVA]", name: "rating", },
        { label: "Voltage [kV]", name: "voltage", },
        {
            label: "สถานะโหลด",
            name: "load_status",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return <span class={load_tag[value]} >{load[value]}</span>;
                },
            },
        },
        {
            label: "สถานะแรงดัน",
            name: "voltage_status",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return <span class={voltage_tag[value]}>{voltage[value]}</span>;
                },
            },
        },

    ];

    function handleChartClick(index, id) {
        data = transformer;
        setData(data.filter((tr) => {
            return (id === 'load' ? tr.load_status === index : tr.voltage_status === index);
        }));
        setTitle('หม้อแปลงสถานะ' + (id === 'load' ? 'โหลด: ' + load[index] : 'แรงดัน: ' + voltage[index]));
    }

    const handleIdClick = (e, value) => {
        history.push('/detail/' + value);
    };

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h4" className={classes.title}>ค้นหาหม้อแปลงตามสถานะ</Typography>
            <Grid container spacing={3} alignItems="center" alignContent='center' justify="center">

                <Grid item xs={12} sm={6} >
                    <PieChart id="load" chartData={loadData} field="count" title="สถานะโหลดปัจจุบัน" scheme={lcolor} chartClick={handleChartClick} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <PieChart id="voltage" chartData={voltData} field="count" title="สถานะแรงดันปัจจุบัน" scheme={vcolor} chartClick={handleChartClick} />
                </Grid>
                <Grid item xs={12} >
                    <MuiThemeProvider >
                        <MUIDataTable
                            title={title}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>

                </Grid>

                <Grid item xs={12} style={{ position: 'sticky', bottom: 80 }}>
                    <FabHomeButton />
                </Grid>

            </Grid>
        </Container>
    );
}