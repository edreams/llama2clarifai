import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'; // Import ClerkProvider

import ChatPage from './ChatPage';
import GenerateImageCaptionPage from './GenerateImageCaptionPage';
import Add_Data from './Add_Data';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function App() {
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY; // Get Clerk public key from environment

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Schrödinger's ClarifaiLlama Hackathon: Where Projects Purr and Ponder
              </Typography>
              <Button color="inherit" component={Link} to="/chat">Generator</Button>
              <Button color="inherit" component={Link} to="/generate-image-caption">Image Caption</Button>
              <Button color="inherit" component={Link} to="/add-data">Add Data</Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/generate-image-caption" element={<GenerateImageCaptionPage />} />
              <Route path="/add-data" element={<Add_Data />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;

