import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeadBar from './components/HeadBar';
import AppMain from './components/AppMain';
import TLMCard from './components/TLMCard';
import TLMChart from './components/TLMChart';

import { WebMapView } from './components/WebMapView';



import './App.css';
import TLMList from './components/TLMList';

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
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState('home');

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



  return (
    <div>
      <HeadBar />
      {(page === 'cda50483-e5be-49e7-8df0-b5e0895c9b8b') && <TLMList onClick={handleOnClick} />}
      {(page === 'e7a6e265-64d4-49f7-a742-c5b76cf726db') && <TLMCard onClick={handleOnClick} />}
      {(page === '3881cd49-f663-41d2-880b-8a41c2756325') && <AppMain selectApp={handleSelect} />}
      {(page === 'fbe4494f-b1d8-4387-bb05-72e39ee72127') && <TLMChart onClick={handleOnClick} />}
      {(page === '0fe27bf9-2457-4911-ac8a-d2a668a0222d') && <AppMain selectApp={handleSelect} />}
      {(page === '3ff31a5a-4ed7-4f01-9285-07e8997e1401') && <AppMain selectApp={handleSelect} />}
      {(page === '7567dc32-e453-4c70-a74b-0e893afd990b') && <AppMain selectApp={handleSelect} />}
      {(page === '5dc2e174-e7f3-4209-9d0e-cd777175657a') && <AppMain selectApp={handleSelect} />}
      {(page === 'home') && <AppMain selectApp={handleSelect} />}

    </div>
  );
}

export default App;
