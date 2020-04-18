import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Legend,
    Title,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';


export default function PieStatus(props) {
    var [chardata, setData] = useState([]);


    return (
        <Paper>
            <Chart
                data={props.chartData}
            >
                <Palette scheme={props.scheme} />

                <PieSeries
                    valueField={props.field}
                    argumentField="type"

                />
                <Legend />


                <Title
                    text={props.title}
                />
                <Animation />
                <EventTracker />
                <HoverState />
                <Tooltip />
            </Chart>
        </Paper>
    );
}
