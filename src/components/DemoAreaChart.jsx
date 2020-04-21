import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    AreaSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
    curveCatmullRom,
    area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const data = [
    { month: 'Jan', appStore: 101, googlePlay: 13, over: 3, high: 40 },
    { month: 'Feb', appStore: 89, googlePlay: 15, over: 3, high: 52 },
    { month: 'Mar', appStore: 107, googlePlay: 20, over: 4, high: 68 },
    { month: 'Apr', appStore: 52, googlePlay: 11, over: 15, high: 77 },
    { month: 'May', appStore: 105, googlePlay: 21, over: 6, high: 67 },
    { month: 'Jun', appStore: 91, googlePlay: 22, over: 4, high: 86 },
    { month: 'Jul', appStore: 110, googlePlay: 23, over: 3, high: 44 },
    { month: 'Aug', appStore: 111, googlePlay: 25, over: 6, high: 82 },
    { month: 'Sep', appStore: 112, googlePlay: 27, over: 7, high: 31 },
    { month: 'Oct', appStore: 111, googlePlay: 30, over: 2, high: 29 },
    { month: 'Nov', appStore: 120, googlePlay: 35, over: 10, high: 48 },
    { month: 'Dec', appStore: 160, googlePlay: 45, over: 3, high: 20 },
];
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
});

const Area = props => (
    <AreaSeries.Path
        {...props}
        path={area()
            .x(({ arg }) => arg)
            .y1(({ val }) => val)
            .y0(({ startVal }) => startVal)
            .curve(curveCatmullRom)}
    />
);

class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;
        const { classes } = this.props;
        return (
            <Paper>
                <Chart
                    data={chartData}
                    className={classes.chart}
                >
                    <ArgumentScale factory={scalePoint} />
                    <ArgumentAxis />
                    <ValueAxis />

                    <AreaSeries
                        name="Normal"
                        valueField="appStore"
                        argumentField="month"
                        seriesComponent={Area}
                    />
                    <AreaSeries
                        name="Under"
                        valueField="googlePlay"
                        argumentField="month"
                        seriesComponent={Area}
                    />
                    <AreaSeries
                        name="Over"
                        valueField="over"
                        argumentField="month"
                        seriesComponent={Area}
                    />
                    <AreaSeries
                        name="High"
                        valueField="high"
                        argumentField="month"
                        seriesComponent={Area}
                    />



                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text={this.props.title} />
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
