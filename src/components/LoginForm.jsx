import firebase from '../firebase'
import React, { useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useHistory } from "react-router-dom";


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
                /* setState(prev => {
                    return {
                        ...prev,
                        currentUser: response.user
                    }
                }) */
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
        <section className="section container">
            <h1 className="title is-1">TLM Login</h1>

            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={onSubmit}>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    onChange={onChange}
                                    value={state.name}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    onChange={onChange}
                                    value={state.value}
                                />
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        </section>
    );
}

export default LoginForm;

