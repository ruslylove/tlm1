import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';


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


    return (
        <FloatingMenu
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
            <Tooltip title="Home" aria-label="home">
                <ChildButton
                    icon={<HomeIcon style={{ fontSize: 20 }} nativeColor="black" />}
                    backgroundColor="blue"
                    size={50}
                    onClick={props.onClick}
                />
            </Tooltip>
            <ChildButton
                icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
                backgroundColor="white"
                size={50}
            />
            <ChildButton
                icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
                backgroundColor="white"
                size={50}
            />
        </FloatingMenu>);

}