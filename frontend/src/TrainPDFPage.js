import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';

function TrainPDFPage() {
    const [file, setFile] = useState(null);
    const [dataId, setDataId] = useState('');
    const [response, setResponse] = useState(null);

    async function trainPDF() {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data_id', dataId);

        const response = await fetch("/api/trainpdf", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setResponse(data);
    }

    return (
        <Box sx={{ mt: 3, mx: 'auto', width: '80%' }}>
            <Typography variant="h4" align="center">Train PDF</Typography>
            <Box sx={{ mt: 2 }}>
                <Input 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])}
                    fullWidth 
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
                <Button variant="contained" color="primary" onClick={trainPDF}>Train</Button>
                <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                    <Typography variant="body1" component="pre">{JSON.stringify(response, null, 2)}</Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default TrainPDFPage;

