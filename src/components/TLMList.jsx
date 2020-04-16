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


const useStyles = makeStyles((theme) => ({
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

}));


function TLMList(props) {
    const classes = useStyles();

    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:4000/transformers');
            setData(result.data);
        };

        fetchData();
    }, []);

    return (<div className={classes.root}>
        <Container maxWidth="lg" >
            <Typography variant="h4" className={classes.title}>รายการหม้อแปลง TLM</Typography>
            <Grid container direction="column" spacing={2} justify="center"
                alignItems="center">
                <Grid item xs={12}>
                    <MaterialTable
                        columns={[
                            { title: "รหัส", field: "id" },
                            { title: "เขตพื้นที่", field: "area" },
                            { title: "ผู้ผลิต", field: "manufacturer" },
                            { title: "Rating [kVA]", field: "rating", type: "numeric" },
                            { title: "Voltage [kV]", field: "voltage", type: "numeric" },

                            {
                                title: "สถานะโหลด",
                                field: "load_status",
                                lookup: { 0: "No Load", 1: "Low Load", 2: "Normal Load", 3: "High Load", 4: "Over Load" }
                            },
                            {
                                title: "สถานะแรงดัน",
                                field: "voltage_status",
                                lookup: { 0: "No Voltage", 1: "Under Voltage", 2: "Normal Voltage", 3: "Over Voltage" }
                            },

                        ]}

                        data={data}

                        title={null}




                        detailPanel={rowData => {
                            return (<TLMDetail id={rowData.id} />
                            )
                        }}

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