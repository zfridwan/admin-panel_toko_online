import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Paper, Typography } from '@mui/material';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        api.post('/signUp', { email, password })
            .then((res) => {
                alert('Signed up successfully');
            })
            .catch((err) => console.error(err));
    };

    return (
        <Paper style={{ padding: '20px', marginTop: '20px', maxWidth: '400px', margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={signUp}>
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
        </Paper>
    );
};

export default SignUp;
