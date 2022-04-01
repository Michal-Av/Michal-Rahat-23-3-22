import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import CloudIcon from '@material-ui/icons/Cloud';
import Menu from '@material-ui/core/Menu';

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
}));

export default function NavbarComp(props) {

  
const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const dispatch = useDispatch();

const handleChange = (event) => {
  setAuth(event.target.checked);
};

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
  
const classes = useStyles();

const logout = () =>
{
  sessionStorage.clear();
  window.location = '/';
}

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" style={{ background: '#001e40' }}>
        <Toolbar>
        <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <CloudIcon />
              </IconButton> 
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              </Menu>
              <Typography variant="h6" className={classes.title}>
              Herolo Weather Task
              </Typography>
              <Button onClick={()=>  dispatch({ type : "HOME"})} color="inherit" > Home </Button>
              <Button onClick={()=>  dispatch({ type : "FAVORITE"})} color="inherit" >Favorites </Button>
        
            </Toolbar>
          </AppBar>
    </div>
  );
}
