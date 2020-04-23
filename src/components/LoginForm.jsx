import firebase from '../firebase'
import React, { useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from "react-router-dom";
import tlm_logo from "../images/logo-via-logohub.png"
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';


function LoginForm(props) {
    const history = useHistory();

    const [state, setState] = useState({
        email: '',
        password: '',
        currentUser: null,
        message: ''
    });

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

    const onSubmit = e => {
        e.preventDefault()

        const { email, password } = state;
        // TODO: implement signInWithEmailAndPassword()
        firebase.auth()
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

    return (
        <section className="hero is-fullheight" style={{ background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)" }}>
            <div className="hero-body">
                <div className="container has-text-centered" >
                    <div className="columns ">
                        <div className="column ">
                            <div class="box">
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
        </section>
    );
}

export default LoginForm;

