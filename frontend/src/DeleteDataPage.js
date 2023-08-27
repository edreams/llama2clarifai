// DeleteDataPage.js

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteDataPage() {
    const [dataId, setDataId] = useState('');
    const [response, setResponse] = useState(null);

    async function deleteData() {
        const payload = { data_id: dataId };
        const response = await fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        setResponse(data);
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Delete Data
            </Typography>
            <Box 
                component="form"
                onSubmit={deleteData}
                spacing={3}
                display="flex"
                flexDirection="column"
            >
                <TextField 
                    label="Data ID" 
                    variant="outlined"
                    value={dataId} 
                    onChange={e => setDataId(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    startIcon={<DeleteIcon />}
                    type="submit"
                >
                    Delete
                </Button>
            </Box>
            <Typography variant="body1" style={{whiteSpace: 'pre-wrap', marginTop: '20px'}}>
                {JSON.stringify(response, null, 2)}
            </Typography>
        </Container>
    );
}

export default DeleteDataPage;

