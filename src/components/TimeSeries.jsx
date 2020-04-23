import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Chart from "react-google-charts";
import Container from "@material-ui/core/Container";

export default (props) => {
    if (props.thresholdValue) {
        props.data.map((item, index) => {
            if (index === 0) {
                props.data[index] = [...item, props.thresholdName];
            } else {
                props.data[index] = [...item, Number(props.thresholdValue)];
            }
        });
    }
    return (<Paper style={{ padding: '20px' }}>
        <Chart
            width={'100%'}
            height={'400px'}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={props.data}
            options={{
                chart: {
                    title: props.title,
                    subtitle: props.subtitle,
                },
                series: {
                    // Gives each series an axis name that matches the Y-axis below.
                    0: { axis: 'Temps' },

                },
                axes: {
                    // Adds labels to each axis; they don't have to match the axis names.
                    y: {
                        Temps: { label: props.yAxis },
                    },
                },
                animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1500,
                },
            }}
            rootProps={{ 'data-testid': '3' }}
        /></Paper>);


}
