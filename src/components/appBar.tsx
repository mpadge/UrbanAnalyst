import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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

export default function ButtonAppBar(props: ButtonAppProps) {

    const buttonInputs = props.text.map((i) => ({
        key: capitaliseFirst(i),
        value: getHref(i),
    }))

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        UA
                    </Typography>
                    {buttonInputs.map((button) => (
                        <Button key={button.key} color="inherit" href={button.value}>{button.key}</Button>
                    ))}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
