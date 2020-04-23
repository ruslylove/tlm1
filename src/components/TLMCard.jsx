import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';
import tr5 from '../images/5.jpg';
import tr24 from '../images/24.jpg';
import tr26 from '../images/26.jpg';
import tr7 from '../images/7.jpg';
import tr8 from '../images/8.jpg';
import tr32 from '../images/32.jpg';

import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CardItem from './CardItem';
import transformer from '../stubs/transformerStub';
import { blueGrey } from '@material-ui/core/colors';
import FabMenuButtons from './FabMenuButtons';
import AppHomeButton from './AppHomeButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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

const images = [tr5, tr24, tr26, tr7, tr8, tr32];

export default function TLMCard(props) {
    const classes = useStyles();
    let history = useHistory();
    const [showOnly, setShowOnly] = useState(false)
    const [favcards, setFavCards] = useState([]);


    function handleClick() {
        history.push("/home");
    }

    function handleFavClick(item) {
        setFavCards(prev => {
            return [...prev, item]
        });
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <FormControlLabel
                control={<Switch checked={showOnly} onChange={() => setShowOnly(!showOnly)} name="checkedA" />}
                label="SHOW ONLY FAVORITES"
            />
            <Typography variant="h4" className={classes.title}>รายการหม้อแปลง TLM</Typography>
            <Grid container spacing={3} alignItems="center" alignContent='center' justify="center">

                {!showOnly && transformer.map((item, index) => {
                    return (<Grid item xs={12} sm={6} lg={3} >
                        <CardItem id={index} image={images[index % 6]} detail={item} onFavClick={handleFavClick} />
                    </Grid>)
                })}
                {showOnly && favcards.map((item, index) => {
                    return (<Grid item xs={12} sm={6} lg={3} >
                        <CardItem id={index} image={images[index % 6]} detail={item} onFavClick={handleFavClick} />
                    </Grid>)
                })}

                <Grid item xs={12} alignItems="center" alignContent='center' justify="center">
                    <AppHomeButton />
                </Grid>
            </Grid>
        </Container>
    );
}