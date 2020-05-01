import React, { useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

const colorPalleteIEC = [brown[500], "#000", grey[500]];
const colorPalleteUs = ["#000", red[500], blue[500]];
const colorPalleteIndia = [red[500], yellow[500], blue[500]];
const colorPalleteYazaki = [blue[500], brown[500], "black"];
const colorPallete = [red[500], green[500], blue[500], amber[500]];

const useStyles = makeStyles(theme => ({
  root: {
    margin: null
  },
  selectEmpty: {
    marginTop: theme.spacing(10)
  }
}));

export default function PieChart(props) {
  const classes = useStyles();

  let label = props.chartData.map(a => a.type);
  let data = props.chartData.map(a => a.count);

  console.log(label);


  const state = {
    labels: label,
    datasets: [
      {
        label: props.title,
        backgroundColor: props.scheme,
        data: data,
      }
    ]
  }

  return (
    <div>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: props.title,
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
        onElementsClick={elems => {
          // if required to build the URL, you can 
          // get datasetIndex and value index from an `elem`:
          //console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
          // and then redirect to the target page:
          //window.location = "https://example.com";
          elems.length && props.chartClick(elems[0]._index, props.id);
        }}
      />
    </div>
  );
}

