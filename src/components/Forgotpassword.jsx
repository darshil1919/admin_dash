import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword } from "../store/action/adminAction";

export default function Forgotpassword({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  let onClickSend = () => {
    if(email == ""){
      return toast.error("email is required")
    } else if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
			return toast.error("Enter valid email");
		} else {
      dispatch(forgotPassword({email, from:"admin"}));
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Find Your Account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter your email address to send reset password link.
          </DialogContentText>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={onClickSend} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
