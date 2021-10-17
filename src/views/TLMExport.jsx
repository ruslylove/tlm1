import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import Button from "@mui/material/Button";
import { CSVDownload, CSVLink } from "react-csv";
import FormLabel from "@mui/material/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { height } from "@mui/system";

const now = new Date();
const begin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const todayNoon = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  12
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    marginLeft: "20px",
    marginRight: "40px",
    marginTop: "50px",
  },
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
  },
}));

export default function TLMExport(params) {
  const classes = useStyles();
  const [tlmfields, setTlmFields] = useState([]);
  const [value, onChange] = useState([begin, now]);
  const [data, setData] = useState([]);
  const [state, setState] = useState("EXPORT CSV");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://nodered.teratam.com/tlm-fields")
        .then((response) => {
          console.log(response.data);
          setTlmFields(
            response.data.map((i) => {
              return [i.fieldKey, true];
            })
          );
          //setData(response.data);
        })
        .catch((error) => {
          // Error 😨
          console.log(error);
        });
    };

    fetchData();
  }, []);

  function exportCSV(event) {
    // POST request using axios inside useEffect React hook

    const tlm_query = {
      id: "101",
      fields: getFields(),
      begin: value[0],
      end: value[1],
    };

    if (tlm_query.fields == 0) return;

    setState("Generating...");

    console.log(tlm_query.fields);
    console.log(tlm_query.begin);
    console.log(tlm_query.end);

    axios
      .post("https://nodered.teratam.com/tlm-query", tlm_query)
      .then((response) => setData(response.data));
  }

  function getFields() {
    return tlmfields
      .filter((value) => value[1])
      .map((i) => i[0])
      .join(",");
  }

  //console.log(Array.from(tlmfields).map((value) => [value[0], false]));

  return (
    <Paper lassName={classes.paper}>
      <Grid item className={classes.root}>
        <FormControl>
          <FormLabel component="legend">Fields</FormLabel>
          <FormGroup row>
            <Button
              variant="outlined"
              onClick={() => {
                setTlmFields(
                  Array.from(tlmfields).map((value) => [value[0], true])
                );
              }}
            >
              Select All
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setTlmFields(
                  Array.from(tlmfields).map((value) => [value[0], false])
                );
              }}
            >
              Clear All
            </Button>
          </FormGroup>

          <FormGroup row>
            {tlmfields.map((item, index) => {
              return (
                item[0] !== "time_stamp" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item[1]}
                        onChange={(event, checked) => {
                          setTlmFields((prevstate) => {
                            return [
                              ...prevstate.slice(0, index),
                              [prevstate[index][0], checked],
                              ...prevstate.slice(index + 1),
                            ];
                          });
                        }}
                        name={item[0]}
                        color="primary"
                      />
                    }
                    label={item}
                  />
                )
              );
            })}
          </FormGroup>
          <FormLabel component="legend">Period</FormLabel>
          <FormGroup row>
            <DateTimeRangePicker
              local="th-TH"
              format="dd-MM-y H:mm:ss"
              onChange={onChange}
              value={value}
            />
          </FormGroup>
          <FormGroup row>
            {data && data.length > 0 ? (
              <>
                <CSVLink data={data} filename="tlm_export.csv">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setData([]);
                      setState("EXPORT CSV");
                    }}
                  >
                    Download
                  </Button>
                </CSVLink>
              </>
            ) : (
              <Button onClick={(event) => exportCSV()} variant="contained">
                {state}
              </Button>
            )}
          </FormGroup>
        </FormControl>
      </Grid>
    </Paper>
  );
}
