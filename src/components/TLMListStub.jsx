import React, { useState, useEffect } from 'react';
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
import { useHistory } from "react-router-dom";
import FabMenuButtons from './FabMenuButtons';
import AppHomeButton from './AppHomeButton';

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

}));



function TLMListStub(props) {
    const classes = useStyles();
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }



    const load = ["No load", "Low load", "Normal load", "High load", "Over load"];
    const voltage = ["No voltage", "Under voltage", "Normal voltage", "Over voltage"];
    const load_tag = ["tag is-dark", "tag is-info", "tag is-success", "tag is-warning", "tag is-danger"];
    const voltage_tag = ["tag is-dark", "tag is-warning", "tag is-success", "tag is-danger"];

    //const columns = ["id", "area", "manufacturer", "rating", "voltage", "load_status", "voltage_status"];
    const columns = [
        {
            label: "รหัส", name: "id",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return <button class="button is-dark is-small is-outlined">{value}</button>;
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
                sort: false,
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
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return <span class={voltage_tag[value]}>{voltage[value]}</span>;
                },
            },
        },

    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        selectableRows: false,
        rowsPerPage: 20,
        rowsPerPageOptions: [20, 50, 100],
    };

    return (<div className={classes.root}>
        <Container className={classes.root} maxWidth="lg">
            <Typography variant="h4" className={classes.title}>รายการหม้อแปลง TLM</Typography>
            <Grid container direction="column" spacing={2} justified="center"
            >
                <Grid item xs={12} style={{ height: '1200' }}>
                    <MUIDataTable
                        title={null}
                        data={transformer}
                        columns={columns}
                        options={options}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AppHomeButton />
                </Grid>
            </Grid>
        </Container>
    </div>
    );
}

export default TLMListStub;