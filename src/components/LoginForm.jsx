import auth from '../firebase'
import React, { useState, useEffect } from 'react'
import { SearchState } from '@devexpress/dx-react-grid';


function LoginForm(props) {

    const [state, setState] = useState({
        email: '',
        password: '',
        currentUser: null,
        message: ''
    });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
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
        auth.signOut().then(response => {
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
        auth
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
        return (
            <div>
                <p>Hello {state.currentUser.email}</p>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }

    return (
        <section className="section container">
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
            </div>
        </section>
    );
}

export default LoginForm