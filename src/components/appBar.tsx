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
import SvgIcon from '@mui/material/SvgIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blue, teal, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

import useWindowSize from "@/components/windowSize";
import { ButtonAppProps } from '@/data/interfaces';


const SvgComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 0,5 v -5 h 24"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            d="M 24,19 v 5 h -24"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            d="M 3 6 v 8 C 3 21, 11 21, 11 14 v -8"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            d="M 13 20 l 5 -14 l 5 14"
        />
        <path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            d="M 14 15 h 9"
        />
  </svg>
)

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
                            {buttonInputs.map((button) => (
                                <MenuItem key={button.key} onClick={handleCloseNavMenu} component="a" href={button.value}>
                                    <Typography textAlign="center" >{button.key}</Typography>
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
