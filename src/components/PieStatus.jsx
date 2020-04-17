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
import { EventTracker } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';





const data = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
];

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
                <Tooltip />
            </Chart>
        </Paper>
    );
}
