import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function GenerateImageCaptionPage() {
    const [imageUrl, setImageUrl] = useState('');
    const [api, setApi] = useState('');
    const [response, setResponse] = useState(null);

    async function generateCaption() {
        const payload = { image_url: imageUrl, api };
        const response = await fetch("/api/generate_image_caption", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        setResponse(data);
    }

    return (
        <Box sx={{ mt: 3, mx: 'auto', width: '80%' }}>
            <Typography variant="h4" align="center">Generate Image Caption</Typography>
            <Box sx={{ mt: 2 }}>
                <TextField 
                    fullWidth 
                    label="Image URL" 
                    variant="outlined" 
                    value={imageUrl} 
                    onChange={e => setImageUrl(e.target.value)} 
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={generateCaption}>Generate Caption</Button>
                <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                    <Typography variant="body1" component="pre">{JSON.stringify(response, null, 2)}</Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default GenerateImageCaptionPage;

