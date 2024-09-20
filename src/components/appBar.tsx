"use client"

import { useEffect, useState, MouseEvent } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blue, teal, pink } from '@mui/material/colors';

import useWindowSize from "@/components/windowSize";
import { ButtonAppProps } from '@/data/interfaces';
import { SvgComponent } from '@/components/uaSvgLogo';

const lightTheme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b555',
            dark: '#002884',
            contrastText: '#000',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5cc',
            dark: '#bb2884',
            contrastText: '#eee',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#eee',
        },
    },
});

function getPreferredTheme() {
    const prefersDarkScheme = typeof window != "undefined" ?
        window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    return prefersDarkScheme ? darkTheme : lightTheme;
}

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

    const [theme, setTheme] = useState(lightTheme);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTheme(getPreferredTheme());
        }
    }, []);

    const buttonInputs = props.text.map((i) => ({
        key: capitaliseFirst(i),
        value: getHref(i),
    }))

    const menuInputs = buttonInputs.concat({
        key: "Docs",
        value: "https://docs.urbananalyst.city",
    })

    const width = useWindowSize().width;
    const sizeString = width == null ? "medium" : (width < 700 ? "small" : "medium");

    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" color="primary">
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
                                {menuInputs.map((item) => (
                                    <MenuItem key={item.key} onClick={handleCloseNavMenu} component="a" href={item.value}>
                                        <Typography textAlign="center" >{item.key}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <SvgIcon component={SvgComponent}>
                        </SvgIcon>

                        <Box sx={{ flexGrow: 1 }}>
                        </Box>
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
            </ThemeProvider>
        </Box>
    );
}
