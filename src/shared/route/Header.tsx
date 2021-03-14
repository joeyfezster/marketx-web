import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { invalidateJWT } from 'shared/utils/loginUtils';
import { headerStyles } from './styles';
import routePaths from 'shared/routePaths';
import logo from 'shared/hardcodedMedia/marketx_logo.png';

const Header = () => {
    const classes = headerStyles()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        invalidateJWT();
        history.push(routePaths.SIGNIN);
    }

    const open = Boolean(anchorEl);
    
    return (
        <div className={classes.root}>
            <img className={classes.logo} src={logo} alt="logo" />
            <div>
                <IconButton
                    onClick={handleClick}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Button onClick={onLogout}>Log out</Button>
                </Popover>
            </div>
        </div>
    );
};

export default Header
