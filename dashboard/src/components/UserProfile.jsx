import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from '../pages';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const UserProfile = () => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("Kazi Shadman Sakib");
    const [email, setEmail] = React.useState("kazishadmankabbo@gmail.com");
    const [password, setPassword] = React.useState("********");
    const navigate = useNavigate()
    const navigateToSignIn = () => {
      localStorage.setItem("user", "");
      localStorage.setItem("currentProject", "");
      navigate('/signin')
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const [hasChanged, setHasChanged] = React.useState(false);

    const handleFieldChange = () => {
      setHasChanged(true);
    };

    const handleSaveChanges = () => {
      if (hasChanged) {
        // Add your code to save changes here
        setHasChanged(false);
      }
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Profile
        </Button>
        <Button variant="outlined" onClick={navigateToSignIn}>
          Logout
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            My Profile
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                handleFieldChange();
              }}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                handleFieldChange();
              }}
              fullWidth
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                handleFieldChange();
              }}
            />

          </DialogContent>
          
          <DialogActions>
            
            <Button autoFocus onClick={handleSaveChanges}>
              Save changes
            </Button>

          </DialogActions>
        </BootstrapDialog>
      </div>
    );
}

export default UserProfile