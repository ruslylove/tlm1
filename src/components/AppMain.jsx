import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardIcon from './CardIcon';
import menuItems from '../menu_items';
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


    function handleOnClick(id) {
        props.selectApp(id);
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h1" className={classes.title}>เมนูหลัก</Typography>
            <Grid container spacing={3} alignItems="center">
                {menuItems.map((item, index) => {
                    return (<Grid item xs={6} sm={3}>
                        <CardIcon key={item.id} id={item.id} title={item.name} image={item.image} onClick={handleOnClick} />
                    </Grid>);
                })}

            </Grid>
        </Container>);
}

export default AppMain;