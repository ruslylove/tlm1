import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardIcon from '../components/CardIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1, textAlign: 'center', paddingBottom: '20px', fontFamily: 'Prompt',

    },

}));

function AppMain(props) {
    const classes = useStyles();
    let history = useHistory();

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h1" className={classes.title}>เมนูหลัก</Typography>
            <Grid container spacing={3} alignItems="center">
                {props.menuItems.map((item, index) => {
                    return (<Grid item xs={6} sm={3}>
                        <CardIcon key={item.id} title={item.name} image={item.image} onClick={() => history.push(item.path)} />
                    </Grid>);
                })}

            </Grid>
        </Container>);
}

export default AppMain;