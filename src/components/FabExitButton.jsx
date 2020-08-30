import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '10px',
        height: '1000',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        paddingBottom: '5px',
        fontFamily: 'Prompt',

    },
    mainButton: {
        backgroundColor: 'white',
    }

}));


export default (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    let history = useHistory();

    const prevScrollY = useRef(0);

    const [goingUp, setGoingUp] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current < currentScrollY && goingUp) {
                setGoingUp(false);
            }
            if (prevScrollY.current > currentScrollY && !goingUp) {
                setGoingUp(true);
            }

            prevScrollY.current = currentScrollY;
            //        console.log(goingUp, currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);

    return (
        goingUp &&
        <Fab color="primary" className={classes.fab}
            aria-label="add" onClick={(e) => {
                setIsOpen(!isOpen);
                props.onLogOut(e);
            }}>
            <ExitToAppIcon />
        </Fab>
    );

}