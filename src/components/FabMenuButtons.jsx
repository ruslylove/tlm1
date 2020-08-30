import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {
    FloatingMenu,
    MainButton,
    ChildButton,

} from 'react-floating-button-menu';
import MdAdd from '@material-ui/icons/Add';
import MdClose from '@material-ui/icons/Clear';
import MdFavorite from '@material-ui/icons/Favorite';
import AppsIcon from '@material-ui/icons/Apps';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';
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

    const [goingUp, setGoingUp] = useState(false);

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
            console.log(goingUp, currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);



    return (
        goingUp && <FloatingMenu
            slideSpeed={500}
            direction="up"
            spacing={8}
            isOpen={isOpen}
        >
            <MainButton
                iconResting={<MdAdd style={{ fontSize: 20 }} nativeColor="white" />}
                iconActive={<MdClose style={{ fontSize: 20 }} nativeColor="white" />}
                className={classes.MainButton}
                onClick={() => setIsOpen(!isOpen)}
                size={56}
                tooltip="App Home"
            />
            <ChildButton
                icon={<HomeIcon style={{ fontSize: 20 }} nativeColor="black" />}
                backgroundColor="blue"
                size={52}
                onClick={() => {
                    setIsOpen(!isOpen);
                    history.push("home");
                }}
            />
            <ChildButton
                icon={<ExitToAppIcon style={{ fontSize: 20 }} nativeColor="black" />}
                backgroundColor="white"
                size={52}
                onClick={(e) => {
                    setIsOpen(!isOpen)
                    props.onLogOut(e);
                }}
            />
            <ChildButton
                icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
                backgroundColor="white"
                size={50}
            />
        </FloatingMenu>);

}