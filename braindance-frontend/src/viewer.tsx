import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { createTheme, ThemeProvider } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import AppBar from './appbar';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function viewer(){
    return (
        <>
            <AppBar />
            <div>
            <Card
            style={{
                backgroundColor: "#eee",
                padding: 16,
                minHeight: 40,
                width: "fit-content",
                minWidth: "fit-content",
                display: "stretch",
                alignItems: "center",
                textAlign: "center"
            }}
            />
            </div>
        </>
    )
}

export default viewer;