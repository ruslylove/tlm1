// react
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

// components
import HeadBar from './components/HeadBar';
import FabMenuButtons from './components/FabMenuButtons';
import { WebMapView } from './components/WebMapView';

// views
import AppMain from './views/AppMain';
import TLMCard from './views/TLMCard';
import TLMChart from './views/TLMChart';
import TLMGrid from './views/TLMGrid';
import TLMUnit from './views/TLMUnit'
import TLMMap from './views/TLMMap';
import TLMList from './views/TLMList';
import TLMListStub from './views/TLMListStub';
import LoginForm from './views/LoginForm';
import ChartPanel from './views/ChartPanel';
import TLMDrawer from './views/TLMDrawer';
import AppLayout from './layouts/AppLayout';

import Draggable from 'react-draggable';

// routes items
import routeItems from './routes.js';

import './App.css';

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
  // const { param } = useParams();
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
        {auth && <AppLayout onLogOut={handleLogOut} user={userAuth.user} />}

        <Switch>
          <Route exact path="/">
            {auth ? <Redirect to='/home' /> : <LoginForm onAuth={handleAuth} demo />}
          </Route>
          {auth && <div>
            <Route path='/logout'>
              <LoginForm logout />
            </Route>
            <Route path="/home" >
              <AppMain menuItems={routeItems} />
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
            <Route path="/detail/:id">
              <ChartPanel />
            </Route>
            <Route path="/dashboard" component={() => {
              window.location.href = 'https://dashboard.teratam.com/d/AOKtd7eZz/tlm-dashboard?orgId=1&refresh=5m&from=1588247916319&to=1588251516319&var-tr_id=87';
              return null;
            }} />
            <Route path="/alert">
              <AppMain menuItems={routeItems} />
            </Route>
            <Route path="/export">
              <AppMain menuItems={routeItems} />
            </Route>
            <Route path="/settings">
              <AppMain menuItems={routeItems} />
            </Route>
            <Route path="/admin">
              <AppMain menuItems={routeItems} />
            </Route>
            <Route path="/tlm1">
              <AppMain menuItems={routeItems} />
            </Route>
          </div>}
          <Redirect to="/" />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
