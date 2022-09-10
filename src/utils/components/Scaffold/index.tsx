import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Avatar, Menu, MenuItem, Box, Toolbar, List, Typography, Divider, IconButton } from '@mui/material';

import { AppBar } from './AppBar';
import { Drawer } from './Drawer';

import { AppContext } from '../../../context';
import { instance as authRepository } from '../../../modules/auth/api/infra/repositories/auth_repository';

const Scaffold = ({ children }: { children: React.ReactNode }) => {

    const { state, dispatch } = React.useContext(AppContext);
    const [open, setOpen] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const signOut = () => {
        authRepository.signOut();
        dispatch({ type: 'SIGN_OUT' });
        window.location.reload();
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Painel de Controle
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt="User Avatar"
                                src={state.auth.credential?.user.avatar}
                            />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="logout" onClick={signOut}>
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>

                        </Menu>
                    </Box>


                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', textAlign: "center" } }}
                    >
                        {process.env.REACT_APP_NAME}
                    </Typography>

                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">

                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default Scaffold;