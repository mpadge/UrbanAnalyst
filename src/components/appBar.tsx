"use client"

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import useWindowSize from "@/components/windowSize";
import { ButtonAppProps } from '@/data/interfaces';

function getHref(s: string) {
    if (s == "home") {
        return "/";
    } else {
        return "/" + s;
    }
}

function capitaliseFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const MIN_MENU_WIDTH = 600;

export default function ButtonAppBar(props: ButtonAppProps) {

    const buttonInputs = props.text.map((i) => ({
        key: capitaliseFirst(i),
        value: getHref(i),
    }))

    const width = useWindowSize().width;
    const sizeString = width == null ? "medium" : (width < 700 ? "small" : "medium");

    const [anchorNav, setAnchorNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size={sizeString}
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleOpenNavMenu}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {buttonInputs.map((button) => (
                                <MenuItem key={button.key} onClick={handleCloseNavMenu} component="a" href={button.value}>
                                    <Typography textAlign="center" >{button.key}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        UA
                    </Typography>
                    {typeof width === "number" &&
                        width > MIN_MENU_WIDTH &&
                        buttonInputs.map((button) => (
                            <Button key={button.key} color="inherit" href={button.value}>
                                {button.key}
                            </Button>
                        ))
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
