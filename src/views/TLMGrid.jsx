import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TLMDetail from './TLMDetail';
import Button from '@material-ui/core/Button'
import AppsIcon from '@material-ui/icons/Apps';
import transformer from '../variables/transformerStub';
import Typography from "@material-ui/core/Typography"
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { fontSize } from '@material-ui/system';

import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
    PagingState,
    IntegratedPaging,
} from '@devexpress/dx-react-grid';

import {
    SortingState,
    IntegratedSorting,
    PagingPanel,
} from '@devexpress/dx-react-grid';


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
    banking: {
        backgroundColor: '#f5f5f5',
    },
    health: {
        backgroundColor: '#a2e2a4',
    },
    telecom: {
        backgroundColor: '#b3e5fc',
    },
    energy: {
        backgroundColor: '#ffcdd2',
    },
    insurance: {
        backgroundColor: '#f0f4c3',
    },

}));





export default function TLMGrid(props) {
    const classes = useStyles();



    //const columns = ["id", "area", "manufacturer", "rating", "voltage", "load_status", "voltage_status"];
    const [columns] = useState([
        {
            title: "รหัส", name: "id",
        },
        { title: "เขตพื้นที่", name: "area" },
        { title: "ผู้ผลิต", name: "manufacturer" },
        { title: "Rating [kVA]", name: "rating", },
        { title: "Voltage [kV]", name: "voltage", },

        {
            title: "สถานะโหลด",
            name: "load_status",

        },
        {
            title: "สถานะแรงดัน",
            name: "voltage_status",

        },

    ]);

    const [pageSizes] = useState([5, 10, 15, 0]);

    return (<div className={classes.root}>
        <Container className={classes.root} maxWidth="lg">
            <Typography variant="h4" className={classes.title}>รายการหม้อแปลง TLM</Typography>
            <Paper>
                <Grid
                    rows={transformer}
                    columns={columns}
                >
                    <SortingState />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={5}
                    />
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <IntegratedSorting />
                    <IntegratedPaging />

                    <Table />
                    <TableHeaderRow showSortingControls />

                </Grid>
            </Paper>

        </Container>
    </div>
    );
}