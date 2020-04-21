import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeadBar from './components/HeadBar';
import AppMain from './components/AppMain';
import TLMCard from './components/TLMCard';
import TLMChart from './components/TLMChart';
import TLMGrid from './components/TLMGrid';
import TLMUnit from './components/TLMUnit'
import TLMMap from './components/TLMMap';
import { useHistory } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


import { WebMapView } from './components/WebMapView';



import './App.css';
import TLMList from './components/TLMList';
import TLMListStub from './components/TLMListStub';
import TimeSeries from './components/TimeSeries';
import LoginForm from './components/LoginForm';
import { statement } from '@babel/template';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuBar: {
    background: '#455a64',
  },
}));

function App() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState('home');
  const [userAuth, setUserAuth] = useState({ user: null, auth: null });

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = () => {
    setPage('home');
  };

  function handleSelect(id) {
    setPage(id);
  }

  function handleAuth(auth, user) {
    //console.log(auth);
    //console.log(user);
    console.log(user.currentUser);
    setUserAuth({ user: user, auth: auth });
    setAuth(true);  // user authenticated
  }

  function handleLogOut(e) {
    //    console.log(e);
    if (auth) {
      e.preventDefault()
      userAuth.auth.auth().signOut().then(response => {
        setUserAuth(prev => {
          //console.log(userAuth.user.currentUser);
          return {
            ...prev,
            user: null
          }
        });
        setAuth(false);
      }).catch(error => {
        console.log(error.message);
        setUserAuth(prev => {
          return {
            ...prev,
            user: {
              message: error.message
            },
          }

        })
      })
    }
  }

  return (
    <div>


      <Router>
        {auth && <HeadBar onLogOut={handleLogOut} user={userAuth.user} />}
        <Redirect to={auth ? '/home' : '/tlm1'} />
        <Switch>
          <Route path="/tlm1">
            <LoginForm onAuth={handleAuth} />
          </Route>
          <Route path='/logout'>
            <LoginForm logout />
          </Route>'>
          <Route exact path="/">
            <AppMain />
          </Route>
          <Route path="/home">
            <AppMain />
          </Route>
          <Route path="/table">
            <TLMListStub />
          </Route>
          <Route path="/cards">
            <TLMCard />
          </Route>
          <Route path="/map">
            <TLMMap />
          </Route>
          <Route path="/status">
            <TLMChart />
          </Route>
          <Route path="/detail">
            <TLMUnit />
          </Route>
          <Route path="/alert">
            <AppMain />
          </Route>
          <Route path="/export">
            <AppMain />
          </Route>
          <Route path="/settings">
            <AppMain />
          </Route>
          <Route path="/admin">
            <AppMain />
          </Route>
          <Route path="/tlm1">
            <AppMain />
          </Route>
        </Switch>
      </Router>

      {/* {(page === 'cda50483-e5be-49e7-8df0-b5e0895c9b8b') && <TLMListStub onClick={handleOnClick} />}
      {(page === 'e7a6e265-64d4-49f7-a742-c5b76cf726db') && <TLMCard onClick={handleOnClick} />}
      {(page === '3881cd49-f663-41d2-880b-8a41c2756325') && <TLMMap onClick={handleOnClick} />}
      {(page === 'fbe4494f-b1d8-4387-bb05-72e39ee72127') && <TLMChart onClick={handleOnClick} />}
      {(page === '6d656c52-49a2-430e-bc1c-1d8ca5103293') && <TLMUnit onClick={handleOnClick} />}
      {(page === '0fe27bf9-2457-4911-ac8a-d2a668a0222d') && <AppMain selectApp={handleSelect} />}
      {(page === '3ff31a5a-4ed7-4f01-9285-07e8997e1401') && <AppMain selectApp={handleSelect} />}
      {(page === '7567dc32-e453-4c70-a74b-0e893afd990b') && <AppMain selectApp={handleSelect} />}
      {(page === '5dc2e174-e7f3-4209-9d0e-cd777175657a') && <AppMain selectApp={handleSelect} />}
      {(page === 'home') && <AppMain selectApp={handleSelect} />}
 */}
    </div>
  );
}

export default App;
