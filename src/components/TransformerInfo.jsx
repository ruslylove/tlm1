import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";

import { Map } from "@esri/react-arcgis";
import { WebMap, WebScene } from "@esri/react-arcgis";

import transformer from "../variables/transformerStub";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(800),
      height: theme.spacing(600)
    }
  }
}));

export default function TransformerInfo(props) {
  const classes = useStyles();
  const [tran, setTran] = useState(props.transformer);

  console.log(props.transformer);


  function handleMapLoad(map, view) {
    view.ui._removeComponents(["attribution"]);
    console.log("loaded");
  }

  function createData(name, value) {
    return { name, value };
  }

  React.useEffect(() => { setTran(props.transformer); }, [props]);

  var rows = [
    createData("Name", tran ? tran.id : "Unknown"),
    createData("Location", tran ? tran.area : "Unknown"),
    createData("Rating", tran ? tran.rating : "Unknown"),
    createData("Voltage", tran ? tran.voltage : "Unknown"),
    createData("Manufacturer", tran ? tran.manufacturer : "Unknown")
  ];

  console.log(rows);

  return (
    <div>
      <Container maxWidth="xl">
        <Paper style={{ padding: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              {tran && <img
                src={"http://202.44.37.130/tlm/pic/" + (parseInt(tran.Id2) - 100) + ".jpg"}
                alt="transformer"
                style={{ width: "100%", height: "25vh" }}
              />}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {tran &&
                <WebMap
                  id="e737e5e31a1e4ea8a9e4b06ef35d6f10"
                  style={{ width: "100%", height: "25vh" }}
                  viewProperties={{
                    zoom: 18,
                    center: [tran.Long, tran.lat]
                  }}
                  mapProperties={{ basemap: "satellite" }}
                  onLoad={handleMapLoad}
                  slider={false}
                />
              }

            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <ThemeProvider theme={theme}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow></TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body1">{row.name}</Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="body1">
                              {row.value}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
