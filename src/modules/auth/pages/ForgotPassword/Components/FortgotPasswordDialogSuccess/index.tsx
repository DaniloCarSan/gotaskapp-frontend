import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom';

const ForgotPasswordDialogSuccess = () => {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate('/auth/sign/in');
    };

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    Link of the password reset sent successfully !
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A password reset link has been sent to your email, if it's not in your inbox check your span.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Sign In
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ForgotPasswordDialogSuccess;