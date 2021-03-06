import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TLMDetail from './TLMDetail';
import Button from '@material-ui/core/Button'
import AppsIcon from '@material-ui/icons/Apps';
import Grid from '@material-ui/core/Grid';
import transformer from '../variables/transformerStub';
import Typography from "@material-ui/core/Typography"
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { fontSize } from '@material-ui/system';


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



function TLMList(props) {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://192.168.2.43:4000/transformers').then(response => {
                //               console.log(response);
                var data = parseData(response.data);
                setData(data);
            }).catch(function (error) {
                console.log(error);
            });

        };

        fetchData();
    }, []);

    function parseData(data) {

        const load = ["No load", "Low load", "Normal load", "High load", "Over load"];
        const voltage = ["No voltage", "Under voltage", "Normal voltage", "Over voltage"];

        data.map((item) => {
            item.voltage_status = voltage[Number(item.voltage_status)];
            item.load_status = load[Number(item.load_status)];
        })

        return data;
    }

    //const columns = ["id", "area", "manufacturer", "rating", "voltage", "load_status", "voltage_status"];
    const columns = [
        {
            label: "รหัส", name: "id",
            options: {
                filter: false,
                sort: true,
                setCellProps: (value) => (value === 'SD101' && { style: { textDecoration: 'underline' } }),
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
                setCellProps: (value) => {
                    if (value === 'Over load') {
                        return ({ style: { color: 'red', fontWegiht: 'bold' } });
                    } else if (value === 'High load') {
                        return ({ style: { color: 'orange' } });
                    }
                },
            },
        },
        {
            label: "สถานะแรงดัน",
            name: "voltage_status",
            options: {
                filter: true,
                sort: false,
                setCellProps: (value) => {
                    if (value === 'Over voltage') {
                        return ({ style: { color: 'red' } });
                    } else if (value === 'Under load') {
                        return ({ style: { color: 'orange' } });
                    }
                },
            },
        },

    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'scrollMaxHeight',
        selectableRows: false,
    };

    const load = ["No load", "Low load", "Normal load", "High load", "Over load"];
    const voltage = ["No voltage", "Under voltage", "Normal voltage", "Over voltage"];




    return (<div className={classes.root}>
        <Container className={classes.root} maxWidth="lg">
            <Typography variant="h4" className={classes.title}>รายการหม้อแปลง TLM</Typography>
            <Grid container direction="column" spacing={2} justified="center"
            >
                <Grid item xs={12} style={{ height: '800' }}>
                    <MUIDataTable
                        title={null}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<AppsIcon />}
                        onClick={props.onClick}
                    >
                        กลับเมนูหลัก
                </Button>
                </Grid>
            </Grid>
        </Container>
    </div>
    );
}

export default TLMList;