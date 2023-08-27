import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import YouTubeIcon from '@mui/icons-material/YouTube';

function TrainTubePage() {
    const [link, setLink] = useState('');
    const [dataId, setDataId] = useState('');
    const [response, setResponse] = useState(null);

    async function trainTube() {
        const payload = { link, data_id: dataId };
        const response = await fetch("/api/traintube", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        setResponse(data);
    }

    return (
        <Box sx={{ mt: 3, mx: 'auto', width: '80%' }}>
            <Typography variant="h4" align="center">Train Tube <YouTubeIcon fontSize="large" color="secondary" /></Typography>
            <Box sx={{ mt: 2 }}>
                <TextField 
                    fullWidth 
                    label="YouTube Link" 
                    variant="outlined" 
                    value={link} 
                    onChange={e => setLink(e.target.value)} 
                    sx={{ mb: 2 }}
                />
                <TextField 
                    fullWidth 
                    label="Data ID" 
                    variant="outlined" 
                    value={dataId} 
                    onChange={e => setDataId(e.target.value)} 
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={trainTube}>Train</Button>
                <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                    <Typography variant="body1" component="pre">{JSON.stringify(response, null, 2)}</Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default TrainTubePage;

