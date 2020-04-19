import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';



const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        paddingTop: 10,
    },
    card: {
        maxWidth: 300,
    },
    media: {
        height: 140,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        paddingBottom: '30px',
        fontFamily: 'Prompt',

    },
});

export default () => {
    const classes = useStyles();
    let history = useHistory();

    return (<Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<AppsIcon />}
        onClick={() => history.push("/")}
    >
        กลับเมนูหลัก
</Button>);
}
