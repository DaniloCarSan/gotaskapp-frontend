import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom';

const SignUpDialogSuccess = () => {

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
                    Account created successfully !
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hello your account has been successfully created, in order to login and enjoy all the benefits of our platform, we need you to do the last step which is the email verification, for this we will send you a verification link to email.
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

export default SignUpDialogSuccess;