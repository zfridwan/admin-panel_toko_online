import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField, Button, Card, CardContent, Typography, Grid } from '@mui/material';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/categories', { name, image });
            alert(res.data.message);
            setCategories([...categories, { name, image }]);
            setName(''); // Reset input fields
            setImage('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <form onSubmit={createCategory}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Category
                </Button>
            </form>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{category.name}</Typography>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Categories;
