import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';

function Add_Data() {
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loadingTube, setLoadingTube] = useState(false);
    const [loadingPDF, setLoadingPDF] = useState(false);

    async function trainTube() {
        setLoadingTube(true);
        const payload = { link, data_id: '200' };
        const response = await fetch("/api/traintube", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        setResponse(data);
        setLoadingTube(false);
    }

    async function trainPDF() {
        setLoadingPDF(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data_id', '200');
        const response = await fetch("/api/add_data", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setResponse(data);
        setLoadingPDF(false);
    }

    async function deleteData() {
        const payload = { data_id: '200' };
        const response = await fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        setResponse(data);
    }

    return (
        <Box sx={{ mt: 3, mx: 'auto', width: '80%' }}>
            <Typography variant="h4" align="center">Add Data</Typography>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">YouTube</Typography>
                <TextField 
                    fullWidth 
                    label="YouTube Link" 
                    variant="outlined" 
                    value={link} 
                    onChange={e => setLink(e.target.value)} 
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={trainTube} disabled={loadingTube}>
                    Train Tube 
                    {loadingTube ? <CircularProgress size={24} sx={{ ml: 2 }} /> : <YouTubeIcon fontSize="large" color="secondary" />}
                </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6">PDF</Typography>
                <Input 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])}
                    fullWidth 
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={trainPDF} disabled={loadingPDF}>
                    Train PDF 
                    {loadingPDF ? <CircularProgress size={24} sx={{ ml: 2 }} /> : <PictureAsPdfIcon fontSize="large" color="primary" />}
                </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<DeleteForeverIcon fontSize="large" />}
                    onClick={deleteData}
                >
                    Delete Data
                </Button>
            </Box>

            <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                <Typography variant="body1" component="pre">{JSON.stringify(response, null, 2)}</Typography>
            </Paper>
        </Box>
    );
}

export default Add_Data;

