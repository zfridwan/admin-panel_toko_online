import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import api from '../services/api';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/signin', { email, password });
            // Check response status and navigate on successful sign-in
            if (response.status === 200) {
                navigate('/products'); // Redirect to products page
            }
        } catch (err) {
            console.error('Sign-in failed:', err);
            setError('Sign-in failed. Please check your credentials.'); // Update error state
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>
            {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
            <form onSubmit={handleSignIn}>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default SignIn;
