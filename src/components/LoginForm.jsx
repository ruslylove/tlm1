import firebase from '../firebase'
import React, { useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from "react-router-dom";
import tlm_logo from "../images/logo-via-logohub.png"
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function LoginForm(props) {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: '',
        currentUser: null,
        message: ''
    });
    const [open, setOpen] = React.useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackDrop = () => {
        setOpenBackDrop(false);
    };

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google , Facebook , Etc as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //  firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },
        signInSuccessUrl: '/home',

    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setState(prev => {
                    return {
                        ...prev,
                        currentUser: user
                    }
                })
            }
        })
    }, []);

    const logout = e => {
        e.preventDefault()
        firebase.auth().signOut().then(response => {
            setState(prev => {
                return {
                    ...prev,
                    currentUser: null
                }
            })
        })
    }

    const onChange = e => {
        const { name, value } = e.target

        setState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setOpenBackDrop(true);

        const { email, password } = state;
        // TODO: implement signInWithEmailAndPassword()
        await firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setState(prev => {
                    return {
                        ...prev,
                        currentUser: response.user
                    }
                })
            })
            .catch(error => {
                setState(prev => {
                    return {
                        ...prev,
                        message: error.message
                    }

                })
                setOpen(true);
            })
    }

    if (state.currentUser) {
        props.onAuth(firebase, state);
        //history.push('/home');
        return (
            <div>
                <p>Hello {state.currentUser.email}</p>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <section className="hero is-fullheight" style={{ background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)" }}>
            <div className="hero-body">
                <div className="container has-text-centered" >
                    <div className="columns ">
                        <div className="column ">
                            <div class="box">
                                {/* <img src="https://cdn4.iconfinder.com/data/icons/LUMINA/education_icons/png/400/electricity.png" style={{ width: 100, height: 100 }} /> */}
                                <Zoom in={true} style={{ transitionDelay: '500ms' }} >
                                    <img src={tlm_logo} />
                                </Zoom>
                                <p className="subtitle has-text-grey">V1.0</p>
                                <form onSubmit={onSubmit}>
                                    <div className="field">
                                        <p class="control has-icons-left">
                                            <span class="icon is-medium is-left">
                                                <i class="fas fa-envelope"></i>
                                            </span>
                                            <input
                                                placeHolder="Email"
                                                className="input is-medium"
                                                type="email"
                                                name="email"
                                                onChange={onChange}
                                                value={state.name}
                                            />
                                        </p>
                                    </div>

                                    <div className="field">
                                        <p class="control has-icons-left">
                                            <input
                                                placeHolder="Password"
                                                className="input is-medium"
                                                type="password"
                                                name="password"
                                                onChange={onChange}
                                                value={state.value}
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button className="button is-block is-link is-fullwidth">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>

                        <div className="column">
                            <Slide direction="left" in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '1000ms' }}>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={state.message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Backdrop className={classes.backdrop} open={openBackDrop} onClick={handleCloseBackDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
}

export default LoginForm;

